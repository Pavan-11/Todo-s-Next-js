//components/todo.js
import classes from './todo.module.css';

import React, { useState } from 'react';

function Todo({ onAddTask , onDeleteTask}) {
    const [task, setTask] = useState('');

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleAddTask = () => {
        if (task.trim() === '') {
            return; // Do not add empty tasks
        }

        onAddTask({ task, status : 'incomplete' });////
        setTask('');
    };

    

    return (
        <div className={classes.textarea}>
            <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                placeholder="Enter a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default Todo;
