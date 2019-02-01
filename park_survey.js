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
    '<div class="row">'+
        '<label class="control-label col-sm-5"><strong>Kuinka usein olet pysäköinyt autosi tälle alueelle?</strong></label>'+
        '<div class="small-3 column">'+
            '<ul class="likert" onclick="myfunction()">'+
                '<li><input value="1" id="likert" name="likert" type="radio">Erittäin usein</li>'+
                '<li><input value="2" id="likert" name="likert" type="radio">Usein</li>'+
                '<li><input value="3" id="likert" name="likert" type="radio">Toisinaan</li>'+
                '<li><input value="4" id="likert" name="likert" type="radio">Harvoin</li>'+
                '<li><input value="5" id="likert" name="likert" type="radio">En koskaan</li>'+
            '</ul>'+
        '</div>'+
    '</div>'+

    //type of parking spot
    '<div class="form-group">'+
        '<label for="parkspot">Minkätyyppinen pysäköintipaikka oli kyseessä?<br></label>'+
        '<select id="parkspot" name="parkspot" onclick="myfunction()">'+
            '<option disabled selected value> -- select an option -- </option>'+
            '<option value="3" name="parkspot" label="Kadunvarsipaikka"></option>'+
            '<option value="2" name="parkspot" label="Pysäköintialue (parkkipaikka)"></option>'+
            '<option value="3" name="parkspot" label="Pysäköintihalli"></option>'+
            '<option value="4" name="parkspot" label="Muu"></option>'+
        '</select>'+ 
    '</div>'+
    
    //text box for testing
    '<div class="form-group">'+
        'jeje: <input type="text" placeholder="Required" id="testtext" name="testtext">'+
    '</div>'+
    
    //submit button
    '<button id="button-submit" type="button">Save Changes</button>'+
'</form>';
