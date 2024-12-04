import { Router } from "express";
import ONGController from "./controllers/ONGController";

const router = Router();

router.post("/v1/ong", ONGController.create);
router.get("/v1/ong", ONGController.findAll);
router.get('/v1/ong/:id', ONGController.findById);
router.post('/v1/ong/:id/contact', ONGController.addContact);
router.put('/v1/ong/:id', ONGController.update);
router.delete('/v1/ong/contact/:id', ONGController.removeContact);
router.patch('/v1/ong/:id/login', ONGController.updateLogin);
router.patch('/v1/ong/:id/senha', ONGController.updateSenha);
router.patch('/v1/ong/:id/nome', ONGController.updateNome);
router.patch('/v1/ong/:id/descricao', ONGController.updateDescricao);
router.patch('/v1/ong/:id/cnpj', ONGController.updateCnpj);
router.patch('/v1/ong/:id/localizacao', ONGController.updateLocalizacao);

export default router;