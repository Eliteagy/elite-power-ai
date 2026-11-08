"""Caminhos portáteis (Mac / Windows / outra conta).

PROJECT = pasta de trabalho do vídeo (cut_plan.json, clips.json, transcrições, saídas).
          Definir com a variável de ambiente REELS_PROJECT; por defeito é a pasta atual.
SCRATCH = pasta para ficheiros temporários grandes (wav, frames). REELS_SCRATCH; por defeito PROJECT/_tmp.
"""
import os

SKILL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(SKILL, "assets")
PROJECT = os.path.abspath(os.environ.get("REELS_PROJECT", os.getcwd()))
SCRATCH = os.path.abspath(os.environ.get("REELS_SCRATCH", os.path.join(PROJECT, "_tmp")))
os.makedirs(SCRATCH, exist_ok=True)

FONT_SF = os.path.join(ASSETS, "fonts", "SFNS.ttf")
FONT_SCRIPT = os.path.join(ASSETS, "fonts", "Snell Roundhand Black.otf")
FONT_ICONS = os.path.join(ASSETS, "fonts", "MaterialSymbolsRounded.ttf")
ICON_CODEPOINTS = os.path.join(ASSETS, "fonts", "MaterialSymbolsRounded.codepoints")
YUNET = os.path.join(ASSETS, "models", "yunet.onnx")
SFX_POP = os.path.join(ASSETS, "sfx", "Notification 1.mp3")


def P(*a):
    return os.path.join(PROJECT, *a)


def T(*a):
    return os.path.join(SCRATCH, *a)
