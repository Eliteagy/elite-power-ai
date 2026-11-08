---
name: sound-design
description: Som e música para vídeos cinematográficos — camadas de ambiente, foley, SFX de transição (whoosh, riser, impact), J/L-cuts sonoros, estrutura e edição da música, ducking sob voz off, mistura e loudness. Usa sempre que se monta um vídeo com música/voz off ou pedem "mais imersivo", "sound design", "efeitos sonoros".
---

# Sound design

## Biblioteca pronta
- Pasta **`efeitos-sonoros`** na EDICOES: 52 SFX originais (whooshes, risers, impactos, pops de UI, glitch, ambientes, transições musicais), WAV 48 kHz/24-bit, livres de direitos. Lê `LEIA-ME.md` (o que usar onde e a que volume) e `INDICE.txt`.
- Gerar mais ou variações: `scripts/gerar_sfx.py PASTA` (síntese procedural reprodutível; edita os parâmetros no script).
- Na cloud, para misturar: ffmpeg `adelay` + `amix` para colocar SFX nos tempos dos cortes (lista de tempos tirada da timeline/JSON dos cortes).

## Princípio
Primeiro decide **o que o público deve sentir**; só depois escolhe sons. O som é o que transforma "ver" em "estar lá". Sem buracos: cada som passa para o próximo.

## Camadas (constrói de baixo para cima)
1. **Som de câmara/telefone** (gravado no local) — a camada mais credível. Pede sempre ao utilizador para não o apagar.
2. **Base de ambiente** esticada pela sequência toda (vento distante, sala, cidade). Uma base grave (bass ambience/drone) por baixo dá profundidade.
3. **Texturas subtis** (folhas, neve, trânsito longe, copos ao fundo num casamento).
4. **Foley de proximidade**: tecido, passos, respiração, porta, chaves, copo — **sem exagerar**.
5. **Perspetiva**: plano largo = mais ambiente, menos passos; grande plano = detalhe alto, ambiente baixo. O som acompanha a distância da câmara.
6. **Detalhe quando o foco muda**: baixar ambiente e destacar o som do objeto (embalagem, trinca, isqueiro).
7. **Sons "impossíveis" subtis**: dar som a coisas que não fariam (fist bump, olhar, cartão a aparecer) para impacto.
8. **Música por último** (ou drones suaves) — não pode roubar atenção ao resto.

## Os 3 A (resumo rápido)
**Ambience** (atmosfera) → **Action** (passos, clique da câmara, teclas) → **Affection**/emoção (risers, drones, transições).

## Técnicas que uso em todos os projetos
- **Panning**: o som vem do lado onde a fonte está no ecrã; ambientes estéreo largos.
- **J/L-cuts** nas ambiências: em todas as junções, a ambiência da cena seguinte entra antes (fade in) e a anterior sai depois.
- **Reverb** para o espaço (sala pequena = pouco, igreja = muito); afasta um som para o fundo; suaviza SFX secos.
- **EQ**: abre espaço para a voz cortando essa banda (1–4 kHz) na música; high-pass e low-pass para telefone, abafado ou debaixo de água.
- **Silêncio** antes do drop ou do impacto; tirar a música por um momento para dar contraste.
- Um SFX que atravessa dois planos **cola** o corte (transição de áudio).
- Sincronia ao FRAME: um SFX desfasado parece amador.
- Num vídeo com intros fortes, gasta ≥50% do tempo no som; copia o tipo de SFX de quem faz bem.

## 3 categorias de SFX
- **Realistas**: o que se vê.
- **Adicionais**: o que podia estar lá mas não se vê (comboio ao longe, avião, sirene, gaivotas). Servem para **ligar planos de sítios diferentes**: mete o som do plano seguinte, baixo e panned, no fim do plano atual (pre-lap / J-cut) → parece o mesmo lugar.
- **Estilísticos**: whoosh nos cortes rápidos/whip pans, riser antes do clímax, impact/boom no drop, reverse cymbal, sub drop, glitch para texto, "pop" suave para elementos gráficos.

## Música
- Escolhe pela emoção e BPM; corta nas batidas (marcadores no beat).
- **Reestrutura a faixa**: corta e reordena partes (intro → build → drop → outro) para caber na duração; esconde emendas com SFX (whoosh/impact) ou crossfade em batida.
- **Atrasar o clímax**: build-up mais longo, drop no momento visual mais forte.
- **EQ automatizado**: tirar graves (high-pass a subir) nos 1–2 compassos antes do drop → o drop bate mais forte. Filtro low-pass para "música abafada" em momentos de flashback/interior.
- Samples (flauta, piano) no tom e tempo da música espalhados pela banda sonora = assinatura.
- Bibliotecas: Artlist, Epidemic Sound (música+SFX, com **stems** para silenciar instrumentos que distraem); grátis: YouTube Audio Library, Pixabay, Mixkit, Freesound (CC0).
- Música em reels: tem de fazer loop. Corta e duplica com fades para o fim emendar no início. Debaixo da voz fica a −30/−37 dB no DaVinci quando é só cama.

## Voz off
- Aperta a voz (skill `cortes-e-takes`), EQ high-pass 80 Hz, de-esser leve, compressão 3:1, −16 LUFS.
- Pode ser gravada no telemóvel a partir de frases soltas/conversas reais — autenticidade > estúdio.
- **Ducking**: música −12 a −18 dB debaixo da voz; sobe nos espaços entre frases (sidechain no Fairlight ou keyframes).
- Áudio original dos clips como cama por baixo (−20 a −25 dB) quando a voz manda.

## Mistura e entrega
- Faixas separadas e com cor: voz / voz off / música / SFX / ambiente (permite exportar stems).
- Picos máx. −1 dBTP; redes sociais −14 LUFS integrado; YouTube −14; voz-only −16.
- Ouve com auscultadores E coluna do telemóvel (os graves desaparecem no telemóvel — verificar se a voz se percebe).

## Ferramentas na cloud (ffmpeg)
- Ducking: `sidechaincompress=threshold=0.05:ratio=8:attack=20:release=300`
- Loudness: `loudnorm=I=-14:TP=-1:LRA=11`
- Crossfade música: `acrossfade=d=0.5:c1=tri:c2=tri`
- High-pass automatizado simples: separar trecho antes do drop e aplicar `highpass=f=300` com fade.
