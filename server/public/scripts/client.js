$(document).ready(onReady);

// on document load
function onReady(){

    // setup click listeners

    // call get
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
		renderTasks(response);
	}).catch(function (error) {
		console.log('Error in GET:', error);
	});
}

// RENDER TO DOM


// POST TASKS


// PUT TASKS


// DELETE TASKS


