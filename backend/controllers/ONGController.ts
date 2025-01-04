import {Request, Response} from "express"
import ONGRepository from "../repositories/ONGRepository"
import basicError from "../utils/BasicError"
import CreateONG from "../repositories/dto/ONGCreateDto"
import ONGMapper from './mappers/ONGMapper';
import bcrypt from "bcrypt"
import ONGContactRepository from "../repositories/ONGContactRepository";
import {BUCKET_NAME, minioClient} from "../minio";

export default class ONGController {

    static async create(req: Request, res: Response): Promise<any> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.login)) {
            return res.status(400).json(basicError("O campo 'login' deve ser um email válido"));
        }
        try {
            const createONG: CreateONG = req.body
            const existsLogin = await ONGRepository.existsByLogin(createONG.login)
            if (existsLogin) {
                return res.status(400).json(basicError("Este email já esta em uso"))
            }
            createONG.senha = await bcrypt.hash(createONG.senha, 10)
            const savedOng = await ONGRepository.save(createONG)
            return res.status(201).json(
                ONGMapper.toCompleteResponse(savedOng)
            )
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar ONG, tente novamente mais tarde"));
        }
    }

    static async addContact(req: Request, res: Response): Promise<any> {
        try {
            const {id} = req.params;
            const contact = await ONGContactRepository.addContact(id, req.body)
            res.status(201).json(ONGMapper.toContactResponse(contact))
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar o contato da ONG, tente novamente mais tarde"));
        }
    }

    static async removeContact(req: Request, res: Response): Promise<any> {
        try {
            const {id} = req.params;
            await ONGContactRepository.removeContact(id)
            res.status(204).end()
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar remover o contato da ONG, tente novamente mais tarde"));
        }
    }

    static async findAll(_: Request, res: Response): Promise<any> {
        return res.status(200).json(
            ONGMapper.toCompleteResponseList(
                await ONGRepository.findAll()
            )
        )
    }

    static async findById(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const ong = await ONGRepository.findById(id);
            if (!ong) {
                return res.status(404).json(basicError("ONG não encontrada."));
            }
            return res.status(200).json(
                ONGMapper.toCompleteResponse(ong)
            );
        } catch (error) {
            return res.status(500).json(basicError("Erro ao buscar ONG"));
        }
    }

    static async saveLogo(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const ong = await ONGRepository.findById(id);
            if (!ong) {
                return res.status(404).json(basicError("ONG não encontrada."));
            }
            minioClient.putObject(BUCKET_NAME, `${id}-logo`, req.file.buffer, (err, etag) => {
                if (err) {
                    return res.status(500).json({message: 'Erro ao enviar o arquivo para o MinIO', error: err});
                }
            });
            return res.status(201).end();
        } catch (error) {
            return res.status(500).json(basicError("Erro ao buscar ONG"));
        }
    }

    static async getLogo(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const ong = await ONGRepository.findById(id);
            if (!ong) {
                return res.status(404).json(basicError("ONG não encontrada."));
            }
            minioClient.getObject(BUCKET_NAME, `${id}-logo`, (err, dataStream) => {
                if (err) {
                    return res.status(404).json({message: 'Arquivo não encontrado', error: err});
                }
                res.setHeader('Content-Type', 'image/png');
                dataStream.pipe(res);
            });
        } catch (error) {
            return res.status(500).json(basicError("Erro ao buscar ONG"));
        }
    }

    static async addImage(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const ong = await ONGRepository.findById(id);
            if (!ong) {
                return res.status(404).json(basicError("ONG não encontrada."));
            }
            const filename = crypto.randomUUID()
            minioClient.putObject(BUCKET_NAME, filename, req.file.buffer, async (err, etag) => {
                if (err) {
                    return res.status(500).json({message: 'Erro ao enviar o arquivo para o MinIO', error: err});
                }
                await ONGRepository.addImage(id, filename)
            });
            res.status(201).end();
        } catch (e) {
            return res.status(500).json(basicError(e));
        }
    }

    static async getImage(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const image = await ONGRepository.getImage(id);
            if (!image) {
                return res.status(404).json(basicError("Imagem não encontrada."));
            }
            minioClient.getObject(BUCKET_NAME, image.filename, (err, dataStream) => {
                if (err) {
                    return res.status(404).json({message: 'Arquivo não encontrado', error: err});
                }
                res.setHeader('Content-Type', 'image/png');
                dataStream.pipe(res);
            });
        } catch (e) {
            return res.status(500).json(basicError(e));
        }
    }

    static async removeImage(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
        try {
            const image = await ONGRepository.getImage(id);
            if (!image) {
                return res.status(404).json(basicError("Imagem não encontrada."));
            }
            minioClient.removeObject(BUCKET_NAME, image.filename, (err, _) => {
                if (err) {
                    return res.status(404).json({message: 'Arquivo não encontrado', error: err});
                }
            });
            await ONGRepository.deleteImage(id);
            return res.status(204).end();
        } catch (e) {
            return res.status(500).json(basicError(e));
        }
    }
}
