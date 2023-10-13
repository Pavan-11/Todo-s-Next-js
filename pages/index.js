//pages/index.js


import classes from '../components/todo.module.css';
import React, { useState } from 'react';
import { MongoClient } from 'mongodb';
import Todo from '../components/todo';

function HomePage({ initialTodoData }) {
  const [todos, setTodos] = useState(initialTodoData);

  const addTaskHandler = async (enteredTaskData) => {
    

    try {
      const response = await fetch('/api/add-task', {
        method: 'POST',
        body: JSON.stringify(enteredTaskData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const data = await response.json();
      console.log(data);




      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: data.taskId, 
          task: enteredTaskData.task,
          status : data.status,
          status : enteredTaskData.status,
        },
      ]);
    } catch (error) {
      console.error(error);

    }
  };


  const deleteTaskHandler = async (taskId) => {
    try {
      const response = await fetch(`/api/delete-task?id=${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskId));
    } catch (error) {
      console.log(error);
    }
  }

  const togleStatusHandler = async (taskId) => {
    const updateTodos = todos.map((todo) => {
      if(todo.id === taskId){
        const updatedStatus = todo.status === 'incomplete' ? 'completed' : 'incomplete';
        return {...todo, status : updatedStatus};
      }
      return todo;
    });
    let updatedStatus;
    try {
      updatedStatus = updateTodos.find((todo) => todo.id === taskId).status;
      const response = await fetch(`/api/update-task?id=${taskId}`,{
        method: 'PUT',
        body : JSON.stringify({status : updatedStatus}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Failed to update task");
      }
      setTodos(updateTodos);
  }catch (error) {
      console.error(error);
    }
  }




  return (
    <div className={classes.todo}>
      <h1>TODO List</h1>
      <Todo onAddTask={addTaskHandler} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
            type='checkbox'
            checked = {todo.status === 'completed'}
            onChange={()=>togleStatusHandler(todo.id)} />
            {todo.task}
            <button onClick={() => deleteTaskHandler(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}





export async function getStaticProps() {
  

  const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');
  const db = client.db();
  const todosCollection = db.collection('todos');
  const todos = await todosCollection.find().toArray();
  client.close();

  const initialTodoData = todos.map((todo) => ({

    id: todo._id.toString(),
    task: todo.task,
    status : 'incomplete',///////
  }));

  const filteredInitialTodoData = initialTodoData.filter((todo) => todo.id !== undefined && todo.task !== undefined);

  return {
    props: {
      initialTodoData: filteredInitialTodoData,
    },
  };
}

export default HomePage;
