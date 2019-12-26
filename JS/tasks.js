const version = "1.1"
var curEdit = -1
if (!localStorage.getItem("save")) {
    var save = {
        "tasks": ["Call mum", "Dance"],
        "version": version
    }
} else {
    var save = JSON.parse(localStorage.getItem("save"))
}
if (save.version != version) {
    alert("WARNING\nSave file is from another version, please contact Lubomir for help.")
}


function refreshTasks() {
    document.getElementById("tasks").innerHTML = ""
    for (var i = 0; i != save.tasks.length; i++) {
        if (i == curEdit)
            document.getElementById("tasks").innerHTML += `<li><input type="text" id="edit" value="${newText}"></input>✅<a href="javascript:editTask(${id})" title="Edit" >✏️</a>`
        else
            document.getElementById("tasks").innerHTML += `<li><div id="task${i}">${save.tasks[i]}<a href="javascript:removeTask(${i})" title="Done" >✅</a><a href="javascript:rditTask(${i})" title="Edit" >✏️</a></div>\n`
    }
    localStorage.setItem("save", JSON.stringify(save));
    save.version = version
}

function addTask() {
    save.tasks.push(document.getElementById("TaskName").value)
    document.getElementById("TaskName").value = ""
    RefreshTasks()
}

function removeTask(id) {

    save.tasks.splice(id, 1)

    if (save.tasks.length == 0) {
        save.tasks.push("Add more tasks")
    }
    refreshTasks()
}

function resetTasks() {
    save.tasks = ["Call mum", "Dance"]
    refreshTasks()
}

function importTasks() {
    try {
        if (JSON.parse(Base64.decode(document.getElementById("Code").value)).tasks.some(i => typeof i !== "string")) {
            throw "Not only strings in the array OR not an array.";
        }
    } catch (err) {
        alert("Invalid code!");
        console.error(err)
        return "Evil";
    }
    save = JSON.parse(Base64.decode(document.getElementById("Code").value))
    if (save.version != version) {
        alert("WARNING\nSave file is from another version, please contact Lubomir for help.")
    }
    refreshTasks()
}

function exportTasks() {
    try {
        if (save.tasks.some(i => typeof i !== "string") || !save.version) {
            throw "Not only strings in the array OR not an array.";
        }
    } catch (err) {
        alert("Data corrupted, cannot export.");
        console.error(err)
        return "Corrupted.";
    }
    document.getElementById("Code").value = Base64.encode(JSON.stringify(save))
}

function showSettings() {
    if (document.getElementById("settings").innerHTML == "")
        document.getElementById("settings").innerHTML = `<p><input type="button" value="Reset" onclick="resetTasks()"></p>
    <p><input type="button" value="Import" onclick="importTasks()">
    <input type="button" value="Export" onclick="exportTasks()">
    <input type="text" id="Code"></p>`
    else
        document.getElementById("settings").innerHTML = ""
}

function editTask(id) {
    if (curEdit != -1) {
        document.getElementById('task' + curEdit).innerHTML = `${editField.value}<a href="javascript:removeTask(${curEdit})" title="Done" >✅</a><a href="javascript:editTask(${curEdit})" title="Edit" >✏️</a>`
        save.tasks[id] = editField.value
        refreshTasks()
        if (curEdit == id) {
            curEdit = -1
            return;
        }
    }
    curEdit = id
    newText = document.getElementById("task" + id).innerHTML.split("<")[0]
    document.getElementById("task" + id).innerHTML = `<input type="text" id="edit" value="${newText}"></input>✅<a href="javascript:editTask(${id})" title="Edit" >✏️</a>`
    editField = document.getElementById('edit');
    editField.addEventListener('keyup', function onEvent(e) {
        if (e.keyCode === 13) {
            document.getElementById('task' + curEdit).innerHTML = `${editField.value}<a href="javascript:removeTask(${curEdit})" title="Done" >✅</a><a href="javascript:editTask(${curEdit})" title="Edit" >✏️</a>`
            save.tasks[id] = editField.value
            curEdit = -1
            refreshTasks()
        }
    });

}
taskField = document.getElementById('TaskName');
taskField.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        addTask()
    }
});
refreshTasks()