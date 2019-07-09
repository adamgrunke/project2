# Express Authentication

Express authentication template using Passport + flash messages + custom middleware

## Getting Started

#### Scaffold w/tests (see `master` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Change the database names in `config/config.json` to reflect your project
  * Run `createdb project_name_development` to create the development database
  * Run `createdb project_name_test` to create the test database

#### Finished version (see `brian-finished` branch)

* Run `npm install` to install dependencies
  * Use `npm run lint:js` to lint your JS
  * Use `npm run lint:css` to lint your CSS
  * Use `npm test` to run tests
* Setup the databases
  * Run `createdb express_auth_development` to create the development database
  * Run `createdb express_auth_test` to create the test database
  * Run `sequelize db:migrate` to run migrations








*====================================*




Project 2 - Neighborhood Cleanup 

Identify item
Mark location of item.
List tools required for cleanup.
Show safety recommendations for cleanup.
Share to public map.
Remove item after cleanup. 

Stretch goals:

Upload image of item.
Gamify by awarding score.



*********************
What data? 

Item 
-is it sharp
-Hazard level
-Size
-location


User
-name
-email
-password



********************


userFoundItems

allFoundItemsBB


*********************

Pages

Landing page - login / create account

Add Item page - fast. Super easy. 
	- grab location when form loads.
	- type of item select buttons. 
	- optional notes.
	- submit.



Show user items to be picked up
Show all items nearby to be picked up

Show metrics
	user metrics only
	user metrics compared to … all users within range… all users



*****************************************
Brainstorming
*****************************************


How does the user interact with this application? 

Step 1: the user identifies something they want to clean up, but do not have the tools at that moment.

Step 2: the user opens the app and selects the ADD ITEM button.

Step 3: Behind the scenes - the app calls the geolocation api for the user’s current location. Once that data has arrived, the location is shown on a map.

Step 4: Below the map, there are options for the item description. These descriptors are stored in the “item” model.
	* Hazardous boolean
	* Sharp boolean
	* Waste boolean
	* Needs broom boolean
	* …

Step 5: After the descriptor selection is complete, the user can submit. This will push a new item to the items model and return the user to the main options page.




The main options page shows the following options. 
	1. Enter a new item.
	2. Review items entered by user.
	3. See a map that includes nearby items entered by other users. 


Models:
	Users - email, name, password(hashed)
	Items - location, hazardous, sharp, waste, broken
	Tools - gloves(nitrile), gloves(thick), medical waste container, dog bag, broom and dust bin. 
	

Model relationships: 
	Each user can enter multiple items. 
	In theory, each item could have multiple users unless I come up with a way to prevent a potential repeat entry. Could check if that location already has something in the db and ask the user if it could be the same thing. 
	The relationship between users and items should be N:M
	Each item could require multiple tools for cleanup. 1:M 
	There is the possibility that the same broom will be used to clean up multiple items, but that relationship is not required for reporting. 

| user	|
|:===:|
| id [pk] | 	int|
| email |	string|
| password |	string|


| item |	|
| hazardId |	boolean|
| toolId |	string|
| location | 	string|
	

	
tool	
nitrile_gloves	boolean
work_gloves	boolean
broom	boolean
sharp_storage	boolean
dog_bag	


hazard	
1   needle
2   glass	
3   waste	

sequelize model:create --name hazard --attributes type:string 

sequelize model:create --name item --attributes hazardId:integer,location:string,userId:integer,cleanerId:integer

sequelize model:create --name tool --attributes type:string

sequelize model:create --name hazardsTools --attributes hazardId:integer,toolId:integer
sequelize model:create --name itemsHazards --attributes itemId:integer,hazardId:integer

// already created // sequelize model:create --name user --attributes email:string,name:string,password:string

sequelize db:migrate


models.user.hasMany(models.item);
models.item.belongsTo(models.user);

models.item.belongsToMany(models.hazard, {through: 'itemsHazards'});
models.hazard.belongsToMany(models.item, {through: 'itemsHazards'});

models.tool.belongsToMany(models.hazard, {through: 'hazardsTools'});
models.hazard.belongsToMany(models.tool, {through: 'hazardsTools'});

sequelize seed:generate -- name [name]
sequelize db:seed:all
sequelize db:seed:undo:all

***************************************
Navigator.Geolocation docs
***************************************

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
The geolocation object
Section
The Geolocation API is published through the navigator.geolocation object.
If the object exists, geolocation services are available. You can test for the presence of geolocation thusly:
if ("geolocation" in navigator) {
  /* geolocation is available */
} else {
  /* geolocation IS NOT available */
}

