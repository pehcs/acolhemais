import { Contact, ONGCompleteResponse } from "../dtos/ONGResponseDtos"

export default class ONGMapper {

    static toCompleteResponse(ong): ONGCompleteResponse {
        return {
            id: ong.id,
            login: ong.login,
            nome: ong.nome,
            descricao: ong.descricao,
            cnpj: ong.cnpj, 
            localizacao: ong.localizacao,
            contatos: ong?.ongContato.map(contato => {
                return ONGMapper.toContactResponse(contato)       
            })
        }
    }
    static toCompleteResponseList(ong): ONGCompleteResponse[] {
        return ong.map(o => this.toCompleteResponse(o)
        ) 
    }

    static toContactResponse(contato): Contact {
        return { 
            id: contato.id,
            tipo: contato.tipoContato.tipo,
            valor: contato.valor
        }
    }
}
