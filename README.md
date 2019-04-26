# Leaflet-based web map survey: parking-in-helsinki-region
This is a Leaflet based web map survey used to acquire user responses in form of areas (in Leaflet terms, polygons). The project was created for a master's thesis in the field of geoinformatics for the University of Helsinki. In this survey users respond a few questions about their usual parking habits in Helsinki Capital Region.

## About

After developing the research plan for my MSc thesis it quickly became apparent that I need to gather research data with a spatial dimension and in a large scale. Considering this it struck me by surprise that no web map surveys exist which could serve my purpose. Surely enough there are commercial ways to go about this, but these services easily cost hundreds of euros/dollars on a monthly basis so that really wasn't an option for me. For the reasons of budget and a requirement to produce a modern user survey with a modern user interface, I set out to program my own web map survey.

A short word of a disclaimer: As I started this project it was exactly the first time I have ever programmed JavaScript or used Leaflet in any meaningful manner. In addition, this project had me involved for the first time with web application development, CSS style sheets, web server management, Ubuntu command shell, Apache, MySQL and PHP. I have been in the programming scene barely two years and for these reasons it is certain that you will find here all sorts of unoptimised code, novice level code organising and structuring and so forth. I have, however, learned so much from this project, had much fun with it and I wish to take my skills further. I will be glad to see any improvements in the code made by the GitHub community.

My wish is also to provide this survey to anybody who might benefit from it in their unrelated projects or if someone just needs to set up a similar research survey. Hopefully this will be a time saver for you.


## Project contents
### Located in /var/www/, the survey file structure is as follows

- /var/www/
  - insert.php - MySQL insertion function. Keep out of survey users' view
  - config.php - set up connection to MySQL database. Keep out of survey users' view
  - /var/www/html/
    - index.html - main HTML framework, jQuery HTML content and a lot of JavaScript
    - park_survey.js - L.Popup requires HTML code as a variable. This file contains the Popup parking survey in HTML as a variable
    - survey_funcs.js - Contains custom functions used by js script located in index.html
    - survey_vars.js - Contains many static variables which are delegated here to declutter index.html
    - style.css - Survey style sheet
    - en.json - English language strings
    - fi.json - Finnish language strings
    - pno_dissolve.geojson - Research area as the four municipalities
    - pno_research_area.geojson - Postal areas for the research area
    - /var/www/html/images
      - project images, such as thank you messages and images for instructions


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
