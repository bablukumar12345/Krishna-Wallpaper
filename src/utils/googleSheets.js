/**
 * googleSheets.js
 * ----------------------------------------------------------------------
 * Sends quotation requests to a Google Sheet via a Google Apps Script
 * Web App endpoint. This keeps the site 100% static / serverless.
 *
 * SETUP (one-time, on your Google account):
 * 1. Create a Google Sheet named "Krishna Wallpaper Quotations".
 * 2. Extensions -> Apps Script, paste the snippet below, then
 *    Deploy -> New deployment -> Web app -> Execute as "Me",
 *    Access "Anyone" -> Deploy. Copy the generated Web App URL.
 * 3. Put that URL in a `.env` file at the project root as:
 *      VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/XXXX/exec
 *
 * --- Apps Script (Code.gs) ---
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     new Date(),
 *     data.name,
 *     data.phone,
 *     data.address,
 *     data.message,
 *   ]);
 *   return ContentService.createTextOutput(
 *     JSON.stringify({ result: 'success' })
 *   ).setMimeType(ContentService.MimeType.JSON);
 * }
 * ----------------------------------------------------------------------
 */

const SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

/**
 * Submit a quotation request.
 * @param {Object} formData - { name, phone, address, message }
 * @returns {Promise<{ok: boolean, message: string}>}
 */
export async function submitQuotation(formData) {
  const payload = {
    ...formData,
    submittedAt: new Date().toISOString(),
  };

  if (!SHEETS_ENDPOINT) {
    // Integration not yet configured — fail gracefully so the UI can
    // still confirm receipt to the user during development.
    console.warn(
      'VITE_GOOGLE_SHEETS_URL is not set. Quotation payload was NOT sent:',
      payload
    );
    return {
      ok: true,
      message: 'Request captured locally (Google Sheets endpoint not configured yet).',
    };
  }

  try {
    await fetch(SHEETS_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors', // Apps Script web apps typically require no-cors from the browser
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });
    return { ok: true, message: 'Your quotation request has been sent successfully.' };
  } catch (error) {
    console.error('Google Sheets submission failed:', error);
    return { ok: false, message: 'Something went wrong. Please try again or WhatsApp us directly.' };
  }
}
