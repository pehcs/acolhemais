import {Request, Response} from "express"
import basicError from "../utils/BasicError"
import ONGAcaoCreateRequest from "../repositories/dto/ONGAcaoCreateDto";
import ONGAcaoRepository from "../repositories/ONGAcaoRepository";
import ONGMapper from "./mappers/ONGMapper";

export default class ONGAcaoController {

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const createAcao: ONGAcaoCreateRequest = req.body
            const {id} = req.params
            createAcao.ondId = id
            return res.status(201).json(
                ONGMapper.toCompleteAcaoResponse(
                    ONGAcaoRepository.save(createAcao),
                )
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json(basicError("Erro ao tentar salvar ação, tente novamente mais tarde"));
        }
    }

}
