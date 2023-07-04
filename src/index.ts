import express from 'express';
import cinemaRoutes from './routes/cinema';
import { connectToDatabase } from './db';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', cinemaRoutes);
app.route('*').all((_, res) => {
  return res.send('Welcome to Cinema API')
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server after connecting to the database
connectToDatabase()
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
