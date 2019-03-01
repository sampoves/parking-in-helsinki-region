/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//BOUNDS VARIABLES FOR MYMAP
var corner1 = [60.6, 24.37];
var corner2 = [60.05, 25.305884];
var bounds = L.latLngBounds(corner1, corner2);


//INITIALISE BACKGROUND TILE LAYERS
//CartoDB dark_matter
var darkmatter = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
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
});//.addTo(mymap); //this used to be default here

//OpenStreetMap
var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

//Stamen tedrrain
var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 2,
        maxZoom: 18,
        ext: 'png'
});



//MARKER VARIABLES
//incomplete icon
var incompleteIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowAnchor: [8, 20],
    shadowSize: [25, 18],
    iconAnchor: [12, 40],
    popupAnchor: [0, -41]
});

//complete icon
var completeIcon = L.icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowAnchor: [8, 20],
    shadowSize: [25, 18],
    iconAnchor: [12, 40],
    popupAnchor: [0, -41]
});

//submitted icon
var submittedIcon = L.icon({
    iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
    iconSize: [25, 41],
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowAnchor: [8, 20],
    shadowSize: [25, 18],
    iconAnchor: [12, 40],
    popupAnchor: [0, -41]
});



// BACKGROUND GEOJSON LAYERS
//import postal codes areas GeoJSON from file
var stylePostal = {
    "color": "#ff7800",
    "weight": 3,
    "opacity": 0.4,
    "fillOpacity": 0
};

var stylePostalDark = {
    "color": "#082759",
    "weight": 3,
    "opacity": 0.4,
    "fillOpacity": 0
};

var styleArea = {
    "color": "#ff7800",
    "weight": 3,
    "opacity": 0.5,
    "fillColor": '#0000FF',
    "fillOpacity": 0
};   


// HIGHLIGHT STYLES
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


// Text strings
var missingStuff = 
        '<font size="4" color="red" style="line-height: 30px;"><center><strong tkey="lang_incomplete">This entry is incomplete!</strong></center></font>';


//HTML buttons
var normalSubmit = 
        "<button id='buttonsubmitall' type='button'><strong tkey='lang_submit'>Submit records</strong></button>";
        //"<button id='buttonsubmitall' type='button'><strong>Submit data</strong></button>";
var disabledSubmit = 
        "<button disabled id='buttonsubmitall' type='button'><strong tkey='lang_submit'>Submit data</strong></button>";
        //"<button disabled id='buttonsubmitall' type='button'><strong>Submit data</strong></button>";