# Scaffold — projeto Remotion novo com o kit Neutral Flow (paleta AMK)

```bash
# 1. pasta APFS local (não exFAT), fora do vault
mkdir amk-anim && cd amk-anim
cp -r "<skill>/templates/neutral-flow/remotion/scaffold/." .         # package.json, tsconfig, src/{index,Root,AmkStage}, public/{fonts,sfx}
cp -r "<skill>/templates/neutral-flow/remotion/lib" src/lib
cp -r "<skill>/templates/neutral-flow/remotion/components" src/components
cp -r "<skill>/templates/neutral-flow/remotion/audio" src/audio
cp "<skill>/templates/ShadowGridBackground.tsx" src/components/
cp "<skill>/templates/neutral-flow/remotion/remotion.config.ts" .
npm install && npm run typecheck
npm run still            # smoke test (Brave)
npx remotion studio      # preview
```

`AmkStage.tsx` é o exemplo mínimo (4 compassos a 120 BPM, herói + esfera + texto, pilha de luz completa, SFX do kit, modo "sfx" sem música). Duplicar por cena; usar `AMK` de `lib/theme-amk.ts` para as cores.
