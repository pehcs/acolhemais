import db from "../db";
import ONGAcaoCreateRequest from "./dto/ONGAcaoCreateDto";

class ONGRepository {

    async save(ongAcaoCreateRequest: ONGAcaoCreateRequest) {
        return db.acao.create({
            data: {
                nome: ongAcaoCreateRequest.nome,
                dia: ongAcaoCreateRequest.dia,
                mes: ongAcaoCreateRequest.mes,
                ano: ongAcaoCreateRequest.ano,
                inicio: ongAcaoCreateRequest.inicio,
                termino: ongAcaoCreateRequest.termino,
                cep: ongAcaoCreateRequest.cep,
                bairro: ongAcaoCreateRequest.bairro,
                endereco: ongAcaoCreateRequest.endereco,
                numero: ongAcaoCreateRequest.numero,
                complemento: ongAcaoCreateRequest.complemento,
                ong: {
                    connect: {
                        id: ongAcaoCreateRequest.ondId
                    },
                },
            },
        });
    }

}

export default new ONGRepository() 


