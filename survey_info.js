/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var infoHeaderStuff = '<p><strong>Parking private cars in Helsinki Capital Region</strong></p>';

var basicInfo = "<div id='basic_info'>"+
        "<span id='close' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); return false;'><strong>x</strong></span>"+
        "<span id='info'>"+
        '<H2>Tervetuloa kyselyyn!</H2>'+
        'Tämän kyselyn tarkoituksena on selvittää kuinka kauan henkilöauton pysäköinti kestää pääkaupunkiseudulla. Kyselyssä huomioidaan pysäköinnin koko prosessi: kuinka kauan pysäköintipaikkaa etsittiin, minne auto pysäköitiin ja missä oli vastaajan todellinen määränpää. Kyselyssä kerättyjä tietoja käytetään Helsingin yliopiston geoinformatiikan pro gradu -tutkimuksessa, josta voit lukea lisää allaolevasta "tarkempaa tietoa kyselystä" -kohdassa.'+
        '<br>'+
        '<br>Tämä kysely tähtää vaivattomuuteen: Jos et muista pysäköinnin tarkkaa aikaa tai paikkaa, voit syöttää näistä arvion. Voit täyttää kyselyn vaikka jokaisen pääkaupunkiseudulla tapahtuneen henkilöautomatkasi päätteeksi, tai täyttää lomakkeen yhdeltä istumalta monta kertaa.'+
        '<br>'+
        '<br>Pyydän mahdollisuuksien mukaan jatkamaan kyselyyn vastaamista 31.3.2019 asti.'+
        '<br>'+
        '<br><b>Huom!</b> Huomaathan, että <i>kyselyssä ei kartoiteta kotipihapysäköintiä tai sellaista pysäköintiä, jossa vastaajalla on käytössä henkilökohtainen pysäköintipaikka</i>.</br>'+
        '<br>'+
        'Kiitän vastauksestasi, <br>terveisin, Sampo Vesanen</br><br>Kyselyyn liittyvissä asioissa ota minuun yhteyttä sähköpostitse: sampo.vesanen(at)helsinki.fi'+
    '</span>'+
    '</div>';
    
var missingStuff = '<font size="4" color="red" style="line-height: 30px;"><center><strong>This entry is incomplete!</strong></center></font>';