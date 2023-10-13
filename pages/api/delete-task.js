// pages/api/delete-task.js

import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const taskId = req.query.id;
        console.log("this is task id", taskId);

        // Connect to your MongoDB cluster
        try {
            const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');
            const db = client.db();
            const todosCollection = db.collection('todos');

            //fi task existing or not

            const existingTask = await todosCollection.findOne({ _id: new ObjectId(taskId) });
            if (!existingTask) {
                return res.status(404).json({ message: 'Task not found' })
            }

            // Delete the task from the 'todos' collection
            await todosCollection.deleteOne({ _id: new ObjectId(taskId) });

            // Close the MongoDB connection
            client.close();
            return res.status(200).json({ message: 'Task deleted successfully' });
        }catch(error){
            console.error(error);
            res.status(500).json({message : 'Internal Server Error'})
        }
    }
}
