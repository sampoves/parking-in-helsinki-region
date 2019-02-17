/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function create_cookie(name, value, days2expire, path) {
    var date = new Date();
    date.setTime(date.getTime() + (days2expire * 24 * 60 * 60 * 1000));
    var expires = date.toUTCString();
    document.cookie = name + '=' + value + ';' +
                     'expires=' + expires + ';' +
                     'path=' + path + ';';
  };

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}


//utilise leaflet-pip (point in Polygon) to find indtersections between
//clicked latlngs and overlay geojson layers
function findIntersection (latlng, geojsonlayer){
    var hits = leafletPip.pointInLayer(latlng, geojsonlayer);
    if (hits.length !== 0){
        // If intersection is found, it should only find one feature.
        // This case returns the name of that feature
        return hits;
    } else {
        // In case of no intersections return a empty string
        return "";
    }
}


function highlightLayer(e) {
    //console.log(e.layer._leaflet_id);
    //console.log(e);
    thisTarget = e.layer._leaflet_id;
    if (e.target.urls[0] === "pno_research_area.geojson"){
        //console.log("postinumerot!");
        //window.currentPno = e.layer.feature.properties.nimi + ", " + e.layer.feature.properties.posti_alue;
        mymap._layers[thisTarget].setStyle(postalHighlight);
    } else if (e.target.urls[0] === "seutukartta_pienalue.geojson"){
        //console.log("pienalueet!");
        //window.currentPien = e.layer.feature.properties.nimi;
        mymap._layers[thisTarget].setStyle(pienalueHighlight);
    }
}


function layerToNormal(e) {
    thisTarget = e.layer._leaflet_id;
    if (e.target.urls[0] === "pno_research_area.geojson"){
        mymap._layers[thisTarget].setStyle(stylePostal);
    } else if (e.target.urls[0] === "seutukartta_pienalue.geojson"){
        mymap._layers[thisTarget].setStyle(stylePien);;
    }
}


// This helps set value for parkspot in the popup survey
function onParkspotChange(event){
    currentParkspotValue = event.target.value;
    //console.log("parkspot value set to " + event.target.value);
};



//THIS LISTENS TO MARKER VALUES AND CHANGES MARKER COLOR ON
//POPUP FILL
function markerColorListener (feature, layer) {
    //console.log("feature lalalal");
    props = feature.target.feature.properties;
    attrs = Object.keys(props);
    //console.log(attrs);
    howManyNulls = 0;
    for (var i = 0; i < attrs.length; i += 1){
        attr = attrs[i];
        value = props[attr];
        //console.log(value);
        if (value === null || value === ""){
            howManyNulls += 1;
        } else {
            // do nothjin
        }
    }
    //console.log(howManyNulls + " mik' tilanne");
    if (howManyNulls === 0){
        feature.target.setIcon(completeIcon);
    } else {
        feature.target.setIcon(incompleteIcon);
    }
};