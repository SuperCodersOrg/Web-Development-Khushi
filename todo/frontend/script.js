

// URL
let url = "http://localhost:3270/";
// Icons

let icon1 = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
  <path d="M3 6h18"/>
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
</svg>
`;

let icon2 = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M18 6 7 17l-5-5"/>
  <path d="m22 10-7.5 7.5L13 16"/>
</svg>
`;

let icon3 = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="m9 12 2 2 4-4"/>
</svg>
`;

let icon4 = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="24"
     height="24"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M13 21h8"/>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
</svg>
`;



// Elements


let titleBox = document.getElementById("title-box");
let descriptionBox = document.getElementById("description-box");
let titleError = document.getElementById("title-error");
let descriptionError = document.getElementById("description-error");
let addButton = document.getElementById("add-button");
let taskContainer = document.getElementById("task-container");
let noTask = document.getElementById("no-task");

// State
let tasks = [];
let edit = false;
let editId = null;

//  Add button listener
addButton.addEventListener("click", addTask);

// Task button listener


taskContainer.addEventListener("click", function (event) {
    let button = event.target.closest("button");
    if (!button) {
        return;
    }
    let taskElement = button.closest(".task");
    if (!taskElement) {
        return;
    }
    let id = Number(taskElement.id);
    let action = button.dataset.action;
    if (action === "delete") {
        deleteTask(id);
   }
    else if (action === "complete") {
        completeTask(id);
    }
    else if (action === "edit") {
        editTask(id);
    }
});
// Validation

titleBox.addEventListener("input", function () {
    if (titleBox.value.trim() === "") {
        titleError.textContent = "Title is required";
    } else {
        titleError.textContent = "";
    }
});
descriptionBox.addEventListener("input", function () {
    if (descriptionBox.value.trim() === "") {
        descriptionError.textContent = "Description is required";
    } else {
        descriptionError.textContent = "";
    }
});


// Add or update task
function addTask() {
    let titleValue = titleBox.value.trim();
    let descriptionValue = descriptionBox.value.trim();
    titleError.textContent = "";
    descriptionError.textContent = "";
    if (titleValue === "") {
        titleError.textContent = "Title is required";
        return;
    }
    if (descriptionValue === "") {
        descriptionError.textContent = "Description is required";
        return;
    }
    // Update existing task
    if (edit === true) {
         fetch(`${url}edit`,{
        method:'PUT',
        headers:{ 'content-type':'application/json'},
        body:JSON.stringify({id:editId,title:titleValue,description:descriptionValue})
    })
    .then((response)=>{
        if(!response.ok){throw new Error(`HTTP ERROR : ${response.status}`);
        }  return response.json()})
       .then(()=>{
       edit = false;
        editId = null;
        addButton.textContent = "Add Task";
        titleBox.value = "";
            descriptionBox.value = "";
            getTaskFromServer();
       })
       .catch((error)=>{ console.error("edit error:",error)}) 
       return;
       
    }
   // Add new task
    
        let newTask = {
            isdeleted:'false',
            id: Date.now(),
            title: titleValue,
            description: descriptionValue,
            status: "pending",
            createdAt: new Date().toISOString()
        };
          
    saveDataOnServer(newTask);
    titleBox.value = "";
    descriptionBox.value = "";
   
}

// Delete task
function deleteTask(id) {
  fetch(`${url}delete`,{
        method:'DELETE',
        headers:{ 'content-type':'application/json'},
        body:JSON.stringify({deleteId:id})
    })
    .then((response)=>{
        if(!response.ok){throw new Error(`HTTP ERROR : ${response.status}`);
        }  return response.json()})
    .then((data) =>{
       getTaskFromServer();
    }) 
    .catch((error)=>{ console.error("delete error:"),error})  
}

// Complete task
function completeTask(id) {
     fetch(`${url}stateChange`,{
        method:'PATCH',
        headers:{ 'content-type':'application/json'},
        body:JSON.stringify({Id:id})
    })
    .then((response)=>{
        if(!response.ok){throw new Error(`HTTP ERROR : ${response.status}`);
        }  return response.json()})
    .then((data) =>{
       getTaskFromServer();
    }) 
    .catch((error)=>{ console.error("State change error:"),error})
}

