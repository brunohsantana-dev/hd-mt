# Validação do piloto — 16/10/2026

## Resultado

Prévia local em **http://127.0.0.1:4173**. GET da página retornou HTTP 200. O arquivo `index.html` também funciona diretamente pelo navegador, sem servidor.

`npm test`: **21 verificações aprovadas, zero falhas**, na última execução após as alterações finais de conteúdo e CSS. `node --check app.js`, `node --check translations.js` e `node --check server.cjs`: saída 0.

## Cobertura

- Conteúdo inicial em inglês, botões com destino individual no Fresha.
- Português, `lang`, metadados, rótulos e preferência persistida; fragmento de navegação preservado.
- EN e PT em 320, 360, 390, 768 e 1440 px: sem transbordamento horizontal e sem imagens quebradas.
- Axe, critérios WCAG 2 A/AA e 2.1 AA: **zero violações detectadas nas 10 combinações de idioma e largura**. Isso não substitui auditoria manual completa.
- Menu móvel: Enter, Escape, retorno de foco e fechamento ao selecionar seção.
- Texto ampliado a 200% e preferência de movimento reduzido.
- Troca de idioma com `localStorage` bloqueado.
- Sem JavaScript: conteúdo EN, navegação e agendamento disponíveis.
- Abertura por `file://` com troca para PT.
- Contexto móvel com toque, viewport 390 × 844 e escala 3.
- Percurso por Tab no celular: controles focados visíveis acima da barra de agendamento.
- Servidor não entrega AGENTS.md ou documentos de pesquisa.
- Nenhum erro de execução e nenhuma solicitação a terceiros durante o uso local testado.

## Revisão visual e de código

Capturas EN/PT de desktop e móvel inspecionadas. Paleta verde/branco, tipografia serifada local, respiro, fotografia de cachos na abertura, retrato confirmado e seis trabalhos com legendas; prioridade clara para agendamento. Revisão feita pelo autor, sem subagentes.

O teste de texto ampliado inicialmente revelou transbordamento do título. A causa era o mínimo intrínseco da grade; o ajuste foi confirmado por nova execução e por capturas. A escala móvel foi refinada para reduzir quebras excessivas de palavras.

As diretrizes de interface foram conferidas: links e botões nativos, um h1, hierarquia de títulos, link de salto, foco de controles, alternativas textuais traduzidas, dimensões de imagens, carregamento adiado do avatar e ausência de animação automática. Fontes e imagens são locais; não há embeds, chat, formulário ou analytics.

Evidências reproduzíveis: `test-results/results.json`, `test-results/en-1440.png`, `test-results/pt-1440.png`, `test-results/en-360.png`, `test-results/pt-360.png`, `test-results/pt-large-text.png`. Capturas pontuais da integração: `hero-detail.png`, `portrait-detail.png`, `gallery-detail.png`, `hero-mobile-detail.png`, `about-mobile-detail.png` e `work-mobile-detail.png` no mesmo diretório. Esses arquivos são gerados e ignorados pelo Git.

## Limitações e decisões

- Navegador testado: Microsoft Edge/Chromium em modo headless no Windows, com tamanhos de tela e toque emulados. Não houve teste em aparelho físico, Safari/iOS ou leitor de tela real.
- Ampliação de texto a 200% foi testada; não foi executada uma sessão manual de zoom do navegador em dispositivo físico.
- Os conectores de interface não disponibilizaram navegador visível; a prévia é entregue por URL local e arquivo, e a inspeção visual foi feita por capturas do navegador de teste.
- A galeria interna usa seis screenshots de trabalhos confirmados pelo usuário; a apresentação usa o retrato confirmado da Maira. A imagem de cachos da abertura também aparece na galeria. Os arquivos têm resolução limitada; versões originais maiores seriam desejáveis antes de publicação comercial.
- Nenhuma reserva foi realizada. Destinos dos links foram conferidos; o fluxo de pagamento/agendamento do Fresha não foi executado.
- A pasta não contém repositório Git. Não foram criados commits ou worktrees.
- A entrega é local, sem publicação comercial. A adequação do conteúdo e das imagens para lançamento continua sendo uma etapa posterior, conforme a especificação.
