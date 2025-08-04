//Import necessary modules
import express, { Request, Response} from 'express';
import { createConnection } from '../src/config/config';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;

//Initialize the express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Define a simple route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

//Start the server
createConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT} `));
  })
  .catch((err) => {
    console.error("❌ App startup failed due to DB issue:", err);
    process.exit(1);
  });

