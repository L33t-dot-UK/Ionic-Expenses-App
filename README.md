# Ionic Expenses Application for JHub Coding Scheme
 
 To install the applicaiton download the repo and run;
 
  - npm install
  - ionic build
  - ionic capacitor run android

If you run this application on Android version 10 (API 29+) or above you need to enter the follow line in the AndroidManifest file under the application tag;

    android:requestLegacyExternalStorage="true"
    
If this is not entered in the mainfest file the applicaiton won't save expenses to the users phone. For ease I have included a mainifest file in the root of the project that can be used instead of the mainfest file created for Android Studio.

The applicaiton was tested in Android studio on an emulated device (API version 27) and on a real Android device (API version 30). The application behaved as expected in both instances. It will not run in a web browser due to the native components provided by capacitor such as the camera and file access.

The application fulfils the specification and saves each expense claim as a text file with the total amount calculated in the app. The user also has the option of taking a picture of the receipt using the phones camera. The receipt picture is saved with the rest of the expense claim in a text file using comma seperated values to seperate the data. The file name is used as a time stamp in unix time format. This time stamp is generated when the expense claim is entered into the application. Each expense claim will create a new file with a new timestamp.

It is not possible to view previous expenses within the app. This could be implemented later however I did not do this as it was not part of the specification.

To view a video of the application running go to; https://youtu.be/oKy7cZTocTI.
