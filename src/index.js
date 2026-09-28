import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import app from './app.js';

dotenv.config();

;async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: DB_NAME,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;

connectToDatabase();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});