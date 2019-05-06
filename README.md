# Leaflet-based web map survey: parking-in-helsinki-region
This is a Leaflet based web map survey used to acquire user responses in form of areas (in Leaflet terms, polygons). The project was created for a master's thesis in the field of geoinformatics for the University of Helsinki. In this survey users respond a few questions about their usual parking habits in Helsinki Capital Region.

## About

After developing the research plan for my MSc thesis it quickly became apparent that I need to gather research data with a spatial dimension and in a large scale. Considering this it struck me by surprise that no web map surveys exist which could serve my purpose. Surely enough there are commercial ways to go about this, but these services easily cost hundreds of euros/dollars on a monthly basis so that really wasn't an option for me. For the reasons of budget and a requirement to produce a modern user survey with a modern user interface, I set out to program my own web map survey.

A short word of a disclaimer: As I started this project it was exactly the first time I have ever programmed JavaScript or used Leaflet in any meaningful manner. In addition, this project had me involved for the first time with web application development, CSS style sheets, web server management, Ubuntu command shell, Apache, MySQL and PHP. I have been in the programming scene barely two years and for these reasons it is certain that you will find here all sorts of unoptimised code, novice level code organising and structuring and so forth. I have, however, learned so much from this project, had much fun with it and I wish to take my skills further. I will be glad to see any improvements in the code made by the GitHub community.

My wish is also to provide this survey to anybody who might benefit from it in their unrelated projects or if someone just needs to set up a similar research survey. Hopefully this will be a time saver for you.


## Project contents
### Located in /var/www/, the survey file structure is as follows

- /var/www/
  - _insert.php_ - MySQL insertion function. Keep out of survey users' view
  - _config.php_ - set up connection to MySQL database. Keep out of survey users' view
  - /var/www/html/
    - _index.html_ - Main HTML framework, jQuery HTML content and a lot of JavaScript
    - _park_survey.js_ - L.Popup requires HTML code as a variable. This file contains the parking survey popup in HTML as a variable
    - _survey_funcs.js_ - Contains custom functions used by the script located in index.html
    - _survey_vars.js_ - Contains many static variables which are delegated here to declutter index.html
    - _style.css_ - Survey style sheet
    - _insert_mysql.php_ - Receive user response on server side, validation of response
    - _unique_visitors.php_ - Visitor counter
    - _en.json_ - English language strings
    - _fi.json_ - Finnish language strings
    - _pno_dissolve.geojson_ - Research area as the four municipalities
    - _pno_research_area.geojson_ - Postal areas for the research area
    - /var/www/html/images
      - project images, such as thank you messages and images for instructions

## Main features of the survey

### Front end

#### User experience functionality
* Basic Leaflet functionality 
  - Zoom in and out controls
  - Layer control
    - Three base map tile layer choices (Stamen Terrain, CartoDB dark_matter, OpenStreetMap)
    - Different styling for postal code areas GeoJSON layer depending on the base map tile layer
    - Possibility to switch off postal code areas layer
* Info screen
  - Tab-based dialog window
  - Detailed information about the scientific side of the survey and user instructions
  - Settings tab with the possibility to
    - Prevent info screen from popping up each time user visits the survey
    - Change the size of survey popup (small/medium/large (default))
    - Enter or leave an experimental mobile mode
* Multilingual
  - All strings translated between English and Finnish with the press of a button
  - Most of the translated strings are easily edited in their respective json files
    - Rest of translations are located inside the function `translate()`
* Search functionality
  - Search for locations and addresses in the research area
* Cookies
  - Remember user preferences for
    - Language choice
    - Basemap choice
    - Popup size
    - Whether to open info screen at startup
* Somewhat passable mobile compatibility
  - Enter an experimental mobile mode where jQuery dialog boxes are fitted for the entire screen
  - Adjust popup size
  - Hide user interface buttons when popup is open. Bring interface back with x, save changes or delete these records buttons

