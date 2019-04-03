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
}

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
// 020419 park_survey.js uses this. Not sure if this is useful anymore
function onParkspotChange(event){
    currentParkspotValue = event.target.value;
    //console.log("parkspot value set to " + event.target.value);
};


//This code launches jQuery info dialog when prompted. The language button and 
//a cookie script make use of this. Secondary purpose is to prevent code 
//repetition.
function initialiseInfo(){
    //make popups close if info is opened. "apu" manipulates geojson.on("click")
    mymap.closePopup();
    apu = 0;
    
    $("#tabs").tabs({
        //show and hide applies fadein and fadeout effects for tab panels in
        //infobox
        show: {
            effect: 'fade',
            duration: 150
        },         
        hide: {
            effect: 'fade',
            duration: 150
        }
    });
    $("#tabsikkuna").dialog({
        height: 630,
        width: 560,
        resizable: false,
        position: {my: "center", at: "center", of: window},
        
        //this hides info dialog main scroll bars.
        //only div scroll bars remain
        open: function (event, ui) {
            $('#tabsikkuna').css('overflow', 'hidden');
        },
        //add fadeout animation when closing. Fadein is done with CSS!
        hide: {
            effect: 'fade',
            duration: 300
        }
    });
    // retain dialog position relative to window resize
    $(window).resize(function() {
        $("#tabsikkuna").dialog("option", "position", 
        {my: "center", at: "center", of: window});
    });
    
    // are we on mobile?
    mobileCheck();
    
    // listen to "close this info window" button 
    var buttonCloseinfo = L.DomUtil.get('button-closeinfo');
    L.DomEvent.addListener(buttonCloseinfo, "click", function (e){
            create_cookie("info_closed_once", "yes", 90, "/");
            $("#tabsikkuna").dialog("close");
            infoButton.state('infoOpen');
    });
}


function mobileCheck() {
    //are we using mobile? If yes, resize.
    //This function is far from useful. It makes mobilephone experience at least
    //somewhat possible.
    if($(window).width() < 800) {
        
        $("#tabsikkuna").dialog({
            height: $(window).height(),
            width: $(window).width()
        });
        
        $(window).resize(function() {
            $('.ui-dialog').css({
                 'width': $(window).width(),
                 'height': $(window).height(),
                 'left': '0px',
                 'top':'0px'
            });
        }).resize(); //<---- resizes on page ready
    
        //tabs
        $(".ui-tabs-nav").parent().css('width', $(window).width());
        
        //text area
        $('.tabspanel').css('height', '100%');
        $('.tabspanel').css('width', '100%');
        $('.tabspanel').css('overflow', 'auto');
    } else {
        //nothin
    }
}


function popupMobileCheck() {
    //are we using mobile? If yes, resize popup when it is opened.
    //NB! This function is far from useful. It makes mobilephone experience at 
    //least somewhat possible.
    if($(window).width() < 800) {
        //frame
        $(window).resize(function() {
                $('.leaflet-popup-content-wrapper').css({
                        'width': $(window).width(),
                        'height': $(window).height(),
                        'left': '0px',
                        'top':'0px'
                });
        }).resize();
        //content
        $(window).resize(function() {
                $('.leaflet-popup-content').css({
                        'width': $(window).width(),
                        'height': $(window).height(),
                        'left': '0px',
                        'top':'0px'
                });
        }).resize();
        $("#buttonsubmitall").css({"visibility": "hidden"});
        $(".leaflet-top").css({"visibility": "hidden"});
    } else {
        //nothin
    }
}


// Mobile phone popup hides map elements. This restores them.
function showUI() {
    $(".leaflet-top").css({"visibility": "visible"});
    $("#buttonsubmitall").css({"visibility": "visible"});
}



//format a tidy string format date for mysql insertion. Formats all parts with
//leading zeroes.
function formatTime() {
    var today = new Date();
    var time = 
            ("0" + today.getHours()).slice(-2) + ":" + 
            ("0" + today.getMinutes()).slice(-2) + ":" + 
            ("0" + today.getSeconds()).slice(-2);
    var date = 
            ("0" + today.getDate()).slice(-2) + "-" + 
            ("0" + (today.getMonth() + 1)).slice(-2) + '-' +  
            today.getFullYear();
    return date + " " + time;
}


