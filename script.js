const input = document.querySelector(".task-input input");
const addBtn = document.querySelector(".task-input button");
const taskList = document.querySelector(".task-list");
const taskCount = document.querySelector(".task-count");

/* Local Storage is a browser feature that stores data inside the user's browser.
Data remains saved even if the page is : refreshed closed reopened */
let tasks = [];

// Load tasks when page opens
loadTasks();

// Create addTask() Function
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    text: taskText,
    completed: false,
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  input.value = "";
}

// This function creates the UI from the tasks array.
// completed is class that appears if task is completed
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `<div class="task-left">
                            <input type="checkbox" ${task.completed ? "checked" : ""}>
                            <span class="task-text ${task.completed ? "completed" : ""}"> 
                                ${task.text}
                            </span>
                        </div>

                        <div class="task-action">
                            <button class="edit-btn">✏</button>
                            <button class="delete-btn">🗑</button>
                        </div>`;

    taskList.appendChild(li);
    taskList.scrollTop = taskList.scrollHeight;
  });

  updateTaskCount();
}

// localStorage only stores strings, so we convert the array using : JSON.stringify(tasks)
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");

  // JSON.parse() converts it back to an array of objects.
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  renderTasks();
}

// Run addTask() When Button is Clicked
addBtn.addEventListener("click", addTask);

// Add Task Using Enter Key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Mark Task as Completed When checkbox is clicked, toggle() means: Add class if it doesn't exist, Remove class if it already exists
taskList.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const li = e.target.closest(".task-item");

    const index = [...taskList.children].indexOf(li);

    tasks[index].completed = e.target.checked;

    saveTasks();
    renderTasks();
  }
});

function updateTaskCount() {
  const tasks = document.querySelectorAll(".task-item");
  const completed = document.querySelectorAll(".completed");

  const remaining = tasks.length - completed.length;

  taskCount.textContent = remaining + " tasks remaining";
}

// Clear Completed Tasks : The Clear Completed button removes finished tasks.
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
  // Keep the task if it is NOT completed
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();
  renderTasks();
});

//Adding the filter buttons where All : show every task, Active : show tasks not completed and Completed : show task completed
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // dataset.filter comes from HTML
    const filterType = btn.dataset.filter;

    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked button
    btn.classList.add("active");

    applyFilter(filterType);
  });
});

// This function decides which tasks should appear.
function applyFilter(filterType) {
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    const checkbox = task.querySelector("input");
    const completed = checkbox.checked;

    if (filterType === "all") {
      task.style.display = "flex";
    } else if (filterType === "active") {
      task.style.display = completed ? "none" : "flex";
    } else if (filterType === "completed") {
      task.style.display = completed ? "flex" : "none";
    }
  });
}

// Edit Task feature
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const task = e.target.closest(".task-item");
    const textElement = task.querySelector(".task-text");
    const editBtn = e.target;

    const oldText = textElement.textContent.trim();

    // Prevent multiple edit inputs
    if (task.querySelector(".edit-input")) return;

    // create input
    const input = document.createElement("textarea");
    input.type = "text";
    input.className = "edit-input";

    // first insert input into DOM
    textElement.replaceWith(input);

    // THEN set value
    input.value = oldText;

    // Auto resize textarea
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";

    setTimeout(() => {
      input.focus();

      // place cursor at end
      const length = input.value.length;

      input.setSelectionRange(length, length);
    });

    // change edit icon to tick
    editBtn.textContent = "✔";
    editBtn.classList.remove("edit-btn");
    editBtn.classList.add("save-btn");

    // Save function
    const saveEdit = () => {
      if (!input.parentElement) return;

      const newText = input.value.trim() || oldText; //it prevents the empty task also

      // Update task array
      const index = [...taskList.children].indexOf(task);
      tasks[index].text = newText;
      saveTasks();
      renderTasks();

      // // Create new span
      // const newSpan = document.createElement("span");
      // newSpan.classList.add("task-text");
      // newSpan.textContent = newText;

      // input.replaceWith(newSpan);

      // // change tick back to edit icon
      // editBtn.textContent = "✏";
      // editBtn.classList.remove("save-btn");
      // editBtn.classList.add("edit-btn");

      document.removeEventListener("click", handleOutsideClick);
    };

    //Cancel function
    const cancelEdit = () => {
      const newSpan = document.createElement("span");
      newSpan.classList.add("task-text");
      newSpan.textContent = oldText;

      input.replaceWith(newSpan);

      editBtn.textContent = "✏";
      editBtn.classList.remove("save-btn");
      editBtn.classList.add("edit-btn");

      document.removeEventListener("click", handleOutsideClick);
    };

    // Keyboard actions and ENTER - SAVE
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        saveEdit();
      }

      if (e.key === "Escape") cancelEdit();
    });

    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 120) + "px";
    });

    // Detect click outside task
    const handleOutsideClick = (e) => {
      if (!task.contains(e.target)) {
        saveEdit();
      }
    };

    //Save when clicking outside
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
  }

  // Save when tick button is clicked
  else if (e.target.classList.contains("save-btn")) {
    const task = e.target.closest(".task-item");

    const input = task.querySelector(".edit-input");

    if (!input) return;

    const index = [...taskList.children].indexOf(task);

    const newText = input.value.trim();

    // Prevent empty task
    if (newText === "") return;

    // Update tasks array
    tasks[index].text = newText;

    saveTasks();

    renderTasks();
  } else {
    // Create deleteTask() Logic using event delegation(a JavaScript technique that leverages event bubbling to handle events for multiple child elements with a single event listener attached to their common parent element) for delete
    // taskList.addEventListene:listen for clicks inside list  e.target:element that was clicked classList.contains:check if delete button   closest():find parent task
    if (e.target.classList.contains("delete-btn")) {
      const li = e.target.closest(".task-item");

      // taskList.children gets all the collection of li,
      // spread operator converts it to real array
      // .indexOf(li) finds the index of li in array and stores in index variable
      const index = [...taskList.children].indexOf(li);

      // removes index task from array and it is saved in localstorage and render function rebuildes entire task list
      tasks.splice(index, 1);

      saveTasks();
      renderTasks();
    }
  }
});
