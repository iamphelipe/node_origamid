<!-- Eu criei um pasta .vscode e dentro dela um arquivo settings.json, nesse arquivo eu escondi pastas e arquivo, caso queira olhar, CRTL + P -->
CTL + P

<!-- Para SEMPRE rodar no terminal -->
node --watch ./server.mjs

<!-- Para SEMPRE rodar no terminal, só que sem alertas. -->
node --no-warnings --watch ./server.mjs

<!-- Para o VSCODE entender os tipos do Node, pois vai ser usado. Ex: createServer -->
npm i -D @types/node



<!-- Conforme for passando o curso, esse será o comando para iniciar o servidor -->
node --no-warnings --watch ./index.ts
node --no-warnings --watch ./client.mjs