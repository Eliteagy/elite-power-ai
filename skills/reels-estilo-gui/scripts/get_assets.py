"""Confirma os recursos em assets/ e descarrega os que são públicos se faltarem."""
import os, urllib.request
from paths import ASSETS

NEED = {
    "fonts/MaterialSymbolsRounded.ttf": "https://github.com/google/material-design-icons/raw/master/variablefont/MaterialSymbolsRounded%5BFILL,GRAD,opsz,wght%5D.ttf",
    "fonts/MaterialSymbolsRounded.codepoints": "https://github.com/google/material-design-icons/raw/master/variablefont/MaterialSymbolsRounded%5BFILL,GRAD,opsz,wght%5D.codepoints",
    "models/yunet.onnx": "https://github.com/opencv/opencv_zoo/raw/main/models/face_detection_yunet/face_detection_yunet_2023mar.onnx",
    "fonts/SFNS.ttf": None,                       # SF Pro (Apple) — copiar de /System/Library/Fonts/SFNS.ttf num Mac
    "fonts/Snell Roundhand Black.otf": None,      # Apple — copiar de um Mac (Font Book)
    "sfx/Notification 1.mp3": None,
}
for rel, url in NEED.items():
    p = os.path.join(ASSETS, rel)
    if os.path.exists(p):
        print("ok      ", rel); continue
    if url:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        print("download", rel); urllib.request.urlretrieve(url, p)
    else:
        print("FALTA   ", rel, "— copiar manualmente (ver comentário)")
