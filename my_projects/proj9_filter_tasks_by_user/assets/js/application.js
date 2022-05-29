class Application {
    constructor(name) {
        this.name = name;
        this.tableElement = $("#task-list");
        this.tableBodyElement = $('#task-list').find('tbody');
        this.taskList = []

    }


    destroyTable() {
        this.tableBodyElement.empty();
    }
    onError(jqXhr, textStatus) {
        console.log('Text status: ', textStatus)
    }

    onTaskLoaded(data) {
        //console.log(data);
        const json = data;
        let tasklist = this.taskList;
        const tableBodyElement = this.tableBodyElement;
        data.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {

            let taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
            //tasklist(...taskToBeAdded) not work
            tasklist.push(taskToBeAdded)
            let row = taskToBeAdded.getRow();
            tableBodyElement.append(row);
        });

        /* $("#task-list").kendoGrid({
             dataSource: {
                 data: this.taskList,
                 pageSize: 5
             },
             height: 400,
             scrollable: true,
             pageable: true,
             sortable: true,
             groupable: true,
         })*/


    }
    loadTask() {

        $.ajax({ // import the json file in js by creating an XML request
            method: 'GET',
            url: 'data/task.json',
            success: (data) => { return this.onTaskLoaded(data) },
            error: this.onError
        });
    }
    _render(filterText) {
        this.destroyTable();
        if (filterText) {
            let taskListFiltered = this.taskList.filter((item) => item.assignedUser.toLowerCase().includes(filterText.toLowerCase())
            );
            taskListFiltered.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {
                let taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
                let row = taskToBeAdded.getRow();
                this.tableBodyElement.append(row);

            }
            )


        }
        else {
            this.taskList.forEach(({ taskName, taskDescription, status, startDate, dueDate, assignedUser }) => {

                let taskToBeAdded = new Task(taskName, taskDescription, status, startDate, dueDate, assignedUser);
                let row = taskToBeAdded.getRow();
                this.tableBodyElement.append(row);
            });

        }

    }


}


$(document).ready(function () {
    const app = new Application("trackTaskList");
    app.loadTask();
    $("#search").on("keyup", function () {
        app._render($("#search").val());
    });
    $("#add-task").on("click", function () {

        let object = {
            taskName: $("#task-name").val(),
            taskDescription: $("#task-description").val(),
            status: $("#status").val(),
            startDate: $("#start-date").val(),
            dueDate: $("#due-date").val(),
            assignedUser: $("#assigned-user").val()
        }

        let taskToBeAdded = new Task(object.taskName, object.taskDescription, object.status, object.startDate, object.dueDate, object.assignedUser);
        let row = taskToBeAdded.getRow();
        app.tableBodyElement.append(row);
        app.taskList.push(taskToBeAdded)
    })


})





