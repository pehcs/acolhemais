import express from 'express'
import cors from 'cors';
import router from './routers'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json())
app.use(router)

export default app