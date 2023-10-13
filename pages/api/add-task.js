// pages/api/add-task.js
import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // Connect to your MongoDB cluster
        const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');
        const db = client.db();
        const todosCollection = db.collection('todos');

        // Insert the new task into the 'todos' collection
        const result = await todosCollection.insertOne(data);
        console.log(data);

        // Close the MongoDB connection
        client.close();
        res.status(201).json({ message: 'Task added successfully' });
    }
}
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');

    const db = client.db();

    const todosCollection = db.collection('todos');

    const todos = await todosCollection.find({}, { _id: 1 }).toArray();


    client.close()
    return {
        fallback: 'blocking',
        paths: todos.map(todo => ({ params: { todoid: todo._id.toString() }, })),

    };
}

export async function getStaticProps(context) {
    const todoID = context.params.todoID;
    // You can fetch initial TODO data from your MongoDB database here
    // Customize this logic to match your database structure and data fetching

    const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');
    const db = client.db();
    const todosCollection = db.collection('todos');
    const selectedtodos = await todosCollection.find({ _id: ObjectId(todoID), });
    client.close();

    const initialTodoData = selectedtodos.map((todo) => ({

        id: todo._id.toString(),
        task: todo.task,
    }));

    const filteredInitialTodoData = initialTodoData.filter((todo) => todo.id !== undefined && todo.task !== undefined);

    return {
        props: {
            initialTodoData: filteredInitialTodoData,
        },
    };
}

