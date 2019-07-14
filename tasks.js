if (!localStorage.getItem("Tasks")) {
    var tasks = ["Call mum", "Dance"]
} else {
    var tasks = localStorage.getItem("Tasks").split(",")
}

function RefreshTasks() {
    document.getElementById("tasks").innerHTML = ""
    for (var i = 0; i != tasks.length; i++) {
        document.getElementById("tasks").innerHTML += "<li>" + tasks[i] +
            '<input type="button" value="Done" onclick="RemoveTask(' + i + ')" >\n'
    }
    localStorage.setItem("Tasks", tasks);
}

function AddTask() {
    tasks.push(document.getElementById("TaskName").value)
    document.getElementById("TaskName").value = ""
    RefreshTasks()
}

function RemoveTask(id) {

    tasks.splice(id, 1)

    if (tasks.length == 0) {
        tasks.push("Add more tasks")
    }
    RefreshTasks()
}

function ResetTasks() {
    tasks = ["Call mum", "Dance"]
    RefreshTasks()
}

function ImportTasks() {
    tasks = ["Call mum", "Dance"]
    RefreshTasks()
}
inputId = document.getElementById('TaskName');
inputId.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        AddTask()
    }
});
RefreshTasks()