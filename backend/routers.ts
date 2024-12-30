import {Router} from "express";
import ONGController from "./controllers/ONGController";
import multer from "multer";

const upload = multer();
const router = Router()

router.post("/v1/ong", ONGController.create)
router.get("/v1/ong", ONGController.findAll)
router.get('/v1/ong/:id', ONGController.findById);
router.post('/v1/ong/:id/contact', ONGController.addContact);
router.delete('/v1/ong/contact/:id', ONGController.removeContact);

router.post('/v1/ong/:id/logo', upload.single('logo'), ONGController.saveLogo);
router.get('/v1/ong/:id/logo', ONGController.getLogo);

router.post('/v1/ong/:id/image', upload.single('picture'), ONGController.addImage);
router.get('/v1/ong-image/:id', ONGController.getImage);

export default router
