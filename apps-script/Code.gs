/**
 * Placar Certo — recebe os palpites da LP e grava na planilha.
 *
 * Como instalar: ver SETUP-PLANILHA.md (na raiz do projeto).
 * Resumo: este script é "vinculado" a uma planilha Google (Extensões > Apps Script).
 * Publique como Web App (Implantar > Nova implantação > Tipo: App da Web,
 * "Executar como: eu", "Quem tem acesso: qualquer pessoa") e cole a URL no
 * SCRIPT_URL do index.html.
 */

// Nome da aba onde os leads são gravados.
var SHEET_NAME = 'Leads';
// Nome da pasta no Drive onde os prints são salvos.
var DRIVE_FOLDER = 'Placar Certo - Prints';

var HEADERS = [
  'Data/Hora (servidor)', 'Nome', 'WhatsApp', 'Casa',
  'Placar', 'Brasil', 'Haiti', '1º Marcador', 'Print (link)', 'User-Agent'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // serializa gravações pra não embaralhar linhas/timestamp
  try {
    var data = JSON.parse(e.postData.contents);
    var now = new Date(); // TIMESTAMP DO SERVIDOR — é ele que decide o vencedor

    var printUrl = '';
    if (data.printBase64) {
      printUrl = salvarPrint_(data.printBase64, data.nome, now);
    }

    var sheet = getSheet_();
    sheet.appendRow([
      now,
      data.nome || '',
      data.whatsapp || '',
      data.casa || '',
      data.placar || '',
      data.placar_br,
      data.placar_ht,
      data.primeiro_marcador || '',
      printUrl,
      data.userAgent || ''
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Teste rápido no navegador: abrir a URL do Web App deve mostrar "Placar Certo OK".
function doGet() {
  return ContentService.createTextOutput('Placar Certo OK');
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function salvarPrint_(dataUrl, nome, now) {
  // dataUrl = "data:image/png;base64,AAAA..."
  var match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl);
  if (!match) return '';
  var mime = match[1];
  var bytes = Utilities.base64Decode(match[2]);
  var ext = (mime.split('/')[1] || 'png').replace('jpeg', 'jpg');
  var stamp = Utilities.formatDate(now, 'GMT-3', 'yyyyMMdd-HHmmss');
  var safeName = (nome || 'lead').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_');
  var blob = Utilities.newBlob(bytes, mime, stamp + '_' + safeName + '.' + ext);

  var folder = getFolder_();
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getFolder_() {
  var it = DriveApp.getFoldersByName(DRIVE_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(DRIVE_FOLDER);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
