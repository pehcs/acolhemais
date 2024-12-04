import { Request, Response } from "express";
import ONGRepository from "../repositories/ONGRepository";
import basicError from "../utils/BasicError";
import bcrypt from 'bcrypt';
import { CreateONG } from "../repositories/dto/ONGDtos";
import ONGMapper from './mappers/ONGMapper';
import ONGContactRepository from "../repositories/ONGContactRepository";

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
            console.log(savedOng)
            return res.status(201).json(
                ONGMapper.toCompleteResponse(savedOng)
            )
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar ONG, tente novamente mais tarde"));
        }
    }

    static async addContact(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const contact = await ONGContactRepository.addContact(id, req.body)
            res.status(201).json(ONGMapper.toContactResponse(contact))
        } catch (error) {
            return res.status(500).json(basicError("Erro ao tentar salvar o contato da ONG, tente novamente mais tarde"));
        }
    }

    static async removeContact(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
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

    static async update(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const updateData = req.body;
        
        try {

            const ong = await ONGRepository.findById(id);
            if (!ong) {
                return res.status(404).json(basicError("ONG não encontrada"));
            }

            if (updateData.contatos) {
                const contactTypes = ['EMAIL', 'TELEFONE'];
                const invalidContacts = updateData.contatos.filter(
                    contact => !contactTypes.includes(contact.tipo)
                );

                if (invalidContacts.length > 0) {
                    return res.status(400).json(basicError(
                        `Tipos de contato inválidos: ${invalidContacts.map(c => c.tipo).join(', ')}`
                    ));
                }
            }

            if (updateData.senha) {
                updateData.senha = await bcrypt.hash(updateData.senha, 10);
            }

            const updatedOng = await ONGRepository.update(id, updateData);
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update error:', error);
            return res.status(500).json(basicError("Erro ao atualizar ONG"));
        }
    }

    static async updateLogin(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { login } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(login)) {
            return res.status(400).json(basicError("O campo 'login' deve ser um email válido"));
        }

        try {
            const updatedOng = await ONGRepository.updateLogin(id, login);
            if (!updatedOng) {
                return res.status(404).json(basicError("ONG não encontrada."));
            }
            console.log('Updated ONG:', updatedOng);
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update login error:', error);
            if (error.message === "Este email já está em uso") {
                return res.status(400).json(basicError("Este email já está em uso."));
            }
            return res.status(500).json(basicError("Erro ao atualizar login"));
        }
    }

    static async updateSenha(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { senha } = req.body;

        try {
            const hashedSenha = await bcrypt.hash(senha, 10);
            const updatedOng = await ONGRepository.update(id, { senha: hashedSenha });
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update senha error:', error);
            return res.status(500).json(basicError("Erro ao atualizar senha"));
        }
    }

    static async updateNome(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { nome } = req.body;

        try {
            const updatedOng = await ONGRepository.update(id, { nome });
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update nome error:', error);
            return res.status(500).json(basicError("Erro ao atualizar nome"));
        }
    }

    static async updateDescricao(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { descricao } = req.body;

        try {
            const updatedOng = await ONGRepository.update(id, { descricao });
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update descricao error:', error);
            return res.status(500).json(basicError("Erro ao atualizar descricao"));
        }
    }

    static async updateCnpj(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { cnpj } = req.body;

        try {
            const updatedOng = await ONGRepository.update(id, { cnpj });
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update cnpj error:', error);
            return res.status(500).json(basicError("Erro ao atualizar cnpj"));
        }
    }

    static async updateLocalizacao(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const { localizacao } = req.body;

        try {
            const updatedOng = await ONGRepository.update(id, { localizacao });
            return res.status(200).json(ONGMapper.toCompleteResponse(updatedOng));
        } catch (error) {
            console.error('Update localizacao error:', error);
            return res.status(500).json(basicError("Erro ao atualizar localizacao"));
        }
    }
}