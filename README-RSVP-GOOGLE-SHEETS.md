# How to link the RSVP form to your Google Sheet

I have updated the RSVP code to submit directly to a Google Sheet via a POST request and removed the WhatsApp redirect. The popup functionality remains fully intact as the native template design.

To make it work, you just need to create a Google Sheet and hook it up. Here are the step-by-step instructions:

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like "Wedding RSVPs".
3. In the first row, you can optionally add headers like: `Timestamp | Name | Attending | Dietary Intolerances`

### Step 2: Add the Apps Script
1. In your new Google Sheet, go to the top menu and click **Extensions > Apps Script**.
2. Delete any code there and paste the following script:

```javascript
const SHEET_NAME = 'Sheet1'; // Change this if you rename the tab at the bottom of your sheet

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Append the new row
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name || '',
      data.attending || '',
      data.dietary || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click the **Save** icon (floppy disk).

### Step 3: Deploy the Script
1. In the top right corner of the Apps Script editor, click the blue **Deploy** button, then select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Under "Description", type "RSVP Webhook".
4. Under "Execute as", make sure it is set to **Me (your email)**.
5. Under "Who has access", change it to **Anyone**. *(This is required so the website can send data to it).*
6. Click **Deploy**.
7. Google will ask you to authorize access. Click "Authorize access", choose your account, click "Advanced", and then "Go to project (unsafe)", then "Allow".
8. Once deployed, you will get a **Web app URL** (it starts with `https://script.google.com/macros/s/.../exec`). **Copy this URL**.

### Step 4: Update the Website Code
1. Open the `index.html` file in your code editor.
2. Look for line ~158 or search for `YOUR_GOOGLE_SCRIPT_URL`.
3. Replace `"YOUR_GOOGLE_SCRIPT_URL"` with the URL you just copied. 
   *(Make sure to keep the quotes around it, like: `const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfyc.../exec";`)*
4. Save the file and you're done! Test it out and you should see new responses appear in your sheet.
