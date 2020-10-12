/* 
 * This is the html survey form of Leaflet popup survey for University of Helsinki 
 * master's thesis "Parking of private cars and accessibility in Helsinki 
 * Capital Region". Written by Sampo Vesanen.
 */

// onsubmit="addmarker" may be obsolete
var popupContent = 
    '<form name="myform" role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">' +

    // Time to search parking
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_search">How long does it usually take for you to park your car and arrive at your destination by foot in this postal code area (in minutes)?<br></strong></label>' +
        '<input type="number" min="0" max="99" placeholder="&#xf017; Required (0-99)" class="form-control" id="parktime" name="parktime" onkeyup="if(this.value > 99) this.value = 99; else if(this.value < 0) this.value = 0; else this.value = parseInt(this.value, 10);">' +
    '</div>' +
    
    // Time to walk to destination
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_walktime">How long to walk?<br></strong></label>' +
        '<input type="number" min="0" max="99" placeholder="&#xf017; Required (0-99)" class="form-control" id="walktime" name="walktime" onkeyup="if(this.value > 99) this.value = 99; else if(this.value < 0) this.value = 0; else this.value = parseInt(this.value, 10);">' +
    '</div>' +

    // Likert familiarity of parking area
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_likert">How familiar are you with this postal code area?</strong></label>' +
        '<div class="likertcolumn">' +
            '<ul class="likert" id="likert">' +
                //<label></label> makes possible to click on radio button texts as well as the radio button
                '<label><li><input id="likert" value="1" name="likert" type="radio"><span tkey="likert1">Extremely familiar</span></li></label>' +
                '<label><li><input id="likert" value="2" name="likert" type="radio"><span tkey="likert2">Moderately familiar</span></li></label>' +
                '<label><li><input id="likert" value="3" name="likert" type="radio"><span tkey="likert3">Somewhat familiar</span></li></label>' +
                '<label><li><input id="likert" value="4" name="likert" type="radio"><span tkey="likert4">Slightly familiar</span></li></label>' +
                '<label><li><input id="likert" value="5" name="likert" type="radio"><span tkey="likert5">Not at all familiar</span></li></label>' +
            '</ul>' +
        '</div>' +
    '</div>' +

    // Type of parking spot
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_parkspot">What kind of parking spot do you usually take in this postal code area?</strong><br></label>' +
        '<div class="parkspotcolumn">' +
            '<select id="parkspot" name="parkspot" onchange="onParkspotChange(event)">' +
                '<li><option value="0" name="parkspot" tkey="parkspotd" selected disabled value>-- select an option --</option></li>' +
                '<li><option value="1" name="parkspot" tkey="parkspot1">Parking space on the side of the street</option></li>' +
                '<li><option value="2" name="parkspot" tkey="parkspot2">Parking lot</option></li>' +
                '<li><option value="3" name="parkspot" tkey="parkspot3">Parking garage</option></li>' +
                '<li><option value="4" name="parkspot" tkey="parkspot4">Private or reserved parking spot</option></li>' +
                '<li><option value="5" name="parkspot" tkey="parkspot5">Other</option></li>' +
            '</select>' + 
        '</div>' +
    '</div>' +
    
    // Time of day
    '<div class="form-group">' +
    '<label class="control-label col-sm-5"><strong tkey="lang_timeofday">At what time of the day do you usually park in the area?</strong><br></label>' +
    '<div class="timeofdaycolumn">' +
        '<select id="timeofday" name="timeofday" onchange="onTimeOfDayChange(event)">' +
            '<li><option value="0" name="timeofday" tkey="parkspotd" selected disabled value>-- select an option --</option></li>' +
            '<li><option value="1" name="timeofday" tkey="timeofday1">Weekday, rush hour (07:00-09:00 and 15:00-17:00)</option></li>' +
            '<li><option value="2" name="timeofday" tkey="timeofday2">Weekday, other than rush hour</option></li>' +
            '<li><option value="3" name="timeofday" tkey="timeofday3">Weekend</option></li>' +
            '<li><option value="4" name="timeofday" tkey="timeofday4">Can\'t specify, no usual time</option></li>' +
        '</select>' + 
    '</div>' +
'</div>' +
    
    // Save button
    '<button id="button-submit" class="icon save" type="button" tkey="lang_savechanges">Save changes</button>' +
            
    // Delete current feature button
    '<button id="button-delete" class="icon trash-alt" type="button" tkey="lang_deletefeature">Remove these records</button>' +
'</form>';
