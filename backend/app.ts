import express from 'express'
import router from './routers'
import BeneficiarioRoutes from "./routes/BeneficiarioRoutes";

const app = express()
app.use(express.json())
app.use(router)
app.use("/api", BeneficiarioRoutes);

export default app