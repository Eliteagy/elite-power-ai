# Adobe Premiere Pro — workflow equivalente

Usa o Premiere quando o utilizador o pedir ou quando o projeto já estiver nele. Por computer use, a UI pode estar em PT ou EN; os nomes ingleses vão entre parênteses.

## Projeto e sequência
- Novo projeto > importar (Ctrl+I) com pastas: Footage/A-roll, B-roll, Música, SFX, Gráficos.
- Sequência a partir do clip (arrasta o clip para o ícone "Novo item"). Reels: Sequência > Definições > 1080×1920, ou **Reenquadramento automático (Auto Reframe Sequence)** para passar de 16:9 a 9:16 seguindo o sujeito.
- Timeline gerada por script: Ficheiro > Importar > o `.fcpxml` (FCP XML), que o Premiere lê como sequência.

## Edição
- Ferramentas: V seleção, C lâmina (Razor), Ctrl+K corta na agulha, Shift+Delete ripple delete, Q e W para aparar ao início/fim, Alt+arrastar duplica.
- Talking-head: **Transcrição baseada em texto (Text-Based Editing)**. Transcreve a sequência, depois apaga frases no texto e o vídeo corta junto; "Pausas" > eliminar silêncios.
- J/L-cuts: desbloqueia o link (Alt+clique) e estende o áudio para antes ou depois do corte.
- Multicâmara: Clip > Multicam > criar sequência sincronizada por áudio.

## Movimento e efeitos
- Controlos de efeito (Effect Controls) > Movimento: Posição, Escala, Rotação, Âncora; keyframes (cronómetro); botão direito > Bezier / Ease In / Ease Out; abre a curva de velocidade para afinar.
- **Dolly zoom**: Ctrl+R mostra as réguas; arrasta guias à volta do sujeito; keyframes de Escala (e Posição) no primeiro e último frame para o sujeito manter o tamanho.
- **Time Remapping (speed ramp)**: botão direito no clip > Mostrar keyframes do clip > Time Remapping > Speed; Ctrl+clique cria pontos, arrasta a linha para cima ou para baixo, separa o ponto em dois e arredonda (rampa suave). Interpolação Optical Flow para slow-motion sem 60 fps.
- Transições: Cross Dissolve, Dip to Black/White, Morph Cut (para jump cuts em talking-head), Film Dissolve. Adjustment Layer para efeitos por cima de vários clips (Transform com motion blur, shutter 180°).
- Máscaras: em qualquer efeito, máscara (elipse, retângulo, caneta) + tracking para a frente. Texto atrás do sujeito: duplica o clip, mascara o sujeito na cópia de cima e mete o texto no meio.
- Estabilizar: Warp Stabilizer. Desfocar caras ou logos: Mosaic/Gaussian Blur com máscara e tracking.

## Texto e legendas
- Ferramenta de texto (T) ou Essential Graphics; guarda estilos como Master Styles.
- Legendas: Texto > Transcrição > **Criar legendas** (Captions): máx. caracteres/linha, linhas = 1. Estiliza na trilha (todas as legendas), exporta SRT ou faz burn-in.
- Animação de palavra a palavra: Essential Graphics com Response Design, ou um `.mov` com alfa gerado pelo `legendas_dinamicas.py` posto em V2/V3.

## Cor
- Lumetri Color: Básica (WB, exposição, contraste) > Creative (Look/LUT, faded film, vibrance) > Curvas (Hue vs Sat para subtrair cores) > Rodas de cor (split tone: sombras teal, altos quentes) > HSL secundário (proteger a pele) > Vinheta.
- Log: Input LUT (Apple Log / S-Log3 → Rec.709) na aba Básica e depois o look criativo.
- Scopes: Lumetri Scopes (Parade RGB, Vectorscope YUV com a skin line).

## Áudio
- Essential Sound: marca cada clip como Diálogo, Música, SFX ou Ambiente. Diálogo: Enhance Speech, Loudness auto-match. Música: **Ducking** automático debaixo do diálogo; Remix para encurtar a música até à duração da sequência.
- Efeitos: Parametric EQ (high-pass 80 Hz na voz), DeNoise, DeReverb, Reverb (Studio Reverb), Low-pass para som abafado.
- Mixer: master com picos abaixo de −1 dB; Loudness Radar / normalizar a −14 LUFS (redes) ou −16 (voz).

## Exportar
- Ctrl+M: H.264, "Match Source – High bitrate" ou VBR 2-pass 16–20 Mbps (1080p) / 35–45 (4K), áudio AAC 320 kbps, 48 kHz.
- Reels: 1080×1920, fps da fonte. Legendas: Captions > Burn into video ou um ficheiro SRT à parte.
- Queue: Media Encoder para várias versões (9:16, 1:1, 16:9).

## Transições com IA (referência)
Corta os clips onde a transição começa e acaba. Screenshot do último frame de A e do primeiro de B > gerador de transição start/end frame (5 s) > importar entre os clips > Time Remapping para dar punch + SFX.
