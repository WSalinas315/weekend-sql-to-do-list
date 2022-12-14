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
    $('#filterToggle').on('click', '#filter-btn', filterTasks);
}

// GET function to retrieve tasks
function getTasks(){
    console.log('in getTasks client function');
	// ajax call to server to get koalas
	$.ajax({
		method: 'GET',
		url: '/tasks'
	}).then(function (response) {
        console.log('Successful GET');
        // call render function
		renderTasks(response);
	}).catch(function (error) {
		console.log('Error in GET:', error);
	});
}

// GET function that filters based on user selection
function filterTasks(){
    console.log('In filterTasks function');
    let filterVal = $('#filterInput').val();
    console.log(filterVal);
    if(filterVal == 'nofilter'){
        getTasks();
        return;
    }
    $.ajax({
        method: 'GET',
        url: `/tasks/${filterVal}`
    }).then(function (response) {
        console.log('Successful GET');
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
        //console.log(task.taskName, 'class is', task.complete);
        $('#tasksTableBody').append(`
            <tr class="${task.complete == true ? 'complete' : 'incomplete'}">
                <td>${task.taskName}</td>
                <td class="normal-weight">${task.taskDetails}</td>
                <td>${task.complete == true ? 'Complete' : 'Incomplete'}</td>
                <td><button class="btn complete-btn btn-success" data-id="${task.id}" ${task.complete == true ? 'disabled' : ''}>Mark Complete</button></td>
                <td><button class="btn delete-btn btn-danger" data-id="${task.id}">Delete</button></td>
        `);
    }
}

// Setup add task space
function setupSubmit(){
    console.log('In setupSubmit function.');
    $('#addContainer').empty();
    $('#addContainer').append(`
        <h3>Add Task</h3>
        <input type="text" id="nameInput" value="" placeholder="Task Name">
        <input type="text" id="detailsInput" value="" placeholder="Details">
        <button type="button" class="btn submit-btn btn-success">Submit Task</button>
    `);
}

// Return addContainer div to default state
function setToDefault(){
    console.log('In setToDefault function');
    $('#addContainer').empty();
    $('#addContainer').append(`
        <button type="button" class="btn add-btn btn-success">Add Task</button>
    `);
}

// POST function to add tasks
function addTask(){
    console.log('Attempting to add a task...');
    if($('#nameInput').val() == ''){
        alert('Task name cannot be empty. Please give your task a name and try again.');
        return;
    } else if($('#detailsInput').val() == ''){
        alert('Task details cannot be empty. Please give your task some detail and try again.');
        return;
    }
    let newTask = {
        taskName: $('#nameInput').val(),
        taskDetails: $('#detailsInput').val(),
        complete: false,
    };
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then(function(response){
        console.log('Successful POST');
        setToDefault();
        getTasks();
    }).catch(function(error){
        alert('addTasks function has failed to POST to DB. Error:', error);
    });
}

// PUT function to modify tasks
function markComplete(){
    const id = $(this).data("id");
    console.log('In markComplete function with task id#', id);
    $.ajax({
        method: 'PUT',
        url: `/tasks/${id}`
    }).then(function(){
        console.log(`Updated task with id ${id} to complete.`);
        getTasks();
    }).catch(function(error){
        alert('markComplete function failure with error:', error);
    });
}

// DELETE function to remove tasks from the database
function deleteTask(){
    const id = $(this).data("id");
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then(function(response){
        console.log(`Task with id ${id} has been deleted.`);
        getTasks();
    }).catch(function(error){
        alert('deleteTask function failure with error:', error);
    });
}

