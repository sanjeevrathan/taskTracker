const fs = require('fs');
const path = './job.json';

if(!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
}

const loadTask = () => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
};

const saveTask = (tasks) => {
    fs.writeFileSync(path, JSON.stringify(tasks, null ,2))
};

const addTask = (description) => {
    const tasks = loadTask();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTask(tasks);
    console.log(`Task has been added successfully ID ${newTask.id}`);
};

const updateTask = (id, newDescription) => {
    const tasks = loadTask();
    const task = tasks.find(task => task.id === parseInt(id));
    if(task) {
        task.description = newDescription;
        task.updatedAt = new Date().toISOString();
        saveTask(tasks);
        console.log(`Task has been updated successfully ID ${id}`);
    } else {
        console.log(`Task with ID ${id} is not found`);
    }
};

const deleteTask = (id) => {
    const tasks = loadTask();
    const filterTask = tasks.filter(tasks.id !== parseInt(id));
    saveTask(filterTask);
    console.log(`Task with ID ${id} has been deleted successfully`);
}

const markInProgress = (id) => {
    const tasks = loadTask();
    const task = tasks.find(task => task.id === parseInt(id));
    if(task) {
        task.status = 'inProgress';
        task.updatedAt = new Date().toISOString();
        saveTask(tasks);
        console.log(`Task with ID ${id} has been marked in progress`);
    } else {
        console.log(`Task with ID ${id} is not found or updated`);
    }
};

const markAsDone = (id)=> {
    const tasks = loadTask();
    const task = tasks.find(task => task.id === parseInt(id));
    if(task) {
        task.status = 'done';
        task.updatedAt = new Date().toISOString();
        saveTask(tasks);
        console.log(`Task with ID ${id} has been marked as done`);
    } else {
        console.log(`Task with ID ${id} is not found`);
    }
};

const listTask = (filter = null) => {
    const tasks = loadTask();
    let filteredTask = tasks;
    if(filter) {
        filteredTask = tasks.filter(task => task && task.status === filter)
    }

    if(filteredTask.length === 0) {
        console.log(`No tasks is found`);
    } else {
        filteredTask.forEach(task => {
            console.log(`taskID : ${task.id}, description : ${task.description}, createdAt : ${task.createdAt}, updatedAt : ${task.updatedAt}`)
        })
    }
}

const args = process.argv.slice(2);

const command = args[0];

switch(command) {
    case 'add':
        addTask(args[1]);
        break;
    case 'updateTask':
        const ID = args[1];
        const description = args.slice(2).join(' ');
        updateTask(ID, description);
        break;
    case 'deleteTask':
        deleteTask(args[1]);
        break;
    case 'markInProgress':
        markInProgress(args[1]);
        break;
    case 'markAsDone':
        markAsDone(args[1]);
        break;
    case 'listTask':
        const filter = args[1];
        listTask(filter);
        break;
    default:
        console.log('Unknown command. Please use one of the following: add, update, delete, mark-in-progress, mark-done, listTask')
}