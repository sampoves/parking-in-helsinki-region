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



//---------------------------
//POPUP RELATED FUNCTIONALITY
//---------------------------

//attempt to resize popup. First, check if on mobile. If so, make popup narrow.
//In other cases, give possibility to insert popup maxwidth parameter.
function popupSize(pol, popupContent, maximumWidth) {
    if((getCookie("device") === "mobile") || 
            ((getCookie("device") !== "mobile") && 
            ((getCookie("device") !== "desktop")) && ($(window).width() < 800))) {
        pol.bindPopup(popupContent, {
            maxWidth: 250,
            closeOnClick: false
        });
        //this works with document.eventListener. When popup is created, this
        //hides UI. Then eventlistener listens when to show UI again.
        hideUI();
        
    } else if (typeof maximumWidth === 'undefined') {
        pol.bindPopup(popupContent, {
            closeOnClick: false
        });
    }  else {
        pol.bindPopup(popupContent, {
            maxWidth: maximumWidth,
            closeOnClick: false
        });
    }
}


//this function changes font sizes of a popup. Must be run every time after
//a popup is opened to have an effect on anything
function popupCSS(smallText, textContent, buttons, largeText) {
    $(".form-group").css("font-size", smallText);
    $(".leaflet-popup-content").css("font-size", textContent);
    $("input#walktime, input#parktime").css("font-size", textContent);
    $("select").css("font-size", textContent); //dropdown
    $("option").css("font-size", textContent); //dropdown
    $("button#button-submit").css("font-size", buttons);
    $("button#button-delete").css("font-size", buttons);
    $("strong#incomplete").css("font-size", largeText);
}


function smallPopup(pol, popupContent, maximumWidth) {
    popupSize(pol, popupContent, 200);
    pol.openPopup();
    
    //frame adjustments
    $(".form-group").css("margin", "1px 0px 10px");
    $(".leaflet-popup-content").css("margin", "6px 12px");
    $("button#button-delete").css("margin", "5px 0px 0px");
    
    //likert scale adjustments
    $("ul#likert.likert").css("padding", "0px 0px 0px 20px");
    $("input#likert[type='radio']").css("width", "10px");
    $("input#likert[type='radio']").css("height", "10px");
    $("input#likert[type='radio']").css("margin-top", "1px");
    $("li").css("margin", "6px 0px 0px");
    
    //text adjustments
    popupCSS("6pt", "7pt", "8pt", "9pt");
}


function mediumPopup(pol, popupContent, maximumWidth) {
    popupSize(pol, popupContent, 250);
    pol.openPopup();
    
    //frame adjustments
    $(".form-group").css("margin", "3px 0px 15px");
    $(".leaflet-popup-content").css("margin", "10px 16px");
    $("button#button-delete").css("margin", "10px 0px 0px");
    
    //likert scale adjustments
    $("ul#likert.likert").css("padding", "0px 0px 0px 30px");
    $("input#likert[type='radio']").css("width", "15px");
    $("input#likert[type='radio']").css("height", "15px");
    $("input#likert[type='radio']").css("margin-top", "2px");
    
    //text adjustments
    popupCSS("7pt", "8pt", "9pt", "10pt");
}


//default size popup, "large"
function defaultPopup(pol, popupContent) {
    popupSize(pol, popupContent);
    pol.openPopup();
}


// Strip all layers of geojson of click events to prevent user clicking on 
// layer geojson which would produce a popup
function disableClicksOnLayer() {
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        
        // remove openPopup click handler (actually all click handlers)
        thisLayer.off("click");
        
        // Do nothing on click. This is not necessary, but now marker
        // doesn't act like part of underlying map
        thisLayer.on('click', function() {return;});
    }
}


