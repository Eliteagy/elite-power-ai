"""Transcrição com timestamps por palavra. Mac Apple Silicon -> mlx-whisper; resto (Windows/Linux/Intel) -> faster-whisper."""
import platform, subprocess

LANG = "pt"


def _backend():
    if platform.system() == "Darwin" and platform.machine() == "arm64":
        try:
            import mlx_whisper  # noqa
            return "mlx"
        except ImportError:
            pass
    return "faster"


def to_wav(src, dst, ss=None, t=None):
    cmd = ["ffmpeg", "-v", "error", "-y"]
    if ss is not None: cmd += ["-ss", f"{ss:.4f}"]
    cmd += ["-i", src]
    if t is not None: cmd += ["-t", f"{t:.4f}"]
    cmd += ["-ac", "1", "-ar", "16000", dst]
    subprocess.run(cmd, check=True)


def words(wav, offset=0.0):
    """-> segments [{start,end,text,words:[{w,s,e}]}] com tempos + offset."""
    if _backend() == "mlx":
        import mlx_whisper
        r = mlx_whisper.transcribe(wav, path_or_hf_repo="mlx-community/whisper-large-v3-turbo", language=LANG,
                                   word_timestamps=True, condition_on_previous_text=False)
        segs = r["segments"]
        return [{"start": s["start"] + offset, "end": s["end"] + offset, "text": s["text"],
                 "words": [{"w": w["word"].strip(), "s": round(w["start"] + offset, 3), "e": round(w["end"] + offset, 3)} for w in s.get("words", [])]}
                for s in segs]
    from faster_whisper import WhisperModel
    m = WhisperModel("large-v3-turbo", device="auto", compute_type="auto")
    segs, _ = m.transcribe(wav, language=LANG, word_timestamps=True, condition_on_previous_text=False)
    return [{"start": s.start + offset, "end": s.end + offset, "text": s.text,
             "words": [{"w": w.word.strip(), "s": round(w.start + offset, 3), "e": round(w.end + offset, 3)} for w in (s.words or [])]}
            for s in segs]
