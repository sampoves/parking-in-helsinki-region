/* 
 * These are functions used by Leaflet popup survey for University of Helsinki 
 * master's thesis "Parking of private cars and accessibility in Helsinki 
 * Capital Region".
 * Written by Sampo Vesanen, 2019.
 */


//----------------
//COOKIE FUNCTIONS
//----------------
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


//--------------------------------------------
//POLYGON HIGHLIGHTING AND COLOURING FUNCTIONS
//--------------------------------------------
function highlightLayer(e) {
    thisTarget = e.layer._leaflet_id;
    //console.log("postinumerot!");
    //window.currentPno = e.layer.feature.properties.nimi + ", " + e.layer.feature.properties.posti_alue;
    if((mymap.hasLayer(OpenStreetMap_DE)) || (mymap.hasLayer(Stamen_Terrain))){
        mymap._layers[thisTarget].setStyle(postalHighlightDark);
    } else if (mymap.hasLayer(darkmatter)){
        mymap._layers[thisTarget].setStyle(postalHighlight);
    }    
}

function layerToNormal(e) {
    thisTarget = e.layer._leaflet_id;
    if((mymap.hasLayer(OpenStreetMap_DE)) || (mymap.hasLayer(Stamen_Terrain))){
        mymap._layers[thisTarget].setStyle(stylePostalDark);
    } else if (mymap.hasLayer(darkmatter)){
        mymap._layers[thisTarget].setStyle(stylePostal);
    }  
}

function highlightGeojson(e) {
    thisTarget = e.layer._leaflet_id;
    if(mymap.hasLayer(geojson)) {
        if(incompleteTest(e) === true) {
            mymap._layers[thisTarget].setStyle(geojsonIncompHighlight);
        } else {
            mymap._layers[thisTarget].setStyle(geojsonCompHighlight);
        }
    }
}

function geojsonToNormal(e) {
    thisTarget = e.layer._leaflet_id;
    if(mymap.hasLayer(geojson)) {
        if(incompleteTest(e) === true) {
            mymap._layers[thisTarget].setStyle(geojsonIncomplete);
        } else {
            mymap._layers[thisTarget].setStyle(geojsonComplete);
        }
    }
}

//run for loop which tests incompleteness of geojson layers.
function updateGeomColors() {
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        if(incompleteTest(thisLayer.feature) === true){
            thisLayer.setStyle(geojsonIncomplete);
        } else {
            thisLayer.setStyle(geojsonComplete);
        }
    }
}


//-----------------------
//MISCELLANEOUS FUNCTIONS
//-----------------------

//Is the feature and its records in question incomplete?
function incompleteTest(input) {
    //Accept two type of inputs: try{} is event of a layer, and catch(err){} is
    //feature parameter of geojson onEachFeature definition
    try {
        feature = input.layer.feature;
        if(!feature.properties.likert || !feature.properties.parkspot || 
                !feature.properties.parktime){
            //is incomplete
            return true;
        } else {
            //is complete
            return false;
        }
    } catch(err){
        if(!input.properties.likert || !input.properties.parkspot || 
                !input.properties.parktime){
            //is incomplete
            return true;
        } else {
            //is complete
            return false;
        }
    }
}

