// Google Apps Script — Deploy as Web App to save Body Fat Calculator leads to Google Sheets
//
// SETUP:
// 1. Go to https://script.google.com and create a new project
// 2. Paste this entire code into Code.gs
// 3. Replace SPREADSHEET_ID with your Google Sheet's ID (from its URL)
// 4. Click Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the deployment URL
// 6. Paste it into index.html replacing 'GOOGLE_APPS_SCRIPT_URL'

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Body Fat Calculator Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Timestamp', 'Name', 'Email', 'Phone',
        'Gender', 'Age', 'Body Fat %', 'BMI',
        'Fat Mass (kg)', 'Lean Mass (kg)', 'Category', 'Waist (inches)'
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight('bold');
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.gender || '',
      data.age || '',
      data.bodyFat || '',
      data.bmi || '',
      data.fatMass || '',
      data.leanMass || '',
      data.category || '',
      data.waist || ''
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Body Fat Calculator Lead API is running.');
}