// "Generate unique ID" code by Gordon Brander
// https://gist.github.com/gordonbrander/2230317 pseudo-id

// Generate unique IDs for use as pseudo-private/protected names.
// Similar in concept to
// <http://wiki.ecmascript.org/doku.php?id=strawman:names>.
//
// The goals of this function are twofold:
// * Provide a way to generate a string guaranteed to be unique when compared
//   to other strings generated by this function.
// * Make the string complex enough that it is highly unlikely to be
//   accidentally duplicated by hand (this is key if you're using `ID`
//   as a private/protected name on an object).
//
// Use:
//     var privateName = ID();
//     var o = { 'public': 'foo' };
//     o[privateName] = 'bar';
var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return Math.random().toString(36).substr(2, 9);
};


// layerClickHandler() uses this to match zipcodes in layer "geojson" with 
// layer "postal" zipcodes. Important for showing names of postal code areas
// in each popup window.
function getAreaName(zipcode) {
    for (var i in postal._layers){
        currentItem = postal._layers[i];
        if(zipcode === currentItem.feature.properties.posti_alue) {
            // found postal area name corresponding to function parameter
            return currentItem.feature.properties.nimi;
        } else {
            //nothin
        }
    }
    //did not find anything corresponding inserted parameter
    return null;
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
            $("div.sucimage").css("content", "url('images/thankyou.png')");
        } else {
            $("div.sucimage").css("content", "url('images/thankyou_fi.png')");
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

//for looping to send records to server record by record.
function preparePost() {
    
    //make sure response is empty going in
    $("#response").html("");
    
    //generate timestamp for this submit
    var submitTime = formatTime();

    //test if unique ID exists. If not, create
    if(typeof sessionId === 'undefined'){
        window.sessionId = ID();
    }
    
    //helpers
    var recordsSent = 0;
    var errorRecords = 0;
    
    //fetch data from geojson
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        
        timestampValue = submitTime;
        sessionValue = window.sessionId;
        zipcodeValue = thisLayer.feature.properties.zipcode;
        likertValue = thisLayer.feature.properties.likert;
        parkspotValue = thisLayer.feature.properties.parkspot;
        parktimeValue = thisLayer.feature.properties.parktime;
        
        var data = {
            timestamp: timestampValue,
            session: sessionValue,
            zipcode: zipcodeValue,
            likert: likertValue,
            parkspot: parkspotValue,
            parktime: parktimeValue
        };
        
        $.post('insert_mysql.php', data, function(responseFromServer) {
            // Insert response from server to '#response' div
            //if received error message, count it
            if(responseFromServer.status === "error") {
                errorRecords = errorRecords + 1;
                $("div.sucimage").css("content", "url('images/error.jpg')");
            }
            
            var responseHtml = '<div>Records sent: ' + (recordsSent + 1) + '<br>Fails: ' + errorRecords + '<br>Status: ' + responseFromServer.status + '</div>';
            console.log('-- Message from server --\nStatus: ' + responseFromServer.status + '\nMessage: ' + responseFromServer.message);
            
            // only add one message from server. Add += if all wanted
            var responseDiv = document.getElementById('response');
            responseDiv.innerHTML = responseHtml;
            
        }, 'json').done(function(responseFromServer){
            //run this small function any time jquery post is finished
            recordsSent = recordsSent + 1;
        });
    }
}


//test database connection
function testConn() {
    $.post('test_conn.php', function(responseFromServer) {
        console.log(responseFromServer);
    }, "json");
}


//test php code robustness, try to add illegal variables
function prepareErrorPost() {
    //give $.post() erroneous data
    timestampValue = "35-03-2019";
    likertValue = 1;
    parkspotValue = 4;
    parktimeValue = 0;

    var data = {
        timestamp: timestampValue,
        likert: likertValue,
        parkspot: parkspotValue,
        parktime: parktimeValue
    };
    
    $.post('insert_mysql.php', data, function(responseFromServer) {
          // Insert response from server to '#response' div
          var phpResponse = responseFromServer;

          console.log(phpResponse);
    }, 'json');
}