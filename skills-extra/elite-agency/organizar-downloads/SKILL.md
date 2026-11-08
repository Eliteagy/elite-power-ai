---
name: organizar-downloads
description: Arrumar a pasta Downloads em subpastas por tipo de ficheiro
---
1. Usa listar_pasta em Downloads e lê o total de itens.
2. Agrupa pelas extensões: Imagens (png jpg jpeg gif webp), Documentos (pdf docx txt xlsx pptx csv), Videos (mp4 mkv mov avi), Audio (mp3 wav flac), Arquivos (zip rar 7z), Instaladores (exe msi).
3. Diz ao utilizador, numa frase, para que grupos vais mover ficheiros. Nunca apagues nada e nunca mexas em instaladores sem o utilizador o pedir.
4. Para cada grupo, usa UM comando com executar_comando: cria a subpasta e move só os ficheiros desse grupo, por exemplo
   New-Item -ItemType Directory -Force "C:\Users\...\Downloads\Documentos"; Move-Item "C:\Users\...\Downloads\*.pdf","C:\Users\...\Downloads\*.docx" "C:\Users\...\Downloads\Documentos"
   (usa o caminho real da pasta pessoal; o utilizador confirma cada comando).
5. No fim volta a chamar listar_pasta e diz quantos itens ficaram em Downloads.
