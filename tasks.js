if (!localStorage.getItem("Tasks")) {
    var tasks = ["Call mum", "Dance"]
} else {
    var tasks = JSON.parse(localStorage.getItem("Tasks"))
}

function RefreshTasks() {
    document.getElementById("tasks").innerHTML = ""
    for (var i = 0; i != tasks.length; i++) {
        document.getElementById("tasks").innerHTML += "<li>" + tasks[i] +
            '<input type="button" id="my_centered_buttons" value="Done" onclick="RemoveTask(' + i + ')" >\n'
    }
    localStorage.setItem("Tasks", JSON.stringify(tasks));
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
    try {
        if (JSON.parse(Base64.decode(document.getElementById("Code").value)).some(i => typeof i !== "string")) {
            throw "Not only strings in the array OR not an array.";
        }
    } catch (err) {
        alert("Invalid code!");
        console.error(err)
        return "Evil";
    }
    tasks = JSON.parse(Base64.decode(document.getElementById("Code").value))
    RefreshTasks()
}
function ExportTasks() {
    try {
        if (tasks.some(i => typeof i !== "string")) {
            throw "Not only strings in the array OR not an array.";
        }
    } catch (err) {
        alert("Data corrupted, cannot export.");
        console.error(err)
        return "Corrupted.";
    }
    document.getElementById("Code").value = Base64.encode(JSON.stringify(tasks))
}
inputId = document.getElementById('TaskName');
inputId.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        AddTask()
    }
});
RefreshTasks()