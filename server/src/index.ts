import express, { Response,Request } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import router from './routes/route';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('api/v1/',router)

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/',(req:Request,res:Response)=>{
  res.sendStatus(200).json({message: 'OK'});
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});