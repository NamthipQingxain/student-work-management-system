function onFormSubmitTrigger(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get the header row (row 1) and the latest submitted row
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();

    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var latestRowValues = sheet.getRange(lastRow, 1, 1, lastCol).getValues()[0];

    // Build a JSON object mapping headers -> latest row values
    var jsonObject = {};
    for (var i = 0; i < headers.length; i++) {
      var key = headers[i] ? headers[i].toString().trim() : "Column" + (i + 1);
      var value = latestRowValues[i];

      // Convert Date objects to ISO strings so JSON.stringify handles them predictably
      if (value instanceof Date) {
        value = value.toISOString();
      }

      jsonObject[key] = value;
    }

    var jsonString = JSON.stringify(jsonObject);

    var recipient = "6752300241@stu.pim.ac.th";
    var subject = "[NEW_SYNC] New Data from 01_Company_Job_Sync";

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: jsonString
    });

  } catch (error) {
    Logger.log("Error in onFormSubmitTrigger: " + error.toString());
  }
}