Note: On Firefox 24 and older versions, "geolocation" in navigator always returned true even if the API was disabled. This has been fixed with Firefox 25 to comply with the spec. (bug 884921).
Getting the current position
Section
To obtain the user's current location, you can call the getCurrentPosition() method. This initiates an asynchronous request to detect the user's position, and queries the positioning hardware to get up-to-date information. When the position is determined, the defined callback function is executed. You can optionally provide a second callback function to be executed if an error occurs. A third, optional, parameter is an options object where you can set the maximum age of the position returned, the time to wait for a request, and if you want high accuracy for the position.
Note: By default, getCurrentPosition() tries to answer as fast as possible with a low accuracy result. It is useful if you need a quick answer regardless of the accuracy. Devices with a GPS, for example, can take a minute or more to get a GPS fix, so less accurate data (IP location or wifi) may be returned to getCurrentPosition().
navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});



The above example will cause the do_something() function to execute when the location is obtained.


***************************************
***************************************



Description |	Controller - Path   |	Controller - Method | Controller - Action	Model - Sequelize	View - Response Contents	View - Logic	View - Links to…

________________________________________________________________________________________________________________________________
|   Description     |               Controller              |       Model       |                        View                       |
|                   | Path          |   Method  |   Action  |     Sequelize     | Response Contents |   View Logic  |   Links to... |
________________________________________________________________________________________________________________________________
|Root route - login	|   /           |   GET     |   index   |                   |                       | 						
User profile home	|   /profile	|   GET					


New Item Entry	/user/new						
Index of user’s items	/user/index						
	







Login/Signup 	-> profile	-> new-item -> back to profile after added
					or
					-> index of items	-> show-item	-> back to index
												or
												-> back to profile





End of monday plan:
Make a form that POSTS the lat/long to the item location model.
item model requires: hazardId, location, userId, cleanerId. 
submit cleanerId as a null for later update once someone picks up the item.
I need to know how mapbox wants the lat/long info before I post to the item db. 
When the user submits the form, hits the /user/new POST route and then redirects back to the user's profile.
Success of submission should be shown on the users page using FLASH for now. 

user profile page should show a map of all items submitted within a certain range from the
user's current location. 
This means that I need to grab the user's location when they hit the profile page. 


Tuesday afternoon:
When the profile page loads, access the items db and pass that data to the ejs page to display
on the mapbox map. 

Do I want to select the item from the map to go to the single item page? Should the map center on that 
item when selected? 

<input type='text' name="lat" value="<%=position.coords.latitude%>" >
<input type='text' name="long" value="<%=position.coords.longitude%>" >



EJS Views
USER PROFILE
User profile page shows the users location centered on a map and has the form for entering a new item.
Data needed when page loads - navigator.geolocation.getCurrentPosition.
Data for new item added by user into the form.

Form Submit renders to the user profile page with a success flash indicating the data was saved.

ITEM VIEWS index
User sees items on the map that have already been entered. Map is centered on their location. 
Data needed when page loads - navigator.geolocation.getCurrentPosition.
Data from db - item.location from the items table will show as pins on the map within the view zoom range. 
Data for each item on map item.id for the show page.

Selecting an item from the map will take the user to the show item details page.

ITEM SHOW DETAILS
Display the location of the item on the map along with the user's location as a reference. 
Display the tools needed for the item cleanup. 
Allow the user to "Clean up" the item from the database. 
Data needed for this page - location of user, location of item, tools needed, 
render to user profile page



Problems with the navigator.geolocation.getCurrentLocation. 
File under weird: 
If anyone is using navigator.geolocation.getCurrentPosition and it doesn't work all of a sudden, it might not be something wrong with your code. I've had some issues with this breaking while I've been using Chrome. If it breaks and you can't figure out why, then try out a different browser. Instantly worked with Firefox ... and then it started working again in Chrome. 

Updating the item table: 
Here are my steps that I'll follow to drop the item table and create a new model that includes
lat AND long as seperate data in the model.

Step 1: create temporary copies of the seeder, model, and migration files for items as reference.

Step 2: DROP TABLE
Step 3: sequelize model:create --name item --attributes hazardId:integer,lat:string,lng:string,userId:integer,cleanerId:integer --force

Step 4: sequelize db:migrate

Step 5: deleted old migration for create-item

Step 6: added associations to the model
models.user.hasMany(models.item);
models.item.belongsTo(models.user);

Step 7: update seeder even though I won't need to use it for now. 
update the post route for profile to have seperate lat/lng instead of combined location.

Step 8: Test it out!
page loads as previously working. All data gets to the items table. 

sequelize db:seed --seed seeders/20190702183553-items.js

REMOVED from the layout.ejs file.
<%- JSON.stringify(currentUser) %>

create an add new tool or hazard page for the tool and hazard models.
create a delete tool or hazard page for the tool and hazard models.

<h1><%=req.params.id%>%></h1>

<form method="POST" action="/show-all-items/<%= currentUser %>?_method=PUT ">
            <input type="submit" value="update"/>
        </form>

Monday morning plan:
Associate tools with items.
Show tools needed when point on map is selected. 
