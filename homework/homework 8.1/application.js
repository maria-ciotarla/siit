
$("#add-task").addClass("btn btn-primary active");

$("#add-task").on("click",function(){
    var object={
    taskName : $("#task-name").val(),
    taskDescription : $("#task-description").val(),
    status: $("#status").val(),
    startDate : $("#start-date").val(),
    dueDate: $("#due-date").val(),
    assignedUser: $("#assigned-user").val()
    }
    var row =`<tr><td>${object.taskName}</td>
                <td>${object.taskDescription}</td>
                <td>${object.status}</td>
                <td>${object.startDate}</td>
                <td>${object.dueDate}</td>
                <td>${object.assignedUser}</td>
                </tr>`;
    $("tbody").append(row);

 
})
$("table").addClass("table table-dark");
$(document).ready(function () {

    $.ajax({ // import the json file in js by creating an XML request
        method: 'GET',
        url: '/task.json',
        success: function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                var object=data[i];
                var row =`<tr><td>${object.taskName}</td>
                <td>${object.taskDescription}</td>
                <td>${object.status}</td>
                <td>${object.startDate}</td>
                <td>${object.dueDate}</td>
                <td>${object.assignedUser}</td>
                </tr>`;
                $("tbody").append(row); 
            }
        },
        error: function(jqXhr, textStatus){
            console.log('Text status: ', textStatus);
        }
    });
})