# Refinamento visual — execução

- Início: 16/10/2026, 21:20:06, America/Bahia (2026-10-17 00:20:06 UTC, relógio da ferramenta).
- Configuração de referência informada pelo usuário: GPT-6 Sol / esforço Leve. Modelo e esforço efetivos não são expostos pelas ferramentas deste turno; não verificados.
- Saldos antes desta execução: não disponíveis por ferramenta. A revisão `docs/review-2026-10-16-visual.md` registrou 71% (5 h) e 78% (semanal) ao fim de sua própria janela de inspeção, em outro momento. Esses números não são uma leitura inicial desta execução.
- Escopo: tipografia, legibilidade, curvas, detalhes dourados e composição fotográfica. Barra fixa, avaliações, EN/PT, links e stack permanecem funcionais.
- Execução direta, sem subagentes. Nenhuma estimativa de créditos consumidos.

## Andamento

- Revisão de referência e estado atual concluída. Fontes DM Serif Display e Manrope integradas localmente, com licenças OFL e script de obtenção em `scripts/fetch-fonts.cjs`.
- Tipografia ampliada e espaçamentos ajustados para EN/PT. Botões com raio de 12 px, galeria com 22 px, arco principal e retrato suavizados. Dourado aplicado em detalhes discretos, preservando os botões verdes.
- Especialidade em cachos e coloração em Adelaide ganhou destaque na abertura. Retrato ampliado moderadamente. Galeria: uma coluna em 320 px, duas em 390 px e três em desktop.
- Retrabalho visual: o título em português quebrava em três linhas a 320 px; ajuste fino do tamanho móvel trouxe a composição de volta a duas. As capturas da galeria foram refeitas após aguardar o carregamento das imagens sob demanda. Nenhum teste funcional falhou.

## Verificação e entrega

- `npm test`: 21 verificações aprovadas, nenhuma falha. Inclui 320, 360, 390, 768 e 1440 px em EN/PT; acessibilidade; navegação e foco; menu móvel; agendamento; contato; imagens; barra fixa; ausência de rolagem horizontal e de erros de execução.
- Inspeção visual no Edge via Playwright em 320, 390 e 1440 px nos dois idiomas. Métricas em `test-results/refinement-metrics.json`; capturas `test-results/refined-*.png`.
- Medidas observadas: corpo 17 px, navegação e botões 15,98 px, legendas 14,11 px; fontes locais carregadas; nenhuma solicitação de imagem ou fonte com falha nas seis inspeções.
- Prévia local: http://127.0.0.1:4173 (disponível enquanto o servidor desta sessão estiver ativo). Não foi publicada uma versão pública.
- Arquivos de implementação alterados: `index.html`, `styles.css`, `translations.js`, `server.cjs`, `tests/browser.cjs`; adicionados `assets/fonts/*` e `scripts/fetch-fonts.cjs`. Este registro foi adicionado em `docs/`.
- Fim: 16/10/2026, 21:29:56, America/Bahia (2026-10-17 00:29:56 UTC). Tempo decorrido: 9 min 50 s.
- Saldos depois: não disponíveis por ferramenta. Não há medição isolada do consumo desta execução; nenhum valor foi estimado ou atribuído. A configuração de referência GPT-6 Sol / esforço Leve permaneceu adequada para este trabalho, mas a configuração efetiva não pôde ser verificada.
- Limitação: revisão em emulação de navegador desktop/móvel, sem teste em aparelho físico.
