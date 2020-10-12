/* 
 * These are some of the variables used by Leaflet popup survey for University 
 * of Helsinki master's thesis "Parking of private cars and accessibility in 
 * Helsinki Capital Region".
 * Written by Sampo Vesanen in 2019.
 */

//BOUNDS VARIABLES FOR MYMAP
// the bounds reach quite up north of the research area to accommodate popup
// visibility when user has zoomed out map view
var corner1 = [60.7, 24.37];
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
var mobilewarning_smallscreen = "<i class='icon info-circle'></i>Hi! It \n\
        seems you are visiting the survey with a mobile phone or a device \n\
        with a relatively small screen (screen width less than 800 pixels). \n\
        If you encounter any problems with using the survey, please see the \n\
        tab marked with the wrench icon. It contains useful settings \n\
        for mobile phone users such as possibility to adjust\n\
        survey popup window size. Thank you for your answers to the survey!";

var mobilewarning_general = "<i class='icon info-circle'></i>Hi! It seems \n\
        you are visiting the survey with a mobile phone. If you encounter \n\
        any problems with using the survey, please see the tab marked with \n\
        the wrench icon. It contains useful settings for mobile phone users \n\
        such as possibility to adjust survey popup window size. Thank you \n\
        for your answers to the survey!";

var mobilewarning_smallscreen_fi = "<i class='icon info-circle'></i>Hei! \n\
        Käytät ilmeisesti älypuhelinta tai muuta laitetta, jossa on \n\
        suhteellisen alhainen ruututarkkuus (ruudun leveys \n\
        vähemmän kuin 800 pikseliä). Jos kohtaat ongelmia kyselyä\n\
        täyttäessäsi, tarkistathan jakoavain-ikonilla varustetun\n\
        välilehden. Löydät sieltä hyödyllisiä asetuksia \n\
        parhaimman mobiilikokemuksen saavuttamiseksi. Kiitos \n\
        vastauksistasi!";

var mobilewarning_general_fi = "<i class='icon info-circle'></i>Hei! Käytät \n\
        ilmeisesti älypuhelinta. Jos kohtaat ongelmia kyselyä täyttäessäsi, \n\
        tarkistathan jakoavain-ikonilla varustetun välilehden. Löydät sieltä \n\
        hyödyllisiä asetuksia parhaimman mobiilikokemuksen saavuttamiseksi. \n\
        Kiitos vastauksistasi!";


var missingStuff = 
        '<font size="4" color="red" style="line-height: 30px;"><center><strong id="incomplete" tkey="lang_incomplete">This entry is incomplete!</strong></center></font>';

var key_en =
        "<br><br>" +
        "<p>" +
            "<h2>Key</h2>" +
            "<p><b>parktime</b> How long does it usually take for you to find a parking spot and park your car in this postal code area (in minutes)?<br>" + 
            "<b>walktime</b> How long does it usually take for you to walk from your parking spot to your destination in this postal code area (in minutes)?</p>" +
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
                "<li><b>4</b> Private or reserved spot</li>" + 
                "<li><b>5</b> Other</li>" + 
            "</ul>" +
            "<p><b>timeofday</b> At what time of the day do you usually park in this postal code area?</p>" +
            "<ul>" +
                "<li><b>1</b> Weekday, rush hour (07:00-09:00 and 15:00-17:00)</li>" + 
                "<li><b>2</b> Weekday, other than rush hour</li>" + 
                "<li><b>3</b> Weekend</li>" + 
                "<li><b>4</b> None of the above, no usual time</li>" + 
            "</ul>" +
        "</p>";

