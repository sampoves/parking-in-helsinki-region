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