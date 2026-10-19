# Plano curto — piloto Maira Tudine

> Execução: superpowers:executing-plans, nesta conversa, sem subagentes, conforme autorização explícita do usuário.

**Objetivo:** entregar uma prévia local bilíngue, fiel às referências e ao Minimalismo de Impacto.
**Arquitetura:** página estática com HTML inicial em inglês, estilos responsivos e scripts clássicos que também funcionam por arquivo local. Servidor Node apenas para prévia, sem backend de produto.
**Stack:** HTML, CSS e JavaScript; Node para servir e verificar; ferramentas de teste apenas em desenvolvimento.
**Spec:** `../specs/2026-10-16-maira-landing-design.md`.

## Restrições globais

Sem framework, chatbot, formulário, rastreamento ou publicação pública. Conteúdo não inventado, EN/PT completo, links individuais. Fotos verificadas ou limitação declarada. Sem subagentes.

## Etapas

- [x] 1. Consolidar especificação e AGENTS.md; verificar fontes e registrar procedência em `docs/sources.md`.
- [x] 2. Construir `index.html`, `styles.css`, `translations.js`, `app.js`, `assets/` e `server.cjs`. Interações: `data-i18n`, seletor `data-language`, menu `#site-nav` e `#menu-toggle`. Testar troca EN/PT, armazenamento indisponível, Escape e links de seção antes de finalizar.
- [x] 3. Validar em desktop/móvel, revisar código e aparência, registrar resultados em `docs/validation.md` e entregar README com instruções de prévia.

## Foco da revisão

- Armazenamento bloqueado: troca de idioma deve continuar funcionando.
- JavaScript indisponível: conteúdo EN e links continuam acessíveis.
- Português longo / 320 px / zoom: sem corte ou sobreposição.
- Menu por teclado: Escape fecha e devolve foco; seleção fecha e segue à seção.
- Imagens: fonte verificada, dimensões reservadas, arquivos locais; nenhuma atribuição presumida.

## Registro de execução

- Decisão: usar o diretório atual, sem worktree ou commits, pois não existe repositório Git. Arquivos permanecem disponíveis para versionamento posterior.
- Decisão: entrega local autorizada; sem registro ou publicação em Sites. Revisão pelo próprio autor, respeitando a instrução de não usar subagentes.
- Decisão: autorização desta mensagem cobre plano e execução; não inserir nova pausa de aprovação.
- Etapa 1 concluída: especificação e regras consolidadas; fontes verificadas por consulta HTTP e imagens inspecionadas.
- Decisão de conteúdo: foto de ambiente identificada e avatar oficial pequeno; portfólio direcionado ao Instagram porque não foi possível verificar os arquivos originais dos trabalhos. Custo: impacto fotográfico mais limitado até o fornecimento dos originais.
- Etapa 2 concluída: primeira execução do teste falhou pela ausência do conteúdo; implementação acrescentada e comportamentos validados no navegador real.
- Correção verificada: texto a 200% excedia a largura por tamanho mínimo intrínseco da grade. Itens receberam `min-width:0`, quebra de texto e escala móvel fluida; teste antes falhou e depois passou.
- Etapa 3 concluída: `npm test` passou em 21 verificações; `node --check` passou para scripts de produção; GET da prévia retornou HTTP 200. Evidências em `docs/validation.md` e `test-results/`.
- Revisão final: realizada pelo autor, sem subagentes, conforme instrução expressa. Não houve merge, push ou publicação. Sem achados críticos pendentes; material fotográfico e verificação em dispositivos físicos permanecem limitações declaradas.
- Continuação após o fornecimento de imagens: o usuário confirmou por escrito que 191634 é o retrato de Maira e os outros seis screenshots mostram seus trabalhos. Abertura, seção de apresentação e galeria foram atualizadas sem alteração estrutural do piloto; a restrição fotográfica anterior fica superada para a prévia local. Permanecem limitadas as resoluções dos screenshots para eventual publicação comercial.
- Verificação desta continuação: `npm test` passou em 21 verificações, incluindo as 10 combinações de idioma/largura com axe; enquadramentos de desktop e 360 px foram inspecionados. Nenhum subagente ou dependência nova foi usado.
