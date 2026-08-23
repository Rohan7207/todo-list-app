# 📝 To-Do List

A simple, responsive, and interactive **To-Do List web application** built using HTML, CSS, and JavaScript. The application allows users to create, edit, complete, filter, and delete tasks while automatically saving tasks in the browser using **Local Storage**.

## 🚀 Features

### ➕ Task Management

- Add new tasks
- Add tasks using the **Enter** key
- Edit existing tasks
- Save edited tasks
- Delete tasks
- Prevent empty tasks from being added
- Clear all completed tasks

### ✅ Task Completion

- Mark tasks as completed using a checkbox
- Toggle tasks between completed and active
- Completed tasks are visually styled differently
- Task count shows the number of remaining tasks

### 🔍 Task Filtering

- **All** – Shows all tasks
- **Active** – Shows only incomplete tasks
- **Completed** – Shows only completed tasks

### 💾 Local Storage

Tasks are automatically saved using the browser's **Local Storage API**.

This means tasks remain available even after:

- Refreshing the page
- Closing the browser
- Reopening the application

JavaScript's `JSON.stringify()` is used to convert the task array into a string before storing it, while `JSON.parse()` converts the stored data back into JavaScript objects when the application loads.

### ✏️ Editing Experience

- Edit tasks directly inside the task list
- Press **Enter** to save an edit
- Press **Shift + Enter** to create a new line
- Press **Escape** to cancel editing
- Clicking outside the task automatically saves the edit
- Textareas automatically resize according to their content

### 📱 Responsive Design

The interface is designed to work across different screen sizes, including desktop and mobile devices.

## 🛠️ Technologies Used

- **HTML5** – Structure of the application
- **CSS3** – Styling and responsive design
- **JavaScript (ES6+)** – Application logic and DOM manipulation
- **Local Storage API** – Persistent task storage

## 🧠 JavaScript Concepts Practiced

This project helped practice several important frontend concepts:

- DOM manipulation
- Event listeners
- Event delegation
- Event bubbling
- Arrays and objects
- Array methods such as `push()`, `filter()`, and `splice()`
- Template literals
- Conditional rendering
- `dataset`
- `JSON.stringify()`
- `JSON.parse()`
- Browser Local Storage
- Keyboard events
- Dynamic element creation
- Dynamic textarea resizing

## 📂 Project Structure

```text
To-Do-List/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### 2. Open the project

Navigate to the project folder.

### 3. Run the application

Open `index.html` in your browser.

No external dependencies or installation are required.

## 🎯 Project Goal

The main goal of this project was to build a practical frontend application while strengthening JavaScript fundamentals and understanding how real-world interactive web applications manage and persist user data.

## 🔮 Future Improvements

Some possible improvements for future versions:

- 🔎 Search tasks
- ⭐ Task priorities
- 📅 Due dates
- 🏷️ Task categories
- 🌙 Dark mode
- 🔔 Notifications or reminders
- 📊 Task statistics
- ↕️ Drag-and-drop task ordering
- ☁️ Backend/database synchronization

## 👨‍💻 Author

**Rohan Figredo**

Built as a frontend mini project to practice **HTML, CSS, JavaScript, DOM manipulation, and browser storage**.

## 📄 License

This project is open source and available for learning and educational purposes.
