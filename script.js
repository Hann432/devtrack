
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("devtrackTasks")) || [];

function updateStats() {
    localStorage.setItem("devtrackTasks", JSON.stringify(tasks));
    
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const remaining = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = remaining;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const text = document.createElement("span");
        text.textContent = task.name;
        text.className = "task-text";

        if (task.completed) {
            text.classList.add("completed");
        }

        text.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
        });

        li.appendChild(text);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateStats();
}

taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (!taskName) return;

    tasks.push({
        id: Date.now(),
        name: taskName,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
});
