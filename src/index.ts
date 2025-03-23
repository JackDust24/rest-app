import express from 'express';
import ProfileRoutes from './routes/profileRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', ProfileRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
