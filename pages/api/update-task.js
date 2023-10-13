// pages/api/update-task.js

import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const taskId = req.query.id;

        try {
            // Connect to your MongoDB cluster using the connection string
            const client = await MongoClient.connect('mongodb+srv://pavan-kumar:Pavan365@cluster0.z02fqin.mongodb.net/todos?retryWrites=true&w=majority');
            const db = client.db();
            const todosCollection = db.collection('todos');



            // Update the status of the task to 'completed'
            const updatedStatus = 'completed';
            await todosCollection.updateOne({ _id: new ObjectId(taskId) }, { $set: { status: updatedStatus } });

            // Close the MongoDB connection
            client.close();

            res.status(200).json({ message: 'Task updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
