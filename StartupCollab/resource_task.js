// Go back to the main page
function goBack() {
  window.history.back();
}

// Add a new task
function addTask() {
  let taskInput = document.getElementById("taskInput").value;
  if (taskInput.trim() !== "") {
    let li = document.createElement("li");
    li.textContent = taskInput;
    document.getElementById("taskList").appendChild(li);
    document.getElementById("taskInput").value = "";
  }
}

// Add a new resource
function addResource() {
  let resourceInput = document.getElementById("resourceInput").value;
  if (resourceInput.trim() !== "") {
    let li = document.createElement("li");
    li.textContent = resourceInput;
    document.getElementById("resourceList").appendChild(li);
    document.getElementById("resourceInput").value = "";
  }
}
