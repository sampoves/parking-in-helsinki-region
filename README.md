# parking-in-helsinki-region
Current project:
Leaflet.js based web survey to acquire information about parking in Helsinki Capital Region.

Leaflet.js Parking survey consists of
* index.html - main HTML stuff and a lot of JavaScript
* park_survey.js - L.Popup requires HTML code as a variable. This file contains the Popup parking survey in HTML as a variable
* survey_funcs.js - contains custom functions used by js script located in index.html
* survey_info.js - HTML text. Instructions and stuff
* style.css - style sheet

GeoJSON data
* pno_dissolve.geojson - Research area as one Polygon
* pno_research_area.geojson - Postal areas for the research area
* seutukartta_pienalue.geojson - Seutukartta aluejako pienalue areas for the research area

Old stuff:
Currently vacationing, it'll be back. Python script to refine and analyse data produced in parking field survey
* parking.py - main script
* parking_func.py - auxiliary functions
