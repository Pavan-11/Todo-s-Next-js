import { useState } from 'react';
import styles from './todo.module.css';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className={styles.todo}>
            <h1>Todo List</h1>
            <div className={styles.textarea}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? styles.completed : ''}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        <span>{task.text}</span>
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
