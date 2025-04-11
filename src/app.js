import { connDB } from './config/mongo.js';
import cookieParser from 'cookie-parser';

import express from 'express';
import { sessionRouter } from './routes/sessions.router.js';
import passport from 'passport';
const PORT=3000;

const app=express();
// Verificar si las variables de entorno están cargadas
console.log("MONGO_URL cargado:", !!process.env.MONGO_URL);
console.log("DB_NAME cargado:", !!process.env.DB_NAME);
connDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(passport.initialize());




app.get('/',(req,res)=>{
  res.setHeader('Content-Type','text/plain');
  res.status(200).send('OK');
})

//Routes
app.use('/api/sessions',sessionRouter);




const server=app.listen(PORT,()=>{
  console.log(`Server escuchando en puerto ${PORT}`);
});

