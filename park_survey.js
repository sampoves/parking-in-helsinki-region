/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// TSEKKAA MIKÄ ADDMARKER() TUOLLA LOPUSSA ON EKALLA RIVIL
var popupContent = '<form name="myform" role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
    //datetime
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Pysäköintisi päivämäärä ja kellonaika<br></strong></label>'+
        '<input type="datetime-local" placeholder="Required" id="datetime" name="datetime" class="form-control"/>'+ 
    '</div>'+

    //time to search parking
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Kuinka pitkään etsit pysäköintipaikkaa (minuuteissa)?:<br></strong></label>'+
        '<input type="number" min="0" max="120" placeholder="Required" class="form-control" id="parktime" name="parktime">'+
    '</div>'+

    //likert familiarity of parking area
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Kuinka usein olet pysäköinyt autosi tälle alueelle?</strong></label>'+
        '<div class="likertcolumn">'+
            '<ul class="likert" id="likert">'+
                //<label></label> makes possible to click on radio button texts as well as the radio button
                '<label><li><input value="1" name="likert" type="radio">Erittäin usein</li></label>'+
                '<label><li><input value="2" name="likert" type="radio">Usein</li></label>'+
                '<label><li><input value="3" name="likert" type="radio">Toisinaan</li></label>'+
                '<label><li><input value="4" name="likert" type="radio">Harvoin</li></label>'+
                '<label><li><input value="5" name="likert" type="radio">En koskaan</li></label>'+
            '</ul>'+
        '</div>'+
    '</div>'+

    //type of parking spot
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Minkätyyppinen pysäköintipaikka oli kyseessä?</strong><br></label>'+
        '<div class="parkspotcolumn">'+
            '<select id="parkspot" name="parkspot" onchange="onParkspotChange(event)">'+
                '<li><option value="0" name="parkspot" selected disabled value> -- select an option -- </option></li>'+
                '<li><option value="1" name="parkspot">Kadunvarsipaikka</option></li>'+
                '<li><option value="2" name="parkspot">Pysäköintialue (parkkipaikka)</option></li>'+
                '<li><option value="3" name="parkspot">Pysäköintihalli</option></li>'+
                '<li><option value="4" name="parkspot">Muu</option></li>'+
            '</select>'+ 
        '</div>'+
    '</div>'+
    
    //submit button
    '<button id="button-submit" type="button">Save Changes</button>'+
'</form>';
