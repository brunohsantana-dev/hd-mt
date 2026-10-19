# Maira Tudine — piloto demonstrativo

Landing page local em HTML, CSS e JavaScript, com inglês principal e português completo. Sem framework, backend de produto, formulário, chat ou rastreamento.

## Abrir a prévia

Abra `index.html` no navegador, ou, com Node instalado:

```sh
npm start
```

Acesse **http://127.0.0.1:4173**. O servidor escuta apenas no próprio computador e serve somente a página e seus assets; não expõe os documentos do projeto. Não há publicação pública. Para encerrar, pressione Ctrl+C no terminal do servidor.

Os botões abrem o perfil real da Maira no Fresha; clicar não confirma uma reserva. Contato e mais trabalhos apontam ao Instagram oficial. O idioma pode ser lembrado localmente; o site continua funcionando quando esse armazenamento está bloqueado.

## Verificar

```sh
npm ci
npm start
# Em outro terminal, com Microsoft Edge instalado:
npm test
```

Os testes requerem Node 22.12 ou superior e Microsoft Edge. Playwright e axe são dependências apenas de desenvolvimento. A página não carrega nenhum pacote ou recurso remoto. Os testes geram capturas e resultados em `test-results/`.

## Arquivos

- `index.html`: estrutura e conteúdo inicial em inglês.
- `styles.css`: direção visual, responsividade, foco e movimento reduzido.
- `translations.js`: conteúdo EN/PT e metadados.
- `app.js`: menu móvel e troca de idioma.
- `server.cjs`: prévia local, sem dependências.
- `docs/sources.md`: procedência e limitações dos materiais.
- `docs/validation.md`: evidências de validação.
- `docs/superpowers/`: especificação aprovada e plano de execução.

## Imagens e conteúdo

A galeria contém seis trabalhos atribuídos à Maira e a apresentação usa o retrato confirmado pelo usuário. Os arquivos fornecidos são screenshots em PNG; o enquadramento é feito por CSS e os arquivos originais permanecem intactos. Para publicação em telas grandes, imagens originais em resolução mais alta podem substituir os screenshots. Não há depoimentos ou estatísticas inventados.
