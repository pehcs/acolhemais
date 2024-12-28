import {Request, Response} from "express"
import ONGRepository from "../repositories/ONGRepository"
import basicError from "../utils/BasicError"
import CreateONG from "../repositories/dto/ONGCreateDto"
import ONGMapper from './mappers/ONGMapper';
import bcrypt from "bcrypt"
import ONGContactRepository from "../repositories/ONGContactRepository";

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
            console.error(error)
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

}