// Edit task
function editTask(id) {
    let taskData = tasks.find(function (task) {
        return task.id === id;
    });
    if (!taskData) {
        return;
    }
    edit = true;
    editId = id;
    titleBox.value = taskData.title;
    descriptionBox.value = taskData.description;
    addButton.textContent = "Save Changes";
}

// Create task structure
function makeTaskInOutBox(taskData) {
   // Main task box
    let newTask = document.createElement("div");
    newTask.classList.add(
        "task",
        "rounded-xl",
        "border-2",
        "border-[#c5b49b]",
        "bg-[#f8f1e5]",
        "p-5",
        "shadow-sm",
        "break-words"
    );
    newTask.id = taskData.id;
    // Title
    let title = document.createElement("h1");
    title.classList.add(
        "task-title",
        "mb-2",
        "text-4xl",
        "font-bold",
        "text-[#4b3621]",
        "underline",
        "underline-offset-8"
    );
    title.textContent = taskData.title;
    // Description
    let description = document.createElement("p");
    description.classList.add(
        "task-description",
        "mb-2",
        "text-2xl",
        "text-[#5f4b35]"
    );
    description.textContent = taskData.description;
    // Date
    let date = document.createElement("p");
    date.classList.add(
        "task-date",
        "mb-4",
        "text-lg",
        "text-[#806b52]"
    );
    date.textContent =
        "Created: " +
        new Date(taskData.createdAt).toLocaleString();
    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add(
        "delete-button",
        "mr-2",
        "rounded-lg",
        "border",
        "border-[#8b6f47]",
        "bg-[#d8c3a5]",
        "p-3",
        "hover:bg-[#c8ad87]"
    );
    deleteButton.dataset.action = "delete";
    deleteButton.innerHTML = icon1;
    // Complete button
    let completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.classList.add(
        "complete-button",
        "mr-2",
        "rounded-lg",
        "border",
        "border-[#8b6f47]",
        "bg-[#d8c3a5]",
        "p-3",
        "hover:bg-[#c8ad87]"
    );
    completeButton.dataset.action = "complete";
    completeButton.innerHTML =
        taskData.status === "done" ? icon3 : icon2;
    // Edit button
    let editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add(
       "edit-button",
        "rounded-lg",
        "border",
        "border-[#8b6f47]",
        "bg-[#d8c3a5]",
        "p-3",
        "hover:bg-[#c8ad87]"
    );
    editButton.dataset.action = "edit";
    editButton.innerHTML = icon4;
    // Append elements
    newTask.appendChild(title);
    newTask.appendChild(description);
    newTask.appendChild(date);
    newTask.appendChild(deleteButton);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    taskContainer.appendChild(newTask);
}
// Display tasks
function makeTaskFromServer() {
    taskContainer.innerHTML = "";
    if (tasks.length === 0) {
        noTask.style.display = "block";
        return;
    }
    noTask.style.display = "none";
    for (let i = 0; i < tasks.length; i++) {
        makeTaskInOutBox(tasks[i]);
    }
}
//  Get tasks from localStorage

function getTaskFromServer() {
      
       fetch(`${url}loadTask`)
    .then((response)=>{
        if(!response.ok){
          throw new Error(`HTTP ERROR : ${response.status}`);
        }  return response.json()})
    .then((data) =>{
        if(!Array.isArray(data)){
            tasks=[];
        }
        else{ tasks=data.map(function (task) {
            if (!task.createdAt) {
                task.createdAt = new Date().toISOString();
            }
            return task;
        })}
       makeTaskFromServer();
    })    
    . catch ((error)=> {
        console.error("Invalid Server data:", error);
        tasks=[];        
        makeTaskFromServer();
    })
}
// Save tasks
function saveDataOnServer(task) {
    fetch(`${url}addTask`,{
        method:'POST',
        headers:{ 'content-type':'application/json'},
        body:JSON.stringify(task)
    })
    .then((response)=>{
        if(!response.ok){throw new Error(`HTTP ERROR : ${response.status}`);
        }  return response.json()})
    .then(() =>{
      getTaskFromServer();
    })
    .catch((error) => console.error("Add task error:", error));
}    
 
// Initial display
getTaskFromServer();