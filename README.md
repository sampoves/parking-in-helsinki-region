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

Other thesis material:
This part is currently vacationing, it'll be back. Python script to refine and analyse data produced in parking field survey. Will be majorly updated once responses start to flow in.
* parking.py - main script
* parking_func.py - auxiliary functions

Features scrapped during development
* 280319 infobox cookie will not trigger from infobutton or x button. Only the red button at the bottom of introduction
* 020419 findIntersection() function and streamlined zip code area name fetch in layerClickHandler()
* 040419 discontinue use of sessionid, track ip instead
* 170419 discontinue language button animations in favor of country code icons
