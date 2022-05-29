
function Application() {
    this.name = 'Task List'
    this.tableBodyElement = $('#task-list').find('tbody')
    this.taskList = []

}

Application.prototype = {
    destroyTable: function () {
        this.tableBodyElement.empty();
    },
    onError: function (jqXhr, textStatus) {
        console.log('Text status: ', textStatus)
    },

    onTaskLoaded: function (data) {
        //console.log(data);
        var json = data;

        data.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {

            var taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
            this.taskList.push(taskToBeAdded)
            var row = taskToBeAdded.getRow();
            this.tableBodyElement.append(row);
        });
        
        $("#task-list").kendoGrid({
            dataSource: {
                data: this.taskList,
                pageSize: 5
            },
            height: 400,
            scrollable: true,
            pageable: true,
            sortable: true,
            groupable: true,
        })


    },
    loadTask: function () {

        $.ajax({ // import the json file in js by creating an XML request
            method: 'GET',
            url: 'data/task.json',
            success: (data) => { return this.onTaskLoaded(data) },
            error: this.onError
        });
    },
    _render: function (filterText) {
        this.destroyTable();
        if (filterText) {
            var taskListFiltered = this.taskList.filter((item) => item.assignedUser.toLowerCase().includes(filterText.toLowerCase())
            );
            taskListFiltered.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {
                var taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
                var row = taskToBeAdded.getRow();
                this.tableBodyElement.append(row);

            }
            )
            
            $("#task-list").empty();
            $("#task-list").kendoGrid({
                dataSource: {
                    data: taskListFiltered,
                    pageSize: 5
                },
                height: 400,
                scrollable: true,
                pageable: true,
                sortable: true,
                groupable: true,
            })
        }
        else {
            this.taskList.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {

                var taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
                var row = taskToBeAdded.getRow();
                this.tableBodyElement.append(row);
            });
            $("#task-list").empty();
            $("#task-list").kendoGrid({
                dataSource: {
                    data: this.taskList,
                    pageSize: 5
                },
                height: 400,
                scrollable: true,
                pageable: true,
                sortable: true,
                groupable: true,
            })

        }
       
    }

}


/*
$('#filterText').on("keyup",function(){
filterText=$('#filterText').val();
this.destroyTable();
        this.taskList.filter(item => !filterText || (filterText && item.assignedUser.includes(filterText))).forEach(task => {
            var row = task.getRow();
            this.tableBodyElement.append(row);
}); 
*/



$(document).ready(function () {
    var app = new Application();
    app.loadTask();
    $("#searchButton").on("click", function () {
        app._render($("#search").val());
    });
    $("#add-task").on("click", function () {

        var object = {
            taskName: $("#task-name").val(),
            taskDescription: $("#task-description").val(),
            status: $("#status").val(),
            startDate: $("#start-date").val(),
            dueDate: $("#due-date").val(),
            assignedUser: $("#assigned-user").val()
        }

        var taskToBeAdded = new Task(object.taskName, object.taskDescription, object.status, object.startDate, object.dueDate, object.assignedUser);
        row = taskToBeAdded.getRow();
        app.tableBodyElement.append(row);
        app.taskList.push(taskToBeAdded)
    })


})






