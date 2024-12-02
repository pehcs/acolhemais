import { Router } from "express";
import ONGController from "./controllers/ONGController";

const router = Router()

router.post("/v1/ong", ONGController.create)
router.get("/v1/ong", ONGController.findAll)
router.get('/v1/ong/:id', ONGController.findById);
router.post('/v1/ong/:id/contact', ONGController.addContact);
router.delete('/v1/ong/contact/:id', ONGController.removeContact);

export default router