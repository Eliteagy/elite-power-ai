"""Local speech-to-text worker for the Comando microphone (faster-whisper, runs on this PC).

Protocol: one JSON object per line on stdin {"id": "...", "path": "C:/.../audio.webm"},
one JSON object per line on stdout {"id": "...", "text": "..."} or {"id": "...", "error": "..."}.
The model is loaded once and kept warm. Prints {"ready": true, "model": "..."} when loaded.
"""
import glob
import json
import os
import sys
import site

# CUDA libraries (cuBLAS, cuDNN) come from the nvidia-* pip wheels; make Windows find them.
for base in [*site.getsitepackages(), site.getusersitepackages()]:
    for bin_dir in glob.glob(os.path.join(base, "nvidia", "*", "bin")):
        try:
            os.add_dll_directory(bin_dir)
        except (OSError, AttributeError):
            pass
        os.environ["PATH"] = bin_dir + os.pathsep + os.environ.get("PATH", "")

from faster_whisper import WhisperModel

HUB = os.path.join(os.path.expanduser("~"), ".cache", "huggingface", "hub")
CANDIDATES = [
    "models--mobiuslabsgmbh--faster-whisper-large-v3-turbo",
    "models--Systran--faster-whisper-large-v3",
    "models--Systran--faster-whisper-medium",
    "models--Systran--faster-whisper-small",
]


def local_model():
    for name in CANDIDATES:
        snaps = os.path.join(HUB, name, "snapshots")
        if os.path.isdir(snaps):
            for snap in sorted(os.listdir(snaps), reverse=True):
                path = os.path.join(snaps, snap)
                if os.path.isfile(os.path.join(path, "model.bin")):
                    return path, name.split("--")[-1]
    return "small", "small"


def works(model):
    """A one-second silent clip: fails fast if the GPU libraries are missing."""
    import numpy as np
    try:
        list(model.transcribe(np.zeros(16000, dtype="float32"), language="pt")[0])
        return True
    except Exception:
        return False


def load():
    path, name = local_model()
    try:
        model = WhisperModel(path, device="cuda", compute_type="float16")
        if works(model):
            return model, f"{name} (GPU)"
    except Exception:
        pass
    return WhisperModel(path, device="cpu", compute_type="int8"), f"{name} (CPU)"


def send(obj):
    sys.stdout.write(json.dumps(obj, ensure_ascii=False) + "\n")
    sys.stdout.flush()


def main():
    model, name = load()
    send({"ready": True, "model": name})
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except ValueError:
            continue
        rid = req.get("id")
        try:
            segments, _info = model.transcribe(
                req["path"],
                language=req.get("language") or "pt",
                vad_filter=True,
                beam_size=5,
                initial_prompt="Português de Portugal. Elite Agency, imobiliário, reels, consultores, CRM.",
            )
            text = " ".join(s.text.strip() for s in segments).strip()
            send({"id": rid, "text": text})
        except Exception as exc:  # report and keep serving
            send({"id": rid, "error": str(exc)[:300]})


if __name__ == "__main__":
    main()
