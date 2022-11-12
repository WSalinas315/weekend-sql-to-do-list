$(document).ready(onReady);

// on document load
function onReady(){
    // setup click listeners
    setupListeners();
    // call get
    getTasks();
}

// CLICK listeners function
function setupListeners(){
    $('#tasksTableBody').on('click', '.complete-btn', markComplete);
    $('#tasksTableBody').on('click', '.delete-btn', deleteTask);
    $('#addContainer').on('click', '.add-btn', setupSubmit);
    $('#addContainer').on('click', '.submit-btn', addTask);
}

// GET function to retrieve tasks
function getTasks(){
    console.log('in getTasks client function');
	// ajax call to server to get koalas
	$.ajax({
		method: 'GET',
		url: '/tasks',
	}).then(function (response) {
		console.log(response);
        // call render function
		renderTasks(response);
	}).catch(function (error) {
		console.log('Error in GET:', error);
	});
}

// RENDER TO DOM
function renderTasks(taskList){
    //empty table on DOM
    $('#tasksTableBody').empty();
    // write DB data to DOM
    for(let i=0; i<taskList.length; i++){
        let task = taskList[i];
        $('#tasksTableBody').append(`
            <tr class="${task.complete == 'TRUE' ? 'complete' : 'incomplete'}">
                <td>${task.taskName}</td>
                <td>${task.taskDetails}</td>
                <td>${task.complete}</td>
                <td>${task.compDate}</td>
                <td><button class="complete-btn" data-id="${task.id}">Mark Complete</button></td>
                <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
        `);
    }
}

// Setup add task space
function setupSubmit(){
    $('#addContainer').empty();
    $('#addContainer').append(`
        <h2>Add Task</h2><br />
        <input type="text" id="nameInput" value="" placeholder="Task Name">
        <input type="text" id="detailsInput" value="" placeholder="Details">
        <button class="submit-btn">Submit Task</button>
    `);
}

// POST TASKS


// PUT TASKS


// DELETE TASKS


