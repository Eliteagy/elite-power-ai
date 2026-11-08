"""Passo 8 — montar no DaVinci Resolve (correr DENTRO do Resolve: MCP execute_resolve_code, ou consola Py3 do Resolve).

Com o MCP:  exec(open(r"<skill>/scripts/resolve_build.py").read()); build("v1", "Nome da Timeline", PROJECT=r"<pasta do projeto>")
            render(["Nome A", "Nome B"], r"<pasta de export>")
Estrutura criada: V1 clips (rodados 90° se footage deitada), V2 camada legendas+ícones (ProRes 4444),
A1 som dos clips, A2 "Music", A3 "SFX". Timeline 1080x1920 a 29,97 ("29" na API).
Regras: confirmar proj.GetName() antes de escrever; nunca exportar sem aprovação do Ahlec.
"""
import json, os


def _all_items(f):
    out = list(f.GetClipList() or [])
    for s in f.GetSubFolderList() or []:
        out += _all_items(s)
    return out


def _bin(mp, parent, name):
    b = [f for f in (parent.GetSubFolderList() or []) if f.GetName() == name]
    return b[0] if b else mp.AddSubFolder(parent, name)


def build(v, tname, PROJECT, BIN="Reels", ROTATE=True, EXPECT_PROJECT=None):
    pm = resolve.GetProjectManager(); proj = pm.GetCurrentProject()
    if EXPECT_PROJECT: assert proj.GetName() == EXPECT_PROJECT, proj.GetName()
    mp = proj.GetMediaPool(); root = mp.GetRootFolder()
    b = _bin(mp, root, BIN); mb = _bin(mp, b, "Musica"); sb = _bin(mp, b, "SFX")
    plan = json.load(open(os.path.join(PROJECT, "cut_plan.json")))[v]

    def imp(folder, path):
        mp.SetCurrentFolder(folder)
        have = {c.GetClipProperty("File Path"): c for c in _all_items(root)}
        return have.get(path) or mp.ImportMedia([path])[0]

    for p in plan: imp(b, p["path"])
    by = {c.GetClipProperty("File Path"): c for c in _all_items(root)}
    names = [proj.GetTimelineByIndex(i).GetName() for i in range(1, proj.GetTimelineCount() + 1)]
    assert tname not in names, "timeline já existe: " + tname
    mp.SetCurrentFolder(b)
    tl = mp.CreateEmptyTimeline(tname); proj.SetCurrentTimeline(tl)
    tl.SetSetting("useCustomSettings", "1"); tl.SetSetting("timelineFrameRate", "29")
    tl.SetSetting("timelineResolutionWidth", "1080"); tl.SetSetting("timelineResolutionHeight", "1920")
    st = tl.GetStartFrame(); rec = st
    for p in plan:
        mp.AppendToTimeline([{"mediaPoolItem": by[p["path"]], "startFrame": p["src_in"], "endFrame": p["src_out"], "trackIndex": 1, "recordFrame": rec}])
        rec += p["src_out"] - p["src_in"]
    total = rec - st
    if ROTATE:
        for it in tl.GetItemListInTrack("video", 1):
            it.SetProperty("RotationAngle", 90.0); it.SetProperty("ZoomX", 1.7778); it.SetProperty("ZoomY", 1.7778)
    if tl.GetTrackCount("video") < 2: tl.AddTrack("video")
    ov = os.path.join(PROJECT, "legendas", f"Legendas+Icones {v}.mov")
    if os.path.exists(ov):
        mp.AppendToTimeline([{"mediaPoolItem": imp(b, ov), "startFrame": 0, "endFrame": total, "mediaType": 1, "trackIndex": 2, "recordFrame": st}])
    while tl.GetTrackCount("audio") < 3: tl.AddTrack("audio", "stereo")
    tl.SetTrackName("audio", 2, "Music"); tl.SetTrackName("audio", 3, "SFX")
    mdir = os.path.join(PROJECT, "musica")
    mus = [f for f in (os.listdir(mdir) if os.path.isdir(mdir) else []) if f.startswith(f"Musica {v} ")]
    if mus:
        mp.AppendToTimeline([{"mediaPoolItem": imp(mb, os.path.join(mdir, mus[0])), "startFrame": 0, "endFrame": total, "mediaType": 2, "trackIndex": 2, "recordFrame": st}])
    sfx = os.path.join(PROJECT, "sfx", f"SFX {v}.wav")
    if os.path.exists(sfx):
        mp.AppendToTimeline([{"mediaPoolItem": imp(sb, sfx), "startFrame": 0, "endFrame": total, "mediaType": 2, "trackIndex": 3, "recordFrame": st}])
    v1 = tl.GetItemListInTrack("video", 1)
    print(tname, "frames", total, "| contíguo", all(x.GetEnd() == y.GetStart() for x, y in zip(v1, v1[1:])),
          "| offsets ok", all(i.GetLeftOffset() == p["src_in"] for i, p in zip(v1, plan)))
    return tl


def render(tnames, outdir, kbps=20000):
    """MP4 H.264 1080x1920, VideoQuality em Kb/s (20000 = 20 Mb/s). Só depois de aprovação."""
    import time
    proj = resolve.GetProjectManager().GetCurrentProject()
    tls = {proj.GetTimelineByIndex(i).GetName(): proj.GetTimelineByIndex(i) for i in range(1, proj.GetTimelineCount() + 1)}
    proj.DeleteAllRenderJobs(); jobs = []
    for n in tnames:
        proj.SetCurrentTimeline(tls[n]); proj.SetCurrentRenderFormatAndCodec("mp4", "H264")
        proj.SetRenderSettings({"SelectAllFrames": True, "TargetDir": outdir, "CustomName": n, "ExportVideo": True, "ExportAudio": True,
                                "FormatWidth": 1080, "FormatHeight": 1920, "VideoQuality": kbps})
        jobs.append((n, proj.AddRenderJob()))
    proj.StartRendering([j for _, j in jobs], False)
    while proj.IsRenderingInProgress(): time.sleep(3)
    for n, j in jobs: print(n, proj.GetRenderJobStatus(j))
