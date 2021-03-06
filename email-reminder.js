function sendReminder() {
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();//fetch the spreadsheet object
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0])//set the first sheet as active
  var sheet = spreadsheet.getActiveSheet();// fetch this sheet
  
  var startRow = 2;// star at row 2 because row 1 is headers
  var lastRow = sheet.getLastRow();// find the last row

  // grab the "days left" column
  var range = sheet.getRange(2,3,lastRow-startRow);
  var numRows = range.getNumRows();
  var daysLeft= range.getValues();
  
  // Now grab the "toy name" column
  range = sheet.getRange(2, 8, lastRow-startRow);
  var toys = range.getValues();
  
  // Now grab the "email address" column
  range = sheet.getRange(2, 5, lastRow-startRow);
  var emailAddress = range.getValues();
  
  //Now grab the "returned?" column
  range = sheet.getRange(2, 9, lastRow-startRow);
  var returned = range.getValues();
  
  // Now grab the "email sent?" column
  range = sheet.getRange(2, 10, lastRow-startRow);
  var emailSent = range.getValues();
  
  // This what will automatically enter into the 'email sent' column once the follow-up email is sent
  var sent = "Yep!"
  
  // Loop through the data
  for(i=0; i <= numRows; i++){
    var daysLeftValue = daysLeft[i];
    var toysValue = toys[i];
    var emailAddressValue = emailAddress[i];
    var returnedValue = returned[i];
    var emailSentValue = emailSent[i];
   
   // if the toy is due in exactly two days AND it hasn't been returned yet, send a reminder email to the teacher
    if(daysLeftValue == 2 && returnedValue != 'y') {
   MailApp.sendEmail(emailAddressValue, "Dancing Bear Toys Reminder","Hi there! Just wanted to let you know that " +toysValue+ " is due in two days! Thanks for using our lending library! Your pals at Dancing Bear Toys");
  }
    
    // if the toy is due today AND it hasn't been returned yet, send another reminder email to the teacher
    else if (daysLeftValue == 0 && returnedValue != 'y'){
      MailApp.sendEmail(emailAddressValue, "Due Date Reminder | Dancing Bear Toys", "Hi there! Just wanted to remind you that " +toysValue+ 
                        " is due today! Thanks! Your pals at Dancing Bear Toys");
}
    // if the toy is three days overdue AND it hasn't been returned yet, send an overdue notice to the teacher
    else if (daysLeftValue == -2 && returnedValue != 'y'){
      MailApp.sendEmail(emailAddressValue, "Overdue Toy Reminder | Dancing Bear Toys", "Hi there! It looks like " +toysValue+ " is two days past due! Please bring it back as soon as you can so the next teacher can check it out. Thanks for using the lending library! Your pals at Dancing Bear Toys");
    }
    // if the toy is one week overdue AND it hasn't been returned yet, send ourselves an email to check up on it
    else if (daysLeftValue == -7 && returnedValue != 'y'){
      MailApp.sendEmail("marketingdbt@gmail.com", "AAAAAAAAAAAAAHHHHH OH MY GOD", "DEF CON 1 MY FRIENDS. " +toysValue+ " IS A WEEK PAST DUE! RUN!");
    
  }
    // if the toy is returned AND the feedback email hasn't already been sent, send an email asking for feedback on the toy
    else if (returnedValue == 'y' && emailSentValue != "Yep!"){
      MailApp.sendEmail(emailAddressValue, "Lending Library Survey | Dancing Bear Toys", "Hi there! Thanks so much for using our lending library. Show us this email and recieve 20% off a toy for the classroom! Please fill out this short form about " +toysValue+ " so we can better recommend it to teachers next time! Thanks! Your pals at Dancing Bear https://goo.gl/forms/KZPTfuzbaAq6qAvm2")
      sheet.getRange(startRow + i, 11).setValue(sent);
      SpreadsheetApp.flush();
  
}
  }
}
  

     
