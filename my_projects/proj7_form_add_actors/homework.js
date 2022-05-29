var persons = [];
var nr = 1;

$("#save").addClass("btn btn-outline-primary"); //for every button and table set a class to configure the design
$("#showForm").addClass("btn btn-outline-primary");
$("table").addClass("table table-dark");
$("#showForm").on("click", function () { //when the button is pushed fade in is called
    $("form").fadeIn();
});
$("#save").on("click", function () {
    $("form").fadeOut();

    var object = {  //define an object which receives the attributes from the form inputs 
        id: nr++,
        characterName: $("#character-name").val(),
        ActorName: $("#actor-name").val(),
        pictureURL: $("#picture").val()
    };
    if (object.characterName != "" && object.ActorName != "" && object.pictureURL != "") {
        persons.push(object); //if the attributes are not null store it in array(persons)
    }


    if (persons.length > 0) { 
        $("#crew-list tbody").remove(); //before build the table delete body
        $("#crew-list").append("<tbody>"); //in table add tbody tag 
        for (var j = 0; j < persons.length; j++) { //for each person from array add a row 
                                                   //and for each attribute create a collumn

            $("tbody").append("<tr>");
            var object = Object.values(persons[j]); //object to array
            for (var k = 0; k < object.length; k++) {
                if(k==object.length-1){
                    $("tr").last().append("<td>");
                    var src='<img src="';
                    src=src+object[k]+'">';
                    $("td").last().append(src);
                    $("tr").last().append("</td>");
                }
                else {
                $("tr").last().append("<td>");
                $("td").last().append(object[k]);
                $("tr").last().append("</td>");}
            }
            $("tbody").append("</tr>");


        }
        $("#crew-list").append("</tbody>"); // add /tbody at the end of table
    }
});