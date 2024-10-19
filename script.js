// save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// get tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

let tasks = loadTasks();

function showMenu() {
  console.log(
    `%c \t  _________________________________________
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\tTask Manager Menu\t\t\t\t\t\t\t|
      |________________________________________ |
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t1. Add New Task\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t2. View All Tasks\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t3. Search Tasks By Name \t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t4. Toggle Task Completion\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t5. Edit Task\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t6. Delete Task\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t7. Exit\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t|
      |________________________________________ |\n\n`,
    "color:#008080; font-weight: bold; font-size: 14px"
  );

  const choice = parseInt(prompt("Please enter your choice 1-7:"));
  handleUserChoice(choice);
}

// The user can input a task description and add it to a list of tasks.
function addTask() {
  console.log(
    "%c \n\tAdding A Task In Progress...\n",
    "color:#DB7093; font-weight: bold; font-size: 14px"
  );
  const description = prompt("Enter the task description:");
  if (description) {
    const newTask = {
      id: tasks.length + 1,
      description: description,
      completed: false,
    };
    tasks.push(newTask);
    //localStorage.setItem("tasks", JSON.stringify(tasks));
    saveTasks();
    console.log(
      `%c \n\tTask Added: \t '${description}'.\n`,
      "color:#008000; font-weight: bold; font-size: 14px"
    );
    //console.log(tasks);
    const addAnotherTask = prompt("Do you wanna another task?");
    if (addAnotherTask === "yes") {
      addTask();
    }
  } else {
    console.log(
      "%c \n\tTask Description Can't Be Empty, Please Try Again.\n",
      "color:#DC143C; font-weight: bold; font-size: 14px"
    );
    addTask();
  }
  showMenu();
}

// Display all tasks with their respective IDs and statuses (whether they are completed or not).
function viewTasks(tasks) {
  console.log(
    "%c \n\tTasks\n",
    "color:#800080; font-weight: bold; font-size: 14px"
  );
  if (tasks.length) {
    tasks.map((task) => {
      console.log(
        `%c \t${task.id}\t\t\t${task.description}\t\t${
          task.completed ? "Completed" : "Not Completed"
        }\n`,
        "color:#808080; font-size: 14px"
      );
    });
  } else {
    console.log(
      "%c \n\tNo Tasks Found.\n",
      "color:#DC143C; font-weight: bold; font-size: 14px"
    );
  }
  showMenu();
}

// Allow users to search for tasks by name using filter or find methods.
function searchTaskByName(taskName) {
  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(taskName.toLowerCase())
  );
  viewTasks(filteredTasks);
}

// The user can select a task by its ID and toggle its completion status.
function toggleTaskCompletion(taskId) {
  console.log(
    "%c \n\tToggling Task Completion...\n",
    "color:#800080; font-weight: bold; font-size: 14px"
  );
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    console.log(
      `%c \n\t' ${task.description} '\t is now marked as ${
        task.completed ? "'Completed'" : "'Not Completed'"
      }.\n`,
      "color:#008000; font-weight: bold; font-size: 14px"
    );
  } else {
    console.log(
      "%c \n\tTask Not Found.\n",
      "color:#DC143C; font-weight: bold; font-size: 14px"
    );
  }
  showMenu();
}

// The user can update the description of an existing task.
function editTask(taskId, description) {
  console.log(
    "%c \n\tEditing A Task In Progress...\n",
    "color:#800080; font-weight: bold; font-size: 14px"
  );
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.description = description;
    saveTasks();
    console.log(
      `%c \n\tTask Updated:\t Task ' ${task.id} ' Updated To\t' ${task.description} '.\n`,
      "color:#008000; font-weight: bold; font-size: 14px"
    );
  } else {
    console.log(
      "%c \n\tTask Not Found.\n",
      "color:#DC143C; font-weight: bold; font-size: 14px"
    );
  }
  showMenu();
}

// The user can remove a task from the list.
function deleteTask(taskId) {
  console.log(
    "%c \n\tDeleting A Task In Progress...\n",
    "color:#800080; font-weight: bold; font-size: 14px"
  );
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex > -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    saveTasks();
    console.log(
      `%c \n\tTask Deleted:\t' ${deletedTask[0].description} '.\n`,
      "color:#008000; font-weight: bold; font-size: 14px"
    );
  } else {
    console.log(
      "%c \n\tTask Not Found.\n",
      "color:#DC143C; font-weight: bold; font-size: 14px"
    );
  }
  showMenu();
}

function handleUserChoice(choice) {
  switch (choice) {
    case 1:
      addTask();
      break;
    case 2:
      viewTasks(tasks);
      break;
    case 3:
      const taskName = prompt("Enter The Task Name To Search:");
      searchTaskByName(taskName);
      break;
    case 4:
      const taskIdToToggle = parseInt(
        prompt("Enter The Task ID To Toggle Completion:")
      );
      toggleTaskCompletion(taskIdToToggle);
      break;
    case 5:
      const taskIdToEdit = parseInt(prompt("Enter The Task ID To Edit:"));
      const newDescription = prompt("Enter The New Description:");
      editTask(taskIdToEdit, newDescription);
      break;
    case 6:
      const taskIdToDelete = parseInt(prompt("Enter The Task ID To Delete:"));
      deleteTask(taskIdToDelete);
      break;
    case 7:
      console.log(
        "%c \n\tExiting the Task Manager.\n",
        "color:#1E90FF; font-weight: bold; font-size: 14px"
      );
      return;
    default:
      console.log(
        "%c \n\tInvalid choice. Please try again.\n",
        "color:#DC143C; font-weight: bold; font-size: 14px"
      );
      showMenu();
  }
}

showMenu();
