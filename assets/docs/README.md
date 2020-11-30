name='FujiApp',
description="Allows Fuji FSE's to Extract Recipes from a Fuji machine",
version="0.1",

main python file = fujiRecipeExtractor.py

---

                                INSTALLATION

---

Copy the entire directory on to the PC you want it installed. And then install
python3.x

Python3.x MUST be installed on their machine and the file path to python3.x must
be added to the system path.

#ADD PYTHON3.x TO PATH
To add python3.x to the system PATH on your PC follow the instructions in the
following link:

https://geek-university.com/python/add-python-to-the-windows-path/

#INSTALL REQUIRED PACKAGES
Use the following commands to install packages (MUST BE CONNECTEED TO THE INTERNET):

    python -m pip install -U wx
    python -m pip install pylogix
    python -m pip install pypubsub

For new versions all you have to do is change the python code in the RecipeExtractor
file. And release it to the FSEs.

#CREATE A SHORTCUT
To create a shortcut right click on the FujiApp.exe and select "Create Shortcut".
Then drag SHORTCUT to the Desktop. Right-Click again on the SHORTCUT and select
properties. Then press the Change Icon... button. Browse through the folders of
this folder.

/docs
/img
/fujisealmini.ico

Select the "fujisealmini.ico" press OK

---

                                  USES

---

There are 2 use Cases:

-FSE
-ADMIN

#FSE
There will be Four types of screens:

-Fuji Machines (i.e. 400 series, Carrousel)
-View Recipe
-Compare Recipe
-Config

\*Fuji Machine
Fuji Machine pages display the required IP Address, the Current Recipe Name, and
date.

To use press the Connect Button, if the FSEs PC is on the correct Network, then
After a few seconds, the Message display will show "Connected to PLC at {IP Address}"

If something went wrong then the Message display will show "Could not Connect to
{IP Address}"

Then press The Extract Button which will take the application stored recipe and
write to the specified csv file from Save As Dialog window.

\*View Recipe
This will allow the user to view the current loaded Recipe within a taken from
the connected machine.

The program list will update when a Recipe is loaded from the machine screen and
the table will update when a program is selected.

\*Compare Recipe
This will allow the user to compare the two loaded recipes from csv
files. The tag list will update when a recipe is uploaded from csvfile. If two
recipes are loaded then a compare is done and only the difference in parameters
are seen.

This can also be used to see a full recipe if no other recipe is loaded.

The Clear Button removes the loaded recipe associated with the button.

\*Config
The Config page allows the FSE to import a given config from an admin to update
the tag and machine databases. Use the Open File button to select the config file
and then the import to load the tag and machine data.

#ADMIN
With ADMIN permissions the user inherits everything the FSE can do, but also get
some added features to manipulate the tag database. The views include:

-Fuji Machines (i.e. 400 series, Carrousel)
-Add UDT
-Add/Delete Tag
-View Recipe
-Compare Recipe
-Preserve Data
-Config

\*Fuji Machines
See #FSE section above

\*Add UDT
This takes in a file, the Machine type, the Tag name, Program and the type of
parameter, to update the tag database.

The file is called a User Defined Tag (UDT), these are basically like the
file data structures like the ones used on Windows that defines how to contain
information in a Tag.

The Fuji machine uses a lot of UDTs. More specifically most of the data needed
to read the recipe from the machine are stored in UDTs.

First press the Open button and select the UDT that the Tag will bases on.
Select the machine to add the Tag to, and enter the name of the Tag. Select the
Program in the drop-down list. If not Enter it in the text box. Then select
the type of parameter.

The type of parameter is based on which array the information will be based on
the SF10906_Machine_Par[2500] array or the SF10906_Product_Par[2500] array. This
can be found in the program.

Click the Save Tag button. The Table should up date the tag table, if it does
then the Tag data base has updated.

\*Add/Delete Tag
This is similar to the Add UDT page but here only one tag can be added at a Time.
It also adds the ability to delete tags from the database.

Some of the tags that hold recipe data in the program are not based on UDTs so
this screen must be used for this purpose.

Do the same process to add a Tag as the Add UDT page, except for loading the UDT.

To delete a Tag Select a tag on the table an press Delete Tag button or the del
key on the keyboard. Multiple tags can be selected and deleted from the database

