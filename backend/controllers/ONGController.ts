import { Request, Response } from "express"
import ONGRepository from "../repositories/ONGRepository"
import basicError from "../utils/BasicError"
import bcrypt from 'bcrypt';
import { CreateONG } from "../repositories/dto/ONGDtos"
import ONGMapper from './mappers/ONGMapper';

export default class ONGController {

    static async create(req: Request, res: Response): Promise<any> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.login)) {
            return res.status(400).json(basicError("O campo 'login' deve ser um email válido"));
        }
        try {
            const existsLogin = await ONGRepository.existsByLogin(req.body.login)
            if (existsLogin) {
                return res.status(400).json(basicError("Este email já esta em uso"))
            }
            const createONG: CreateONG = req.body
            createONG.senha = await bcrypt.hash(createONG.senha, 10)
            const savedOng = await ONGRepository.save(req.body)
            return res.status(201).json(
                ONGMapper.toCompleteResponse(savedOng)
            )
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar ONG, tente novamente mais tarde"));
        }
        
    }

    static async findAll(req: Request, res: Response): Promise<any> {
        return res.status(200).json(
            ONGMapper.toCompleteResponseList(
                await ONGRepository.findAll()
            )
        )
    }

    static async findById(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
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
