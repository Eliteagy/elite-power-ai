# DaVinci Resolve (UI em português) — workflow testado por computer use

## Preparação
- Pede acesso às apps: DaVinci Resolve (e o Explorador de Ficheiros se for preciso). Se a janela "Acesso por voz" (Voice Access) do Windows roubar o foco, concede-lhe acesso também / fecha-a.
- Projeto novo: Gerenciador de projetos → Novo projeto. Define resolução da timeline (1080×1920 vertical para reels) e fps ANTES de importar.

## Importar
- Média: página Mídia ou Arquivo > Importar > Mídia (Ctrl+I).
- Timeline gerada por script: **Arquivo > Importar > Linha de Tempo** → escolher o `.fcpxml`. O Resolve religa os clips pelos caminhos `file:///C:/...` do XML (usa os caminhos reais do PC do utilizador, com `%20` nos espaços).
- Overlays de legendas: importar o `.mov` qtrle/ARGB (tem alfa) e pô-lo em V2/V3 no início (00:00). Se vier em partes (limite de 30 MB por ficheiro na transferência), coloca as partes seguidas.

## Edição
- Página Edit/Cut. Lâmina: B; seleção: A; Ripple delete: Shift+Delete.
- CUIDADO: shift+clique entre faixas seleciona tudo → apagar remove a timeline inteira. Se acontecer: Ctrl+Z imediatamente.
- Zoom dinâmico: Inspetor > Zoom dinâmico (Dynamic Zoom) — punch-ins suaves. Ou keyframes em Zoom/Posição.
- Transições suaves: Blur Dissolve / Cross Dissolve 6–10 frames; evitar transições "de PowerPoint".
- Velocidade: clique direito > Alterar velocidade do clipe; Retime curve para speed ramps.

## Legendas no próprio Resolve
- **Linha de Tempo > Ferramentas IA > Criar legendas a partir do áudio** (idioma Português, máx. caracteres por linha ~20–32, 1 linha).
- Preset "Word Highlight"/destaque de palavra para karaoke; editar estilo na faixa de legendas (fonte, cor, contorno, posição Y).
- Alternativa com mais controlo: gerar o overlay animado com `legendas-dinamicas/scripts/legendas_dinamicas.py`.

## Cor
- Página Color: nó 1 balanço/exposição, nó 2 conversão (CST ou LUT Log→Rec709), nó 3 look/curvas, nó 4 saturação seletiva/HSL, nó 5 vinheta, nó 6 grão/halation.
- **Film Look Creator** (Resolve 19+): halation, bloom, grão, gate weave, vinheta — começar com valores baixos.
- Scopes: Parade para balanço, Vectorscope com a skin-tone line para a pele.

## Áudio (Fairlight)
- Voz: EQ high-pass 80 Hz, compressor leve, Voice Isolation se houver ruído, normalização −16 LUFS.
- Música: ducking sob a voz (−12 a −18 dB), automação de EQ para tirar graves antes do drop.

## Atalhos e organização que poupam horas
- Bins: Footage/A-roll, B-roll, Música, SFX, Timelines. Importar a pasta inteira para o Media Pool mantém a estrutura.
- Timeline vertical: botão direito > Timelines > Timeline Settings > desmarcar Use Project Settings > Use Vertical Resolution (ou Shift+9).
- Teclado: Keyboard Customization. Split = Ctrl+B (ou "/"), Ripple Delete = Shift+Backspace, Marcador = M, I/O = entrada/saída no clip fonte, Alt+↑/↓ move o clip de faixa sem o deslocar.
- Copiar atributos: Ctrl+C num clip > selecionar os outros > Alt+V (Paste Attributes > Video: zoom, posição, grade).
- Horizontal → vertical: Inspector Zoom para encher, ou AI Smart Reframe (Studio) para seguir o sujeito.
- Overlay da UI do Reels/Shorts (PNG) numa faixa de cima, para confirmar as safe areas; liga e desliga com D.
- Performance: Playback > Proxy Quarter + Render Cache Smart.
- Normalização: Deliver > Audio > Normalize Audio (-14 LUFS YouTube), para o YouTube não comprimir mais.

## Exportar (página Deliver)
- Predefinição H.264/H.265, resolução da timeline, nome do ficheiro, **Localização: pasta Vídeos** (se o caminho não existir, o render falha — escolhe uma pasta que exista).
- "Adicionar à fila de renderização" → "Renderizar tudo". Confirmar que o ficheiro aparece na pasta.
- **Legendas da faixa de subtitles**: Subtitle Settings > Export Subtitle > **Burn into video**. Sem isto, as legendas NÃO aparecem no ficheiro.
- Reels: fazem loop. Corta a música e duplica-a com fades para o fim emendar no início; vê em loop (In/Out + botão de loop).
- Se o campo do nome não aceitar escrita por teclado, clica dentro, Ctrl+A e escreve de novo, ou usa o botão Procurar.

## Se o DaVinci estiver fechado
Não bloquear: montar com ffmpeg na cloud e entregar o MP4, + deixar o `.fcpxml` na pasta Transferências para ele abrir depois.
