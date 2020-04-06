# Ionic Expenses Application for JHub Coding Scheme
 
 To install the applicaiton download the repo and run;
 
  - npm install
  - ionic build
  - ionic capacitor run android
  
The applicaiton was tested in Android studio on an emulated device and on a real Android device. The application behaved as expected in both instances. It will not run in a web browser due to the native components provided by capacitor such as the camera and file access.

The application fulfils the specification and saves each expense claim as a text file with the total amount calculated in the app. The user also has the option of taking a picture of the receipt using the phones camera. The receipt picture is saved to the phone using the date time stamp as it's file name. It is also saved to the text file for the claim so even if the user deletes it from the phone the picture can still be used.

When a expense is entered into the app a file will be created. This file will have all expense detials saved in it and the file name will be the time that the expense was entered into the application. This is in the format of unix time and can also be considered to be a time stamp.

It is not possible to view previous expenses within the app. This could be implemented later however I did not do this as it was not part of the specification.

To view a video of the application running and meeting the specification got to; ADD YT LINK HERE.
