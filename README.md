# parking-in-helsinki-region
Current project:
Leaflet.js based web survey to acquire information about parking in Helsinki Capital Region.

Leaflet.js Parking survey consists of
* index.html - main HTML framework, jQuery HTML content and a lot of JavaScript
* park_survey.js - L.Popup requires HTML code as a variable. This file contains the Popup parking survey in HTML as a variable
* survey_funcs.js - Contains custom functions used by js script located in index.html
* survey_vars.js - Contains many static variables which are delegated here to declutter index.html
* style.css - Survey style sheet
* en.json - English language strings
* fi.json - Finnish language strings

GeoJSON data
* pno_dissolve.geojson - Research area as the four municipalities
* pno_research_area.geojson - Postal areas for the research area

This survey makes use of
* Libraries
  - Leaflet 1.4.0
  - EasyButton 2.4.0
  - jQuery 3.3.1
  - jQuery UI 1.12.1
  - Leaflet.ajax 2.1.0
  - Control.GeoCoder
* Fonts and styles
  - Font Awesome 5.8.1
  - Montserrat - Google Fonts
* Server side software
  - Ubuntu 16.04
  - Apache HTTP Server
  - MySQL
  - PHP

Notes on where survey functionality is not optimal
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

Features scrapped during development
* 280319 infobox cookie will not trigger from infobutton or x button. Only the red button at the bottom of introduction
* 020419 findIntersection() function and streamlined zip code area name fetch in layerClickHandler()
* 040419 discontinue use of sessionid, track ip instead
* 170419 discontinue language button animations in favor of country code icons
