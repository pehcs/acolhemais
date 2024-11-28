import { ONGCompleteResponse } from "../dtos/ONGResponseDtos"

export default class ONGMapper {

    static toCompleteResponse(ong): ONGCompleteResponse {
        return {
            id: ong.id,
            login: ong.login,
            nome: ong.nome,
            descricao: ong.descricao,
            cnpj: ong.cnpj, 
            localizacao: ong.localizacao
        }
    }
    static toCompleteResponseList(ong): ONGCompleteResponse[] {
        return ong.map(o => ({
            id: o.id,
            login: o.login,
            nome: o.nome,
            descricao: o.descricao,
            cnpj: o.cnpj, 
            localizacao: o.localizacao
        })
        ) 
    }
}
