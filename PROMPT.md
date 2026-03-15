
Over 18
This application is a Joke application that makes fun of California's Assembly Bill 1043
https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260AB1043

The goal of this program is to provide a way for Linux to know if the current account is Over18
The application should be a Electron Flatpak that opens to a radio button to ask if the person is Over 18 or not.
If a .age file exists, then the option in that file should be selected, else nothing should be selected.

Option 1: I am under 18
Option 2: I am over 18

If under 18 is selected, provide a dropdown with Under 13, Under 16, And Under 18.
If this exists in the .age file, select what is in .age as the default.

When the Save button is pressed in the user's home folder create or update a file .age
The .age file should follow a .env style.  The Flatpak should have home directory access.
There should be an environmental variable Over18, which is either true or false.
There can also be a age, with options 12, 15, or 17, if under 18 is selected.
In the .age file, if Over18 is true, age should be omitted. 

The menu for the application should include File, Laws, Help
File should include Save and Exit.  Save here should do the same as the save button.
File Exit should warn of unsaved changes.
Laws should show the text of AB 1043, and Prop 65
Help should show 18 and About

AB 1043 should explain that this allows attestation for Linux to comply with AB 1043, the definition of  attestation, the text of AB 1043, and a note that this may apply in other jurisdictions like Colorado.

Prop 65 should show that "WARNING: Risk of Cancer And Reproductive Harm From Exposure to the computer this application is running on - www.P65Warnings.ca.gov.  Maybe next time wash your hands, and don't lick the caps."

18 should provide a page to print the number 18 in a size 36 font.

About should show that this application does exactly what it says, but this whole exercise is dumb, until everyone agrees to using the same signal then this doesn't do anything beyond writing a file. For another take on this please see Ageless Linux [https://agelesslinux.org/]

Please include a text box with GPL 2 on the About page