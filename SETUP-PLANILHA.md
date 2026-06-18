# Como salvar os leads numa planilha (Google Sheets)

A LP é estática, então usamos um **Google Apps Script** como "back-end de uma linha":
ele recebe cada palpite e grava numa planilha sua. De quebra, o **horário é
carimbado pelo servidor do Google** — é esse horário que decide o vencedor
(primeiro a acertar). O print do e-mail vai pro seu Google Drive e o link fica
na planilha.

## Passo a passo (uma vez, ~5 min)

1. **Crie a planilha**
   - Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha em branco.
   - Nome sugerido: `Placar Certo — Leads`.

2. **Abra o editor de script**
   - Na planilha: menu **Extensões → Apps Script**.
   - Apague o conteúdo padrão e **cole todo o código de `apps-script/Code.gs`**.
   - Salve (ícone de disquete).

3. **Publique como Web App**
   - Botão **Implantar → Nova implantação**.
   - Engrenagem ⚙️ → tipo **App da Web**.
   - Configure:
     - **Executar como:** Eu (sua conta).
     - **Quem tem acesso:** Qualquer pessoa.
   - Clique **Implantar** e **autorize** o acesso (Drive + Planilha) quando pedir.
   - Copie a **URL do app da Web** (termina em `/exec`).

4. **Ligue na LP**
   - No `index.html`, no bloco de config, cole a URL em:
     ```js
     const SCRIPT_URL = "https://script.google.com/macros/s/SEU_ID/exec";
     ```
   - Salve, faça commit/push. A Vercel publica e os palpites já caem na planilha.

## Testar

- Abra a URL do Web App no navegador: deve aparecer **"Placar Certo OK"**.
- Faça um palpite de teste na LP (escolha jogador, casa, suba um print, envie).
- Confira a aba **Leads** da planilha: deve surgir a linha com data/hora, nome,
  WhatsApp, casa, placar, marcador e o **link do print** no Drive.

## Colunas geradas

`Data/Hora (servidor)` · `Nome` · `WhatsApp` · `Casa` · `Placar` · `Brasil` ·
`Haiti` · `1º Marcador` · `Print (link)` · `User-Agent`

## Como achar o vencedor (pós-jogo)

1. Filtre as linhas com **Placar** e **1º Marcador** corretos.
2. Ordene por **Data/Hora (servidor)** (mais antigo primeiro).
3. De cima pra baixo, valide o **print** e o cadastro no painel de afiliado.
4. O primeiro válido leva os R$500 no Pix.

## Atualizou o Code.gs depois?

Reimplante: **Implantar → Gerenciar implantações → editar (lápis) → Nova versão → Implantar**.
A URL continua a mesma.

## Observações

- Sem `SCRIPT_URL` preenchido, a LP funciona em **modo demo** (mostra a
  confirmação, mas não grava). Útil pra testar o visual.
- Os prints ficam numa pasta do Drive (`Placar Certo - Prints`) com link de
  visualização. Se preferir não salvar print, é só não preencher esse campo —
  mas aí perde a comprovação automática.
- Limites do Apps Script são de sobra pra uma promoção de 1 jogo.
