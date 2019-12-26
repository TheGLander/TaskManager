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


function RefreshTasks() {
    document.getElementById("tasks").innerHTML = ""
    for (var i = 0; i != save.tasks.length; i++) {
        if (i == curEdit)
            document.getElementById("tasks").innerHTML += `<li><input type="text" id="edit" value="${newText}"></input>✅<a href="javascript:EditTask(${id})" title="Edit" >✏️</a>`
        else
            document.getElementById("tasks").innerHTML += `<li><div id="task${i}">${save.tasks[i]}<a href="javascript:RemoveTask(${i})" title="Done" >✅</a><a href="javascript:EditTask(${i})" title="Edit" >✏️</a></div>\n`
    }
    localStorage.setItem("save", JSON.stringify(save));
    save.version = version
}

function AddTask() {
    save.tasks.push(document.getElementById("TaskName").value)
    document.getElementById("TaskName").value = ""
    RefreshTasks()
}

function RemoveTask(id) {

    save.tasks.splice(id, 1)

    if (save.tasks.length == 0) {
        save.tasks.push("Add more tasks")
    }
    RefreshTasks()
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

function ShowSettings() {
    if (document.getElementById("settings").innerHTML == "")
        document.getElementById("settings").innerHTML = `<p><input type="button" value="Reset" onclick="ResetTasks()"></p>
    <p><input type="button" value="Import" onclick="ImportTasks()">
    <input type="button" value="Export" onclick="ExportTasks()">
    <input type="text" id="Code"></p>`
    else
        document.getElementById("settings").innerHTML = ""
}

function EditTask(id) {
    if (curEdit != -1) {
        document.getElementById('task' + curEdit).innerHTML = `${editField.value}<a href="javascript:removeTask(${curEdit})" title="Done" >✅</a><a href="javascript:editTask(${curEdit})" title="Edit" >✏️</a>`
        save.tasks[id] = editField.value
        if (curEdit == id) {
            curEdit = -1
            return;
        }
    }
    curEdit = id
    newText = document.getElementById("task" + id).innerHTML.split("<")[0]
    document.getElementById("task" + id).innerHTML = `<input type="text" id="edit" value="${newText}"></input>✅<a href="javascript:EditTask(${id})" title="Edit" >✏️</a>`
    editField = document.getElementById('edit');
    editField.addEventListener('keyup', function onEvent(e) {
        if (e.keyCode === 13) {
            document.getElementById('task' + curEdit).innerHTML = `${editField.value}<a href="javascript:removeTask(${curEdit})" title="Done" >✅</a><a href="javascript:editTask(${curEdit})" title="Edit" >✏️</a>`
            save.tasks[id] = editField.value
            curEdit = -1
        }
    });

}
taskField = document.getElementById('TaskName');
taskField.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        AddTask()
    }
});
RefreshTasks()