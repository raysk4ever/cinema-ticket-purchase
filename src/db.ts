import mongoose from 'mongoose';

export function connectToDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    mongoose
      .connect('mongodb://localhost/cinema-ticket-platform')
      .then(() => {
        console.log('Connected to MongoDB');
        resolve();
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        reject(error);
      });
  });
}
