$(document).ready(onReady);

// on document load
function onReady(){

    // setup click listeners

    // call get
    getTasks();
}

// CLICK listeners


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

// POST TASKS


// PUT TASKS


// DELETE TASKS


