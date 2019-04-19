/* 
 * This is the html survey form of Leaflet popup survey for University of Helsinki 
 * master's thesis "Parking of private cars and accessibility in Helsinki 
 * Capital Region". Written by Sampo Vesanen.
 */

// onsubmit="addmarker" may be obsolete
var popupContent = 
    '<form name="myform" role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">' +

    //time to search parking
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_search">How long does it usually take for you to park your car and arrive at your destination by foot in this postal code area (in minutes)?<br></strong></label>' +
        '<input type="number" min="0" max="99" placeholder="&#xf017; Required (0-99)" class="form-control" id="parktime" name="parktime" onkeyup="if(this.value > 99) this.value = 99; else if(this.value < 0) this.value = 0; else this.value = parseInt(this.value, 10);">' +
    '</div>' +
    
    //time to walk to destination
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong tkey="lang_walktime">How long to walk?<br></strong></label>' +
        '<input type="number" min="0" max="99" placeholder="&#xf017; Required (0-99)" class="form-control" id="walktime" name="walktime" onkeyup="if(this.value > 99) this.value = 99; else if(this.value < 0) this.value = 0; else this.value = parseInt(this.value, 10);">' +
    '</div>' +

    //likert familiarity of parking area
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong tkey="lang_likert">How familiar are you with this postal code area?</strong></label>' +
        '<div class="likertcolumn">'+
            '<ul class="likert" id="likert">'+
                //<label></label> makes possible to click on radio button texts as well as the radio button
                '<label><li><input value="1" name="likert" type="radio"><span tkey="likert1">Extremely familiar</span></li></label>' +
                '<label><li><input value="2" name="likert" type="radio"><span tkey="likert2">Moderately familiar</span></li></label>' +
                '<label><li><input value="3" name="likert" type="radio"><span tkey="likert3">Somewhat familiar</span></li></label>' +
                '<label><li><input value="4" name="likert" type="radio"><span tkey="likert4">Slightly familiar</span></li></label>' +
                '<label><li><input value="5" name="likert" type="radio"><span tkey="likert5">Not at all familiar</span></li></label>' +
            '</ul>'+
        '</div>'+
    '</div>'+

    //type of parking spot
    '<div class="form-group">' +
        '<label class="control-label col-sm-5"><strong tkey="lang_parkspot">What kind of parking spot do you usually take in this postal code area?</strong><br></label>' +
        '<div class="parkspotcolumn">' +
            '<select id="parkspot" name="parkspot" onchange="onParkspotChange(event)">' +
                '<li><option value="0" name="parkspot" tkey="parkspotd" selected disabled value>-- select an option --</option></li>' +
                '<li><option value="1" name="parkspot" tkey="parkspot1">Parking space on the side of the street</option></li>' +
                '<li><option value="2" name="parkspot" tkey="parkspot2">Parking lot</option></li>' +
                '<li><option value="3" name="parkspot" tkey="parkspot3">Parking garage</option></li>' +
                '<li><option value="4" name="parkspot" tkey="parkspot4">Other</option></li>' +
            '</select>' + 
        '</div>' +
    '</div>' +
    
    //submit button
    '<button id="button-submit" class="icon save" type="button" tkey="lang_savechanges">Save changes</button>' +
            
    //delete current feature button
    '<button id="button-delete" class="icon trash-alt" type="button" tkey="lang_deletefeature">Remove these records</button>' +
'</form>';