\*View Recipe
This will allow the user to view the current loaded Recipe within a taken from
the connected machine.

The program list will update when a Recipe is loaded from the machine screen and
the table will update when a program is selected.

\*Compare Recipe
See above

\*Preserve Data
This will read only the raw values of each array (SF10906_Machine_Par[2500] and
SF10906_Product_Par[2500]). The values are only stored within the program not in
any accessible document. The Write Parameters will write whatever is stored in
the program an write it directly to each array.

**_This should be used with great care, until improved!!!_**

\*Config
The Config page is the same as the FSE except ADMINs can export the admin rights,
Tag database, and Machine database

ADMIN Rights are defaulted to False. As of now the only way to change this is
manually in the config file.

---

                                  DEVELOPMENT

---

This section is laid out in the following manner:

-File Structure
-Tag Database
-Machine Database
-Creating the Executables

#FILE STRUCTURE
This project follows the Model View Controller(MVC) schema.

The Models control the backend and are not aware of the Controller but publish
information to a message server. If something is listening it can grab the data
if not, it doesn't effect the model and it can keep doing its job when called.
The models are stored in the File "models".

The Views are what makes up the GUI. It should be able to act on its on as well,
but it can listen on the topics produced by the Models. It can also be told what
to do directly from the controller. These are stored in the "views" folder.

The Controller controls the flow of information from Models to Views. It tells
them what to do and when.

the "docs" folder contains images, the config file, Recipe.csv default location,
and a place to keep UDTs.

#TAG DATABASE
The current tag database is separated into different files per machine and saved
as a python dictionary (Maybe transfer to a sqlite database eventually).

There are two dictionaries, MACHINE_PARAMETERS and PRODUCT_PARAMETERS. They are
composed of key:value pairs the keys being the Program Abbreviations such as the
program: EMxxxxx_CV_0x the abbreviations would be CV. The values are list of tag
paths created by the ADMIN.

There are also Lists of the known programs that have parameters and a list of all
programs even the ones with no parameters.

The two files currently containing the Tag database are:

-models/recipes/Carrousel.py -> "Carrousel"
-models/recipes/FujiMachine.py -> "400 Series"

#MACHINE DATABASE
The machine data base is actually a python class, which contains the name, the path
to the correct tag database file.

\*Adding a Machine
Adding new machines have to be done manual at the moment. Add the name to
self.machines dictionary along with a index key great than the one beofore it.
Add the file path to the database to the self.filepaths to mirror the others like,
"currentDir + '/models/recipes/xxxxxx.py'", and add the index like the name.

Add the import statement like:

"elif index == {last index + 1}:
from models.recipes.xxxxxx import MACHINE_PARAMETERS, PRODUCT_PARAMETERS,
KNOWN_PROGRAMS_LIST, ALL_KNOWN_PROGRAMS_LIST"

under import_params.

#CREATING EXTECUTABLES
Open a command prompt use cd to the RecipeExtractor folder. For example mine would be

cd C:\Users\nsnyder\Desktop\RecipeExtractor

For the Regular FujiApp.exe run the following command:

bat2exe hidefujiapp.bat FujiApp.exe

For the FujiAppWithLog.exe run:

bat2exe fujiapp.bat FujiAppWithLog.exe

---

                                  KNOWN ISSUES

---

Any issues under FSE Tools are the same for the ADMIN

#UNDER FSE TOOLS

#UNDER ADMIN TOOLS

-Preserve Data Tool not confirmed

---

                                  IMPROVEMENTS

---

#UNDER FSE TOOLS

-Full Proof Preserve Data for FSE use
-Add Tag/Machine database version display on Config
-Separate msgs to each display
-Add priority to msg display (by adding a msg dictionary and active list)

#UNDER ADMIN TOOLS

-Better install tool
-Automate adding a machine
-Speed up building a Recipe by making a "iterator"
-Add Admin check box when Exporting Config file
-Add version to databases

#POSSIBILE IMPROVEMENTS

-Move csv writing to a model to better fit the MVC schema
-Moving Tag/Machine databases to a sqlite database

#MADE BUT NOT DOCUMENTED
Place improvements made but not documented in the README file, or version control
file