// Enable normal behaviour of each layer in geojson
function enableClicksOnLayer() {
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        thisLayer.on('click', layerClickHandler); //resume normal behaviour
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
                !feature.properties.parktime || !feature.properties.walktime ||
                !feature.properties.timeofday){
            //is incomplete
            return true;
        } else {
            //is complete
            return false;
        }
    } catch(err){
        if(!input.properties.likert || !input.properties.parkspot || 
                !input.properties.parktime || !input.properties.walktime ||
                !input.properties.timeofday){
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


// This helps set value for timeofday in the popup survey
function onTimeOfDayChange(event){
    currentTimeOfDayValue = event.target.value;
    //console.log("parkspot value set to " + event.target.value);
};


//This code launches jQuery info dialog when prompted. The language button and 
//a cookie script make use of this. Secondary purpose is to prevent code 
//repetition.
function initialiseInfo(){
    
    // Close any popups when info dialog is opened.
    mymap.closePopup();
    
    // Normal click functionality of geojson layer would stop working if user
    // first opens a popup and then clicks info dialog open. This if statement
    // fixes the situation.
    if($(".leaflet-popup-content-wrapper").length !== 0) {
        enableClicksOnLayer();
    }
    
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
            // This function call exists only to ensure that we have the right 
            // survey screenshot
            languageCheckUp(); 
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
    
    // listen to "close this info dialog and access survey" button. This
    // primarily exists to help mobile phone users who at this point can't
    // see anything else than the info dialog
    var buttonAccessSurvey = L.DomUtil.get('button-accesssurvey');
    L.DomEvent.addListener(buttonAccessSurvey, "click", function (e) {
        $("#tabsikkuna").dialog("close");
        infoButton.state('infoOpen');
    });

    // listen to "close this info window for good" button 
    var buttonCloseinfo = L.DomUtil.get('button-closeinfo');
    L.DomEvent.addListener(buttonCloseinfo, "click", function (e) {
        create_cookie("info_closed_once", "yes", 90, "/");
        $("#tabsikkuna").dialog("close");
        infoButton.state('infoOpen');
    });
    
    // listen to "close this info window" button
    document.getElementById("button-changepopupsize").onclick = function (e){
        
        if (getCookie("popupsize") === "default") {
            create_cookie("popupsize", "small", 90, "/");
            $("div.popupsize").attr("content", "small");
            console.log("Changed popup size to small");
            
        } else if (getCookie("popupsize") === "small") {
            create_cookie("popupsize", "medium", 90, "/");
            $("div.popupsize").attr("content", "medium");
            console.log("Changed popup size to medium");
            
        } else if (getCookie("popupsize") === "medium") {
            create_cookie("popupsize", "default", 90, "/");
            $("div.popupsize").attr("content", "large (default)");
            console.log("Changed popup size to large (default)");
        }
        //translate popup size value
        cssPopupsizeValue();
    };
    
    //listen to change device settings button. This only creates or changes
    //a cookie "device" and then reloads the whole page. mobileCheck() then
    //determines the course of action
    var buttonChangeDevice = L.DomUtil.get('button-changedevice');
    L.DomEvent.addListener(buttonChangeDevice, "click", function (e){

        if (getCookie("device") === "desktop") {
            create_cookie("device", "mobile", 90, "/");
        } else if (getCookie("device") === "mobile") {
            create_cookie("device", "desktop", 90, "/");
        } else {
            if(L.Browser.mobile === false) {
                create_cookie("device", "mobile", 90, "/");
            } else {
                create_cookie("device", "desktop", 90, "/");
            }
        }
        location.reload();
    });
}


function mobileCheck() {
    
    //this attempts to make sure infoscreen always starts up in mobile mode
    //if cookie "device" does not exist and screen width is less than 800px
    if((typeof getCookie("device") === "undefined") && ($(window).width() < 800)) {
        create_cookie("device", "mobile", 90, "/");
    }
    
    //are we using mobile? If yes, resize.
    //NB! This function is quite broken. It makes mobile phone experience 
    //technically possible, but still quite unwieldy.
    if(getCookie("device") === "mobile") {
        
        // If we are on mobile, this changes change device Font Awesome icon to
        // desktop variant
        $("#button-changedevice").toggleClass('mobile-alt desktop');
        
        //this makes scroll bars reappear
        $('#tabsikkuna').css('overflow-y', 'auto');
        
        $(window).resize(function() {
            $('.ui-dialog').css({
                 'width': $(window).width(),
                 'height': $(window).height(),
                 'left': '0px',
                 'top': '0px'
            });
        }).resize(); //<---- resizes on page ready
    
        //tabs
        $(".ui-tabs-nav").parent().css('width', $(window).width());
        
        //text area
        $('.tabspanel').css('height', '90%');
        $('.tabspanel').css('width', '80%');
    }
}


// Mobile phone popup hides map elements. This restores them. 
function showUI() {
    UIState = true;
    $("div.transbox, div.sendbox, div.leaflet-top").css({"display": "block"});
}


// Hides UI elements
function hideUI() {
    UIState = false;
    $("div.transbox, div.sendbox, div.leaflet-top").css({"display": "none"});
}


// Test the state of UI. The intention is to test the state of UI each time user
// clicks save changes, delete records or presses x on popup when on mobile
// mobile mode. First of all, set a timer for the whole function. This enables
// us to test after 200ms if popup elements are still open or not. We run this
// function as the last command in the three events detailed above. If using
// desktop version of the survey, testUIstate() does nothing.
function testUIstate() {
    setTimeout(function(){
        if((UIState === false) && 
                ($(".leaflet-popup-content-wrapper").length === 0) && 
                (getCookie("device") === "mobile")) {
            showUI();
            unfinishedBox.update();
        } else {
            // this else condition updates unfinishedBox when using desktop
            // version and user has deleted an area.
            unfinishedBox.update();
        }
    }, 200);
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


// layerClickHandler() uses this to match zipcodes in layer "geojson" with 
// layer "postal" zipcodes. Important for showing names of postal code areas
// in each popup window.
function getAreaName(zipcode) {
    for (var i in postal._layers){
        currentItem = postal._layers[i];
        if(zipcode === currentItem.feature.properties.posti_alue) {
            // found postal area name corresponding to function parameter
            return currentItem.feature.properties.nimi;
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
    console.log("stylingfunction run");
    if(mymap.hasLayer(darkmatter)){
        console.log("darkmatter succee");
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
    
    for (i = 0; i < labelsList.length; i++) {
        currentItem = labelsList[i];
        if(mymap.hasLayer(eval(currentItem))) {
            mymap.removeLayer(eval(currentItem));
            console.log("removed " + currentItem);
        }
    } 
}



//------------------
//LANGUAGE FUNCTIONS
//------------------

// Translator function
// idea from here: https://github.com/dakk/jquery-multilang
var translate = function(jsdata) {
    $("[tkey]").each(function (index) {
        var strTr = jsdata[$(this).attr('tkey')];
        $(this).html(strTr);
    });
    // Handle the following actions
    //- changing of thankyou.png
    //- changing of survey screenshot in infobox
    //- geocoder translations
    //- jquery dialog title translations
    //- popup number field placeholders
    //- success dialog box button translations
    if(currentLang === "en"){
        $("div.sucimage").css("content", "url('images/thankyou.png')");
        $("#survey_screen").attr("src", "images/survey_en.png");
        $("div.leaflet-control-geocoder-form").children(0).attr("placeholder", "Please enter a place or address");
        $("div.leaflet-control-geocoder-form-no-error").text("Your query produced no results.");
        $("#ui-id-5.ui-dialog-title").text("Parking private cars in Helsinki Capital Region"); //infobox
        $(".submitclose").html("Close");
        $(".viewresults").html("View your sent data (opens in new window)");
        $("#ui-id-6").text("Submit success!"); //success
        $(".form-control").attr("placeholder", "Insert value (0-99)");
        cssPopupsizeValue();
        
    } else {
        $("div.sucimage").css("content", "url('images/thankyou_fi.png')");
        $("#survey_screen").attr("src", "images/survey_fi.png");
        $("div.leaflet-control-geocoder-form").children(0).attr("placeholder", "Syötä paikka tai osoite");
        $("div.leaflet-control-geocoder-form-no-error").text("Hakusi ei tuottanut tuloksia.");
        $("#ui-id-5.ui-dialog-title").text("Henkilöautojen pysäköinti pääkaupunkiseudulla"); //infobox
        $(".submitclose").html("Sulje");
        $(".viewresults").html("Näytä raportti lähetetystä aineistosta (avautuu uuteen ikkunaan)");
        $("#ui-id-6").text("Lähetys onnistui!"); //success
        $(".form-control").attr("placeholder", "Syötä numero (0-99)");
        cssPopupsizeValue();
    }
};


//As the value about popup size, shown in Settings tab, is stored in css, we
//need this complicated way to translate it
function cssPopupsizeValue() {
    var popupsize = $(document).find(".popupsize").attr("content");
    if(currentLang === "en") {
        if (popupsize === "suuri (oletus)") {
            $(document).find(".popupsize").attr("content", "large (default)");
        } else if (popupsize === "keskikokoinen") {
            $(document).find(".popupsize").attr("content", "medium");
        } else if (popupsize === "pieni") {
            $(document).find(".popupsize").attr("content", "small");
        }
    } else {
        //English
        if (popupsize === "large (default)") {
            $(document).find(".popupsize").attr("content", "suuri (oletus)");
        } else if (popupsize === "medium") {
            $(document).find(".popupsize").attr("content", "keskikokoinen");
        } else if (popupsize === "small") {
            $(document).find(".popupsize").attr("content", "pieni");
        }
    }
}


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
        this.incompleteList = [];
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
        
    removeIncomplete(zipcode) {
        if(this.incompleteList.includes(zipcode)){
            this.incompleteList.splice(this.incompleteList.indexOf(zipcode), 1 );
            console.log(`Removed ${zipcode} from incomplete list`);
        } else {
            console.log(`Did not find zip code ${zipcode} in incomplete list`);
        }
    }
        
    //Query incompleteness of postal areas contained in this.zipCodeList.
    //Return incompleted postal areas as a html p element
    queryIncompleteness() {

        var result = "<p>";

        if (this.zipCodeList.length !== 0) {
            for (var i in this.zipCodeList) {
                
                var thisZip = this.zipCodeList[i];

                //iterate through all layers to find zipcodes
                for (var i in geojson._layers){
                    howManyNulls = 0;
                    thisLayer = geojson._layers[i];
                    theseProps = thisLayer.feature.properties;
                    theseAttrs = Object.keys(theseProps);

                    //if a layer's zipcode matches, then iterate through that layer's
                    //other attributes to find possible nulls
                    if(thisZip === theseProps.zipcode) {

                        for (var i = 0; i < theseAttrs.length; i += 1) {
                            //implement test whether layer is interactive or not
                            //check submit button which changed interactivity to false
                            attr = theseAttrs[i];
                            value = theseProps[attr];

                            if (value === null || value === "") {
                                howManyNulls += 1;
                            }
                        }
                    }
                    if(howManyNulls !== 0) {
                        result = result + `${thisZip}, ${getAreaName(thisZip)}<br>`;
                    }
                };
            }
        }
        return result + "</p>";
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

        for (var i = 0; i < theseAttrs.length; i += 1) {
            //implement test whether layer is interactive or not
            //check submit button which changed interactivity to false
            attr = theseAttrs[i];
            value = theseProps[attr];
            if (value === null || value === "") {
                howManyNulls += 1;
            }
        }
    };
    
    //if above for loop finished without any nulls, all popups are finished
    //and submit button can be enabled.
    if ((howManyNulls === 0) && (isEmpty(geojson._layers) === false)) {
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
            document.getElementById("buttonsubmitall").disabled = true;
        } else {
            console.log("Submit button already disabled.");
        }
    } else {
        console.log("Layer 'geojson' is not empty. Attempt to enable submit button:");
        if(submitButtonState() !== "enabled"){
            console.log("Le Success");
            document.getElementById("buttonsubmitall").disabled = false;
        } else {
            console.log("Submit button already enabled.");
        }
    }
}


// This is all the functionality of the "submit records" button
function submitButtonListener(){
    var sendButtonSubmit = L.DomUtil.get('buttonsubmitall');
    L.DomEvent.addListener(sendButtonSubmit, "click", function (e) {
        
        //The important part: send data to server
        preparePost();
        
        //Create success window. Because the post operation is asynchronous,
        //window creation will commence before preparePost() has finished
        //running
        $(function() {
            $("#sucdialog").dialog({
                position: {my: "center", at: "center", of: window},
                buttons: [
                    {
                        text: "Close",
                        //using addClass inside open parameter one can set
                        //css features for the jQuery UI buttons
                        open: function() {
                            languageCheckUp(); //update language of buttons
                            $(this).addClass("submitclose");
                        },
                        click: function () {
                            $(this).dialog("close");
                        }
                    }, {
                        text: "View your submission (opens in new window)",
                        open: function() {
                            $(this).addClass("viewresults");
                        },
                        click: function() {
                            showResponse();
                        }
                    }
                ]
            });
            
            // Are we on mobile? If yes, resize jQuery dialog to fullscreen
            // size
            mobileCheck();
            
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
function submitButtonState() {
    if(document.getElementById("buttonsubmitall").disabled === true) {
        return "disabled";
    } else {
        return "enabled";
    }
}



//---------------------------------
//DATABASE AND SUBMISSION FUNCTIONS
//---------------------------------

//for looping to send records to server record by record.
function preparePost() {
    
    //store server responses to an array
    window.responses = [];
    
    //make sure response is empty going in
    $("#response").html("");
    
    //generate timestamp for this submit
    var submitTime = formatTime();
    
    //helpers
    var recordsSent = 0;
    var errorRecords = 0;
    
    //fetch data from geojson
    for (var i in geojson._layers){
        thisLayer = geojson._layers[i];
        
        timestampValue = submitTime;
        zipcodeValue = thisLayer.feature.properties.zipcode;
        likertValue = thisLayer.feature.properties.likert;
        parkspotValue = thisLayer.feature.properties.parkspot;
        parktimeValue = thisLayer.feature.properties.parktime;
        walktimeValue = thisLayer.feature.properties.walktime;
        timeofdayValue = thisLayer.feature.properties.timeofday;
        
        var data = {
            timestamp: timestampValue,
            zipcode: zipcodeValue,
            likert: likertValue,
            parkspot: parkspotValue,
            parktime: parktimeValue,
            walktime: walktimeValue,
            timeofday: timeofdayValue
        };
        
        $.post('insert_mysql.php', data, function(responseFromServer) {
            // Insert response from server to '#response' div
            // if received error message, count it
            if(responseFromServer.status === "error") {
                errorRecords = errorRecords + 1;
                //$("div.sucimage").css("content", "url('images/error.jpg')");
            }
            
            var responseHtml = '<div><b>Response from server</b><br>Records sent: ' + (recordsSent + 1) + '<br>Fails: ' + errorRecords + '<br>Status: ' + responseFromServer.status + '</div>';
            console.log('-- Message from server --\nStatus: ' + responseFromServer.status + '\nMessage: ' + responseFromServer.message);
            window.responses.push(responseFromServer.message);
            
            // Only add one message from server. Add += if all messages are 
            // wanted
            var responseDiv = document.getElementById('response');
            responseDiv.innerHTML = responseHtml;
            
        }, 'json').done(function(responseFromServer){
            //run this small function any time jQuery post is finished
            recordsSent = recordsSent + 1;
        });
    }
}


//Generates a HTML page that displays all previously sent records
function showResponse() {
    
    //prepare language variants of the results page
    if(currentLang === "en"){
        key = key_en;
        familiar = familiar_en;
        parking = parking_en;
        parktimeofday = timeofday_en;
        title = "Your park survey records";
        pagetitle = "Your results";
        timestamp = "Timestamp";
        nosubs = "<p>No submissions found.</p>";
        yoursub = "<p>Your submission consisted of ";
        zipareas = " postal code areas.</p>";
        erroneous = ", erroneous result";
        errmessage = "Error message:";
    } else {
        key = key_fi;
        familiar = familiar_fi;
        parking = parking_fi;
        parktimeofday = timeofday_fi;
        title = "Vastauksesi pysäköintikyselyyn";
        pagetitle = "Tuloksesi";
        timestamp = "Lähetetty";
        nosubs = "<p>Vastauksia ei löytynyt.</p>";
        yoursub = "<p>Lähetyksesi sisälsi ";
        zipareas = " postinumeroaluetta.</p>";
        erroneous = ", virheellinen tulos";
        errmessage = "Virheviesti:";
    }
    
    //define content here to enable a clean slate each time function is run
    var content = "<!doctype html>" +
        "<html lang='en'>" +
        "<head>" +
            "<meta charset='utf-8'>" +
            `<title>${title}</title>` +
            "<meta name='description' content='Your park survey records'>" +
            "<meta name='author' content='Sampo Vesanen'>" +
            "<link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>" +
            "<style>" +
                "h1, h2, h3, p, ul, li {font-family: 'Montserrat', sans-serif;}" +
            "</style>" +
        "</head>" +
        "<body>" + `<H1>${pagetitle}</H1>`;

    //iterate through server responses. First check if responses exists
    if(typeof responses === 'undefined' || responses.length === 0) {
        content = content + nosubs +
                `<p>${timestamp} ${formatTime()}</p>`;

    //valid variable responses found
    } else {
        content = content + yoursub + responses.length + zipareas +
                `<p>${timestamp} ${formatTime()}</p>`;
        
        for(i = 0; i < responses.length; i++) {

            //prepare for exceptions
            try {
                thisResponse = responses[i].replace("New record created successfully. ", "");
                splitResponse = thisResponse.split(", ");
                thisZipCode = splitResponse[1].replace("postal code ", "");
                content = content + 
                        "<p>" + 
                            "<h3>" + 
                                (i + 1) + `, ${thisZipCode}, ${getAreaName(thisZipCode)}` + 
                            "</h3>" + 
                            "<ul>" + 
                                `<li>${splitResponse[4]}</li>` + 
                                `<li>${splitResponse[5]}</li>` + 
                                `<li>${splitResponse[2]}, ${familiar[splitResponse[2]]}</li>` + 
                                `<li>${splitResponse[3]}, ${parking[splitResponse[3]]}</li>` + 
                                `<li>${splitResponse[6]}, ${parktimeofday[splitResponse[6]]}</li>` +
                            "</ul>" + 
                        "</p>";
                
            //if the server has sent an error, replace() won't work. Deploy
            //this if this is the case.
            } catch(err) {
                content = content + 
                        "<h3>" + (i + 1) + `${erroneous}</h3>` + 
                        `<p>${errmessage}</p>` + 
                        `<ul><li>${responses[i]}</li></ul>`;
            }
        }
    }
    //add glossary and ending tags to the page being generated
    content = content + key + "</body></html>";
    
    //open generated HTML page in a new window
    var responseWindow = window.open();
    responseWindow.document.body.innerHTML = content;
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
    timestampValue = "04-04-2019 16:41:51"; //works
    zipcodeValue = "zipcode";
    likertValue = "64";
    parkspotValue = "parkspot";
    parktimeValue = "parktime";

    var data = {
        timestamp: timestampValue,
        zipcode: zipcodeValue,
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