var key_fi =
        "<br><br>" +
        "<p>" +
            "<h2>Selite</h2>" +
            "<p><b>parktime</b> Kuinka kauan sinulla yleensä kestää löytää pysäköintipaikka ja pysäköidä tällä postinumeroalueella (minuuteissa)?<br>" + 
            "<b>walktime</b> Kuinka kauan sinulla yleensä kestää kävellä pysäköintipaikalta määränpäähäsi tällä postinumeroalueella (minuuteissa)?</p>" +
            "<p><b>likert</b> Kuinka tuttu tämä postinumeroalue on sinulle?</p>" +
            "<ul>" +
                "<li><b>1</b> Hyvin tuttu</li>" + 
                "<li><b>2</b> Kohtalaisen tuttu</li>" + 
                "<li><b>3</b> Jossain määrin tuttu</li>" + 
                "<li><b>4</b> Vähän tuttu</li>" + 
                "<li><b>5</b> Ei ollenkaan tuttu</li>" + 
            "</ul>" +
            "<p><b>parkspot</b> Minkätyyppiselle pysäköintipaikalle yleensä pysäköit tällä postinumeroalueella?</p>" +
            "<ul>" +
                "<li><b>1</b> Kadunvarsipaikka</li>" + 
                "<li><b>2</b> Pysäköintialue</li>" + 
                "<li><b>3</b> Pysäköintihalli</li>" + 
                "<li><b>4</b> Yksityinen tai varattu autopaikka</li>" + 
                "<li><b>5</b> Muu</li>" + 
            "</ul>" +
            "<p><b>timeofday</b> Mihin viikon- ja vuorokaudenaikaan yleensä pysäköit tälle postinumeroaluelle?</p>" +
            "<ul>" +
                "<li><b>1</b> Arkipäivä, ruuhka-aikaan (07:00-09:00 ja 15:00-17:00)</li>" + 
                "<li><b>2</b> Arkipäivä, muuna kuin ruuhka-aikana</li>" + 
                "<li><b>3</b> Viikonloppu" + 
                "<li><b>4</b> Ei mikään ylläolevista, ei yleisintä aikaa</li>" + 
            "</ul>" +
        "</p>";

var familiar_fi = {
    "likert 1": "hyvin tuttu",
    "likert 2": "kohtalaisen tuttu",
    "likert 3": "jossain määrin tuttu",
    "likert 4": "vähän tuttu",
    "likert 5": "ei ollenkaan tuttu"
};

var familiar_en = {
    "likert 1": "extremely familiar",
    "likert 2": "moderately familiar",
    "likert 3": "somewhat familiar",
    "likert 4": "slightly familiar",
    "likert 5": "not at all familiar"
};

var parking_fi = {
    "parkspot 1": "kadunvarsipaikka",
    "parkspot 2": "pysäköintialue",
    "parkspot 3": "pysäköintihalli",
    "parkspot 4": "yksityinen tai varattu autopaikka",
    "parkspot 5": "muu"
};

var parking_en = {
    "parkspot 1": "parking space on the side of the street",
    "parkspot 2": "parking lot",
    "parkspot 3": "parking garage",
    "parkspot 4": "private or reserved parking spot",
    "parkspot 5": "other"
};

var timeofday_fi = {
    "timeofday 1": "arkipäivä, ruuhka-aikaan (07:00-09:00 ja 15:00-17:00)",
    "timeofday 2": "arkipäivä, muuna kuin ruuhka-aikana",
    "timeofday 3": "viikonloppu",
    "timeofday 4": "ei mikään ylläolevista, ei yleisintä aikaa"
};

var timeofday_en = {
    "timeofday 1": "weekday, rush hour (07:00-09:00 and 15:00-17:00)",
    "timeofday 2": "weekday, other than rush hour",
    "timeofday 3": "weekend",
    "timeofday 4": "none of the above, no usual time"
};


//------------
//HTML BUTTONS
//------------
var normalSubmit = 
        "<button id='buttonsubmitall' class='icon cloud-upload-alt' type='button'><strong tkey='lang_submit'>Submit records</strong></button>";

var disabledSubmit = 
        "<button disabled id='buttonsubmitall' class='icon cloud-upload-alt' type='button'><strong tkey='lang_submit'>Submit data</strong></button>";
