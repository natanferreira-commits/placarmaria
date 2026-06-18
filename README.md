# Placar Certo — Maria (Brasil x Haiti)

Versão da landing de palpite premiado para a afiliada **Maria**. Mesmo formato
do projeto do Rayo, com **uma única casa: Stake**.

Acerte o **placar exato** e o **1º jogador a marcar** em Brasil x Haiti
(19/06/2026) e leve **R$500 no Pix**. A participação é condicionada ao cadastro
**novo** na Stake pelo link de afiliado da Maria, comprovado pelo print do
e-mail de boas-vindas.

Campanha da **Arena / Dupla**.

## Arquivos

- `index.html` — landing page autocontida (abre direto no navegador, sem build).
- `img/banner.webp` — criativo de herói da Maria.
- `apps-script/Code.gs` — back-end que grava os leads na planilha Google.
- `SETUP-PLANILHA.md` — passo a passo pra ligar a planilha.

## Pendências (antes de ir ao ar)

1. **Planilha da Maria** — criar planilha + Apps Script PRÓPRIOS (separado do
   Rayo), seguindo o `SETUP-PLANILHA.md`, e colar a URL em `SCRIPT_URL` no
   `index.html`. Sem isso, o envio fica em modo demo (não grava).
2. **Logo da Stake** — hoje o card mostra a sigla "STK". Se quiser a logo,
   colocar `img/stake.png` e adicionar `logo:"img/stake.png"` no array `CASAS`.
3. **Regra do 0x0** — definir no FAQ.

## Link de afiliado (Stake)

`https://media1.stakeaffiliates-br.com/redirect.aspx?pid=18897&bid=1483`