// This helps set value for parkspot in the popup survey
function onParkspotChange(event){
    currentParkspotValue = event.target.value;
    //console.log("parkspot value set to " + event.target.value);
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


//This code launches jQuery info dialog when prompted. The language button and 
//a cookie script make use of this. Secondary purpose is to prevent code 
//repetition.
function initialiseInfo(){
    //make popups close if info is opened. "apu" manipulates geojson.on("click")
    mymap.closePopup();
    apu = 0;
    
    $("#tabs").tabs();
    $("#tabsikkuna").dialog({
        height: 630,
        width: 560,
        resizable: false,
        position: {my: "center", at: "center", of: window},
        //this hides info dialog main scroll bars.
        //only div scroll bars remain
        open: function (event, ui) {
            $('#tabsikkuna').css('overflow', 'hidden');
        }
    });
    // retain dialog position on window resize
    $(window).resize(function() {
        $("#tabsikkuna").dialog("option", "position", 
        {my: "center", at: "center", of: window});
    });
}


//------------------------
//LAYER STYLING AND EVENTS
//------------------------

//When defining geojson layers, the styling seems to be buggy. One feature per
//geojson layer seems to revert to default blue style. This function attempts
//to bypass that.
//Insert geojson layer of your choosing, then style to use if basemap is of 
//light hue, and another style to use if basemap is of dark hue
function stylingFunction(layerToStyle, styleDark, styleLight) {
    console.log("stylinfunction run");
    if(mymap.hasLayer(darkmatter)){
        console.log("darkmatter succeee");
        layerToStyle.setStyle(styleDark);
    } else if (mymap.hasLayer(OpenStreetMap_DE)){
        layerToStyle.setStyle(styleLight);
    } else if (mymap.hasLayer(Stamen_Terrain)){
        layerToStyle.setStyle(styleLight);
    };
}

//this function checks which label layers are active at that moment. It will
//deactivate any that it finds.
function changeOfLabels(){
    labelsList = ["darkmatterOnlyLabels", "StamenTerrainOnlyLabels", 
        "voyagerOnlyLabels"];
    
    for (i = 0; i < labelsList.length; i++){
        currentItem = labelsList[i];
        if(mymap.hasLayer(eval(currentItem))){
            mymap.removeLayer(eval(currentItem));
            console.log("removed " + currentItem);
        } else {
            //nothing
        }
    } 
}


//------------------
//LANGUAGE FUNCTIONS
//------------------

// Translator function
// idea from here: https://github.com/dakk/jquery-multilang
var translate = function(jsdata){	
        $("[tkey]").each(function (index){
            var strTr = jsdata[$(this).attr('tkey')];
            $(this).html(strTr);
        });
        //handle changing of thankyou.png
        if(currentLang === "en"){
            $("div.sucimage").css("content", "url('thankyou.png')");
        } else {
            $("div.sucimage").css("content", "url('thankyou_fi.png')");
        }
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


//-------
//CLASSES
//-------

// this class helps keep track unique clicked postal areas in the survey. Unique
// zip code tracking is needed to prevent creation of multiple geojson layers
// for a zip code which already has a record (ie., a layer)
class TrackZipCodes {
    constructor() {
        this.zipCodeList = [];
    }
    addUniqueZipCode(zipCode) {
        // Append zip code to list if is not in list
        if(this.zipCodeList.includes(zipCode)){
            return false;
        } else {
            this.zipCodeList.push(zipCode);
            return true;
        }
    }
    
    // Remove zip code from list if detected from list
    removeZipCode(zipCode) {
        if(this.zipCodeList.includes(zipCode)){
            this.zipCodeList.splice(this.zipCodeList.indexOf(zipCode), 1 );
            console.log("Removed " + zipCode);
        } else {
            console.log("Did not find zip code " + zipCode);
        }
    }
    
    listZipCodes() {
        return this.zipCodeList;
    }
    
    // Used with submit all records button. Clears the table for a potential
    // additional filling of the survey
    clearZipCodes() {
        this.zipCodeList = [];
    }
    
    listContains(zipCode) {
        if(this.zipCodeList.includes(zipCode)) {
            return true;
        } else {
            return false;
        }
    }
}


//-----------------------
//SUBMIT BUTTON FUNCTIONS
//-----------------------
//
//Are all popups finished? This function loops through all polygons in geojson
//to detect null fields. If any field is null, this function will keep submit
//button inactive.
//This function used to have a feature which located unfinished polygons. Was
//removed as extraneous. See old versions of this file to see the code.
function arePopupsFinished(){
    howManyNulls = 0;
    
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        theseProps = thisLayer.feature.properties;
        theseAttrs = Object.keys(theseProps);

        for (var i = 0; i < theseAttrs.length; i += 1){
            //implement test whether layer is interactive or not
            //check submit button which changed interactivity to false
            attr = theseAttrs[i];
            value = theseProps[attr];
            if (value === null || value === ""){
                howManyNulls += 1;
            } else {
                // do nothin
            }
        }
    };
    
    //if above for loop finished without any nulls, all popups are finished
    //and submit button can be enabled.
    if ((howManyNulls === 0) && (isEmpty(geojson._layers) === false)){
        if(submitButtonState() !== "enabled"){
            console.log("All popups complete, enable submit button");
            //sendBox.update();
            document.getElementById("buttonsubmitall").disabled = false;
        } else {
            console.log("All popups complete. Submit button already enabled.");
        }
    } else {        
        //disable() has to be here for the case user wipes a field and polygon
        //regresses to unfinished.
        if(submitButtonState() !== "disabled"){
            console.log("Not all popups are complete, did not enable submit button.");
            document.getElementById("buttonsubmitall").disabled = true;
        } else {
            console.log("Not all popups are complete. Submit button already disabled.");
        }
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

// "Submit records" button functionality uses jQuery UI
// Copying objects in JS is not straightforward and for that reason
// AT THIS POINT send button will destroy all entries entered so far.
function submitButtonListener(){
    var sendButtonSubmit = L.DomUtil.get('buttonsubmitall');
    L.DomEvent.addListener(sendButtonSubmit, "click", function (e){
        
        //The important part: send data to server
        preparePost();
        
        $(function() {
            $("#sucdialog").dialog({
                position: {my: "center", at: "center", of: window},
                buttons: {
                    "Close": function () {
                        $(this).dialog("close");
                    }
                }
            });
            //retain dialog position on window resize
            $(window).resize(function() {
                $("#sucdialog").dialog("option", "position", {
                    my: "center", at: "center", of: window});
            });
        });
        usersZipCodes.clearZipCodes();
        geojson.clearLayers();

        //in this context func makes sure button is disabled, to 
        //prevent empty submissions
        isGeojsonEmpty();
    });
};

// Test submit button current state
function submitButtonState(){
    if(document.getElementById("buttonsubmitall").disabled === true){
        return "disabled";
    } else {
        return "enabled";
    }
}


//------------------
//DATABASE FUNCTIONS
//------------------

function preparePost() {
    //fetch data from geojson
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        
        likertValue = thisLayer.feature.properties.likert;
        parkspotValue = thisLayer.feature.properties.parkspot;
        parktimeValue = thisLayer.feature.properties.parktime;
        
        var data = {
            likert: likertValue,
            parkspot: parkspotValue,
            parktime: parktimeValue
        };
        
        $.post('testnew.php', data, function(responseFromServer) {
              // Insert response from server to '#response' div
              var responseHtml = '<div>Full JSON object: ' + JSON.stringify(responseFromServer) + '</div>';
              responseHtml += '<div>Status: ' + responseFromServer.status + ', message: ' + responseFromServer.message + '</div>';
              
              $('#response').html(responseHtml);
              console.log(responseHtml);
            
            }, 'json');
    }
}

function prepareErrorPost() {
    //fetch data from geojson
    likertValue = "thisLayer.feature.properties.likert";
    parkspotValue = 43.4534;
    parktimeValue = "thisLayer.feature.properties.parktime";

    var data = {
        likert: 5,
        parkspot: parkspotValue,
        parktime: parktimeValue
    };

    $.post('testnew.php', data, function(responseFromServer) {
          // Insert response from server to '#response' div
          var responseHtml = '<div>Full JSON object: ' + JSON.stringify(responseFromServer) + '</div>';
          responseHtml += '<div>Status: ' + responseFromServer.status + ', message: ' + responseFromServer.message + '</div>';

          $('#response').html(responseHtml);
          console.log(responseHtml);

        }, 'json');

}



function preparePostTemplate(){

    // Fetch data from UI
    //var emailValue = $('#email').val();
    var emailValue = "pelle.hermanni@pelle.com";

    // Create object to be sent
    var data = {email: emailValue};
    
    // Send data to server (PHP)
    $.post('test.php', data, function(responseFromServer) {

        // Insert response from server to '#response' div
        var responseHtml = '<div>Full JSON object: ' + JSON.stringify(responseFromServer) + '</div>';
        responseHtml += '<div>Status: ' + responseFromServer.status + ', message: ' + responseFromServer.message + '</div>';

        //server response sent to #sucdialog, see index.html jquery content
        $('#response').html(responseHtml);
        
        console.log(responseHtml);
        
    }, 'json');
}