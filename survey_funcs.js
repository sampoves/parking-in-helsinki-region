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
    //PIENALUE GEOJSON NOT IN USE ANYMORE
    //console.log(e.layer._leaflet_id);
    //console.log(e);
    thisTarget = e.layer._leaflet_id;
    if (e.target.urls[0] === "pno_research_area.geojson"){
        //console.log("postinumerot!");
        //window.currentPno = e.layer.feature.properties.nimi + ", " + e.layer.feature.properties.posti_alue;
        if((mymap.hasLayer(OpenStreetMap_DE)) || (mymap.hasLayer(Stamen_Terrain))){
            mymap._layers[thisTarget].setStyle(postalHighlightDark);
        } else if (mymap.hasLayer(darkmatter)){
            mymap._layers[thisTarget].setStyle(postalHighlight);
        }    
    } else if (e.target.urls[0] === "seutukartta_pienalue.geojson"){
        //console.log("pienalueet!");
        //window.currentPien = e.layer.feature.properties.nimi;
        mymap._layers[thisTarget].setStyle(pienalueHighlight);
    }
}


function layerToNormal(e) {
    //PIENALUE GEOJSON NOT IN USE ANYMORE
    thisTarget = e.layer._leaflet_id;
    if (e.target.urls[0] === "pno_research_area.geojson"){
        if((mymap.hasLayer(OpenStreetMap_DE)) || (mymap.hasLayer(Stamen_Terrain))){
            mymap._layers[thisTarget].setStyle(stylePostalDark);
        } else if (mymap.hasLayer(darkmatter)){
            mymap._layers[thisTarget].setStyle(stylePostal);
        }  
    } else if (e.target.urls[0] === "seutukartta_pienalue.geojson"){
        mymap._layers[thisTarget].setStyle(stylePien);
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
    props = feature.target.feature.properties;
    attrs = Object.keys(props);
    howManyNulls = 0;
    for (var i = 0; i < attrs.length; i += 1){
        attr = attrs[i];
        value = props[attr];
        if (value === null || value === ""){
            howManyNulls += 1;
        } else {
            // do nothin
        }
    }
    //console.log(howManyNulls + " mik' tilanne");
    if (howManyNulls === 0){
        feature.target.setIcon(completeIcon);
    } else {
        feature.target.setIcon(incompleteIcon);
    }
};


// CURRENTLY UNUSED
//test if an element is disabled or enabled.
function testElementActive(elemName, varName){
    if(varName === true){
        return elemName.update();
    } else if (varName === false){
        return elemName.disable();
    }
}


// Translator function
// idea from here: https://github.com/dakk/jquery-multilang
var translate = function(jsdata){	
        $("[tkey]").each(function (index){
            var strTr = jsdata[$(this).attr('tkey')];
            $(this).html(strTr);
        });
};


// this function can be used with events and such where language does not update
// automatically. This is true, for example, when updating submit button or
// opening a popup
function languageCheckUp(){
    if(window.currentLang === "fi"){
        $.getJSON('fi.json', translate);
    } else {
        $.getJSON('en.json', translate);
    }
}


// this tests if an object is empty. Used in function isGeojsonEmpty() to test 
// if geojson layer "geojson" is empty to ensure user can't send blanks to the 
// server. Idea from here:
// https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


// Is geojson layer empty? If yes, disable submit button. Otherwise, enable
function isGeojsonEmpty(){
    if(isEmpty(geojson._layers) === true){
        console.log("Layer 'geojson' is empty. Attempt to disable submit button:");
        if(submitButtonState() !== "disabled"){
            console.log("Le Success");
            //sendBox.disable();
            document.getElementById("buttonsubmitall").disabled = true;
        } else {
            console.log("Submit button already disabled.");
        }
    } else {
        console.log("Layer 'geojson' is not empty. Attempt to enable submit button:");
        if(submitButtonState() !== "enabled"){
            console.log("Le Success");
            //sendBox.update();
            document.getElementById("buttonsubmitall").disabled = false;
        } else {
            console.log("Submit button already enabled.");
        }
    }
}

//Are all popups finished? This function loops through all markers in geojson
//to detect null fields. If any field is null, this function will keep submit
//button inactive.
//Also implemented location of unfinished markers
function areMarkersFinished(){
    howManyNulls = 0;
    unfinishedMarkers = [];//for fit all unfinished markers thing
    
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        theseProps = thisLayer.feature.properties;
        theseAttrs = Object.keys(theseProps);
        thisIterationNulls = 0; //for fit all unfinished markers thing

        for (var i = 0; i < attrs.length; i += 1){
            //implement test whether layer is interactive or not
            //check submit button which changed interactivity to false
            attr = theseAttrs[i];
            value = theseProps[attr];
            if (value === null || value === ""){
                howManyNulls += 1;
                thisIterationNulls += 1;
            } else {
                // do nothin
            }
        }
        if(howManyNulls !== 0){
            unfinishedMarkers.push(thisLayer);
        } else {
            //do nothin
        }
    };
    
    //Gather unfinished markers to this featureGroup for the use of fitBounds()
    var group = new L.featureGroup(unfinishedMarkers);
    
    //if above for loop finished without any nulls, all popups are finished
    //and submit button can be enabled.
    if ((howManyNulls === 0) && (isEmpty(geojson._layers) === false)){
        if(submitButtonState() !== "enabled"){
            console.log("All markers complete, enable submit button");
            //sendBox.update();
            document.getElementById("buttonsubmitall").disabled = false;
        } else {
            console.log("All markers complete. Submit button already enabled.");
        }
    } else {
        //implemented detection of unfinished markers. This needs initialisation
        //of array unfinishedMarkers and var thisIterationNulls and a if statement
        //to check if current layer was unfinished. Then add unfinished markers
        //to featureGroup group, and fit them on map here.
        try{mymap.fitBounds(group.getBounds(), {maxZoom: 14});
        }
        catch(error){
            console.log("featureGroup 'group' is empty, don't pan view.");
        }
        
        //disable() has to be here for the case user wipes a field and marker
        //regresses to unfinished.
        if(submitButtonState() !== "disabled"){
            console.log("Not all markers are complete, did not enable submit button.");
            //sendBox.disable();
            document.getElementById("buttonsubmitall").disabled = true;
        } else {
            console.log("Not all markers are complete. Submit button already disabled.");
        }
    }
}

// Test submit button current state
function submitButtonState(){
    if(document.getElementById("buttonsubmitall").disabled === true){
        return "disabled";
    } else {
        return "enabled";
    }
}