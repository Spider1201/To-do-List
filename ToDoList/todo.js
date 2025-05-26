const inputBtn = document.getElementById("input-box")
const addBtn = document.getElementById("addBtn")
const list = document.getElementById("list")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){
    list.innerHTML = "";
    tasks.forEach((task, index) =>{
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        const check = document.createElement("input")
        check.setAttribute("type","checkbox")
        const span = document.createElement("span");

      

        span.textContent = task.text;
        span.style.cursor = "pointer";
        span.onclick = () => toggleComplete(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.className = "delete-btn"
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(deleteBtn)
       span.appendChild(check)
        list.appendChild(li)
    });
}
function addTask() {
    const text = inputBtn.value.trim();
    if(text == "") return;
    tasks.push({ text, completed: false });
    inputBtn.value = "";
    saveTasks();
    renderTasks();
}
function deleteTask(index){
    tasks.splice(index, 1)
    saveTasks();
    renderTasks();
}

function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);
inputBtn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
})
renderTasks();