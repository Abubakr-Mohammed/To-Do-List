const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter"); // Rename this to match the rest of the code

// This function checks if the user entered anything into inputBox
// and retrieves the text, trims it, and stores it into the task var
// else it shows a pop-up dialog due to alert func for an empty task
function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
    <label>
        <input type="checkbox">
        <span>${task}</span>
    </label>
    <div class="task-options">
        <button class="dots-button">••</button>
        <div class="dropdown-menu">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    </div>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";

    // Variables added to make it easy to interact with the new list item
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");
    const dotsButton = li.querySelector(".dots-button");
    const dropdownMenu = li.querySelector(".dropdown-menu");

    // The method allows adding completed tasks to the new list
    // if the task is checked, else it will not.
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Event listener for the edit button, changes task when the prompt
    // shows up and removes the completed status, unchecks the box
    editBtn.addEventListener("click", function(){
        const update = prompt("Edit Task:", taskSpan.textContent);
        if(update != null){
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Function for updating counters initialized from the HTML file 
    // class Complete/Uncomplete
    function updateCounters(){
        const compTasks = document.querySelectorAll(".completed").length;
        const uncomTasks = document.querySelectorAll("li:not(.completed)").length;

        completedCounter.textContent = compTasks;
        uncompletedCounter.textContent = uncomTasks;
    }

    //Toggle dropdown menu
    dotsButton.addEventListener("click", function(){
        dropdownMenu.classList.toggle("show");
    });
    
    // Delete tasks using event listeners
    deleteBtn.addEventListener("click", function(){
        if(confirm("Are you sure you want to delete this task?")){
            li.remove();
            updateCounters();
        }
    });
    updateCounters();
}
//add task by pressing Enter key 
inputBox.addEventListener("keyup", function (event){
    if(event.key === "Enter"){
        addTask();
    }
});
