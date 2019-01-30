/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var popupContent = '<form role="form" id="form" enctype="multipart/form-data" class = "form-horizontal" onsubmit="addMarker()">'+
    //datetime
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Pysäköintisi päivämäärä ja kellonaika</strong></label>'+
        '<input type="date" placeholder="Required" id="date" name="date" class="form-control"/>'+ 
    '</div>'+

    //time to search parking
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Kuinka pitkään etsit pysäköintipaikkaa (minuuteissa)?: </strong></label>'+
        '<input type="number" min="0" max="120" class="form-control" id="parktime" name="parktime">'+ 
    '</div>'+

    //likert familiarity of parking area
    '<div class="row">'+
        '<label class="control-label col-sm-5"><strong>Kuinka usein olet pysäköinyt autosi tälle alueelle?</strong></label>'+
        '<div class="small-2 column text-right">'+
            '<p>strongly agree</p>'+
        '</div>'+
        '<div class="small-3 column">'+
            '<ul class="likert">'+
                '<li><input value="1" name="likert" type="radio">Erittäin usein</li>'+
                '<li><input value="2" name="likert" type="radio">Usein</li>'+
                '<li><input value="3" name="likert" type="radio">Toisinaan</li>'+
                '<li><input value="4" name="likert" type="radio">Harvoin</li>'+
                '<li><input value="5" name="likert" type="radio">En koskaan</li>'+
            '</ul>'+
        '</div>'+
        '<div class="small-2 column end">'+
            '<p>strongly disagree</p>'+
        '</div>'+
    '</div>'+

    //type of parking spot
    '<div class="form-group">'+
        '<label class="control-label col-sm-5"><strong>Minkätyyppinen pysäköintipaikka oli kyseessä?</strong></label>'+
        '<select class="form-control" id="parkspottype" name="parkspottype">'+
            '<option value="1">Kadunvarsipaikka</option>'+
            '<option value="2">Pysäköintialue (parkkipaikka)</option>'+
            '<option value="3">Pysäköintihalli</option>'+
            '<option value="4">Muu</option>'+
        '</select>'+ 
    '</div>'+

    '<button id="button-submit" type="button">Save Changes</button>'+

'</form>';