#### The map view
* The map itself
  - Keep track of unfinished postal code areas and show a notification if any are found
  - Track postal code area state as orange, unfinished and green, finished
  - Prevent popup being open at the same time as info screen
  - If a popup is open, a new one can be only opened once the last is closed (this one is important for how the values are saved to each postal code area) 
* The survey popup
  - Show a "this entry is unfinished" text if postal area questions are unfinished
  - Prevent illegal values in input number fields
  - Save functionality with "save changes" button, x button or clicking away from the popup
  - Deletion of the data in current postal code area
* Submitting records
  - Only make "submit records" button active once all postal code areas are finished
  - Once "submit records" button is pressed, show the amount of successful and failed sent records (if survey is used as intended, failed records should always be zero)
  - Give user possibility to view sent records in a report produced to a new browser tab

### Server side
* Validation of received response
  - Deny empty POST requests, redirect to index.html
  - Only accept specific variables in the `$_POST`
  - Validation of received values with `filter_var()` or regex `preg_match`
  - Setting up MySQL database connection and table insert out of users' view
  - Reporting of success or failure
* Visitor counter
  - Deny empty POST requests, redirect to index.html
  - Setting up MySQL database connection and table insert out of users' view



## Detailed description of code

fdsafdopfd

## Libraries and software
### This survey makes use of
* Libraries
  - [Leaflet](https://leafletjs.com) 1.4.0 by Vladimir Agafonkin
  - [EasyButton](https://github.com/CliffCloud/Leaflet.EasyButton) 2.4.0 by CliffCloud
  - [jQuery](https://jquery.com) 3.3.1
  - [jQuery UI](https://jqueryui.com) 1.12.1
  - [Leaflet-ajax](https://github.com/calvinmetcalf/leaflet-ajax) 2.1.0 by Calvin Metcalf
  - [Leaflet Control Geocoder](https://github.com/perliedman/leaflet-control-geocoder) 1.7.0 by Per Liedman
* Fonts and styles
  - Font Awesome 5.8.1
  - Montserrat - Google Fonts
* Server side software
  - Ubuntu 16.04.6 LTS
  - Apache HTTP Server 2.4.18 (Ubuntu)
  - MySQL 5.7.25-0ubuntu0.16.04.2
  - PHP 7.0.33-0ubuntu0.16.04.3

## Notes on where survey functionality is not optimal
* The submit records button always results in a success. In other words, a failure screen is not developed in this survey. The normal survey use should be impervious to incorrect data being sent to the server. In any case, the success screen always shows serverside results how many successes and failures the post operation had
  - in the case a failure occurs, the survey proceeds as if nothing is wrong and deletes all user inputs from the map view. This is obviously not optimal in case of server errors or something else unexpected
* Survey code in JavaScript and CSS are very un-optimised for mobilephones
  - dragging the map view is interrupted sometimes
  - sometimes dragging is not possible to begin with (unknown culprit)
* GeoJSON layer styling
  - There are problems in the handling of if statements inside the styling function
  - The styling of GeoJSON layer `postaldissolve` is commented, because it was not working as expected
  - For an unknown reason it seems that one feature in a GeoJSON layer always gets the default blue style at application start up. This is distracting if there are relatively few features present. For GeoJSON layer `postal` this is not an issue, but for `postaldissolve` it is
* some variable names may not be optimal ("sucimage")
* Disabled submit records button attempts to prevent clicks and dragging on the button. For dragging this is not completely successful
* One can't open by clicking on a feature on the GeoJSON layer `geojson`, but the map view is centered on that feature. Not optimal

## Features scrapped during development
* 280319 infobox cookie will not trigger from infobutton or x button. Only the red button at the bottom of introduction
* 020419 `findIntersection()` function and streamlined zip code area name fetch in `layerClickHandler()`
* 040419 discontinue use of `sessionid`, track ip instead
* 170419 discontinue language button animations in favor of country code icons

## Data used in this survey

The postal code areas (postal.geojson) and the research area (postaldissolve.geojson) are adapted from Statistic Finland's [Paavo - open data by postal code area, 2018](http://urn.fi/urn:nbn:fi:csc-kata20180425144903846834). This data is licensed in [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0).
