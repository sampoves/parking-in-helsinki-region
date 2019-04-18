/* 
 * These are some of the variables used by Leaflet popup survey for University 
 * of Helsinki master's thesis "Parking of private cars and accessibility in 
 * Helsinki Capital Region".
 * Written by Sampo Vesanen in 2019.
 */

//BOUNDS VARIABLES FOR MYMAP
var corner1 = [60.6, 24.37];
var corner2 = [60.05, 25.305884];
var bounds = L.latLngBounds(corner1, corner2);


//---------------------------------
//INITIALISE BACKGROUND TILE LAYERS
//---------------------------------
//
//CartoDB dark_matter
//https://github.com/CartoDB/basemap-styles
var darkmatter = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png',
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        "detectRetina": false,
        "maxNativeZoom": 18,
        "maxZoom": 18,
        "minZoom": 0,
        "noWrap": false,
        "opacity": 1,
        "subdomains": "abc",
        "tms": false
});

//OpenStreetMap
var OpenStreetMap_DE = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        minZoom: 0,
        maxZoom: 18,
        subdomains: 'abcd',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>'
});

//Stamen terrain
var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 2,
        maxZoom: 18,
        ext: 'png'
});


//-----------------------------------
//INITIALISE "ONLY LABELS" TILELAYERS
//-----------------------------------

var darkmatterOnlyLabels = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
        minZoom: 2,
	maxZoom: 18,
        pane: 'labels'
});

var StamenTerrainOnlyLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 2,
        maxZoom: 18,
        ext: 'png',
        pane: 'labels'
});

var voyagerOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
        minZoom: 0,
        maxZoom: 18,
        subdomains: 'abcd',
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
        pane: 'labels'
});


//------------------------------
// GEOJSON LAYER STYLE VARIABLES
// -----------------------------

var stylePostal = {
    "color": "#ff7800",
    "weight": 3,
    "opacity": 0.2,
    "fillOpacity": 0
};

var stylePostalDark = {
    "color": "#082759",
    "weight": 3,
    "opacity": 0.3,
    "fillOpacity": 0
};

// for postaldissolve
var styleArea = {
    "color": "#ff7800",
    "weight": 3,
    "opacity": 0.5,
    "fillColor": '#0000FF',
    "fillOpacity": 0
};

// for postaldissolve
var styleAreaDark = {
    "color": "#000000",
    "weight": 3,
    "opacity": 0.5,
    "fillColor": '#0000FF',
    "fillOpacity": 0
};   

var geojsonIncomplete = {
    'color': '#ffb711',
    'weight': 4,
    'opacity': 1,
    "fillColor": '#ff9e28',
    "fillOpacity": 0.3
};

var geojsonComplete = {
    'color': '#00d62e',
    'weight': 4,
    'opacity': 1,
    "fillColor": '#5af47b',
    "fillOpacity": 0.3
};


//-----------------
// HIGHLIGHT STYLES
//-----------------

var postalHighlight = {
    'color': '#ffd711',
    'weight': 4,
    'opacity': 1,
    "fillColor": '#ff9e28',
    "fillOpacity": 0.1
};

var postalHighlightDark = {
    'color': '#082759',
    'weight': 4,
    'opacity': 1,
    "fillColor": '#083559',
    "fillOpacity": 0.2
};

var geojsonIncompHighlight = {
    'color': '#ffdf6d',
    'weight': 5,
    'opacity': 1,
    "fillColor": '#ffdd00',
    "fillOpacity": 0.6
};

var geojsonCompHighlight = {
    'color': '#6dff8c',
    'weight': 5,
    'opacity': 1,
    "fillColor": '#5af47b',
    "fillOpacity": 0.6
};


//-------------
// TEXT STRINGS
//-------------
var missingStuff = 
        '<font size="4" color="red" style="line-height: 30px;"><center><strong tkey="lang_incomplete">This entry is incomplete!</strong></center></font>';

    
var content = "<!doctype html>" +
        "<html lang='en'>" +
        "<head>" +
            "<meta charset='utf-8'>" +
            "<title>Your park survey records</title>" +
            "<meta name='description' content='Your park survey records'>" +
            "<meta name='author' content='Sampo Vesanen'>" +
            "<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>" +
            "<style>" +
                "h1, h2, h3, p, ul, li {font-family: 'Montserrat', sans-serif;}" +
            "</style>" +
        "</head>" +
        "<body>" +
        "<H1>Your results</H1>";

var glossary =
        "<br><br>" +
        "<p>" +
            "<h2>Glossary</h2>" +
            "<p><b>likert</b> How familiar are you with this postal code area?</p>" +
            "<ul>" +
                "<li><b>1</b> Extremely familiar</li>" + 
                "<li><b>2</b> Moderately familiar</li>" + 
                "<li><b>3</b> Somewhat familiar</li>" + 
                "<li><b>4</b> Slightly familiar</li>" + 
                "<li><b>5</b> Not at all familiar</li>" + 
            "</ul>" +
            "<p><b>parkspot</b> What kind of parking spot do you usually take in this postal code area?</p>" +
            "<ul>" +
                "<li><b>1</b> Parking space on the side of the street</li>" + 
                "<li><b>2</b> Parking lot</li>" + 
                "<li><b>3</b> Parking garage</li>" + 
                "<li><b>4</b> Other</li>" + 
            "</ul>" +
            "<p><b>parktime</b> is presented in minutes.</p>" +
        "</p>";


//------------
//HTML BUTTONS
//------------
var normalSubmit = 
        "<button id='buttonsubmitall' class='icon cloud-upload-alt' type='button'><strong tkey='lang_submit'>Submit records</strong></button>";

var disabledSubmit = 
        "<button disabled id='buttonsubmitall' class='icon cloud-upload-alt' type='button'><strong tkey='lang_submit'>Submit data</strong></button>";