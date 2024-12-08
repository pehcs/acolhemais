import { Request, Response } from "express";
import BeneficiarioRepository from "../repositories/BeneficiarioRepository";
import basicError from "../utils/BasicError";
import bcrypt from 'bcrypt';
import { CreateBeneficiario } from "../repositories/dto/BeneficiarioDtos";
import BeneficiarioMapper from './mappers/BeneficiarioMapper';

export default class BeneficiarioController {
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const createBeneficiario: CreateBeneficiario = req.body;
            createBeneficiario.senha = await bcrypt.hash(createBeneficiario.senha, 10);
            const savedBeneficiario = await BeneficiarioRepository.save(createBeneficiario);
            return res.status(201).json(BeneficiarioMapper.toCompleteResponse(savedBeneficiario));
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar Beneficiario, tente novamente mais tarde"));
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const updateData = req.body;
        try {
            const beneficiario = await BeneficiarioRepository.findById(id);
            if (!beneficiario) {
                return res.status(404).json(basicError("Beneficiario não encontrado"));
            }
            const updatedBeneficiario = await BeneficiarioRepository.update(id, updateData);
            return res.status(200).json(BeneficiarioMapper.toCompleteResponse(updatedBeneficiario));
        } catch (error) {
            return res.status(500).json(basicError("Erro ao atualizar Beneficiario"));
        }
    }
}