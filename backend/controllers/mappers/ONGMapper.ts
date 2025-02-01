import {Contact, ONGCompleteResponse} from "../dtos/ONGResponseDtos"

export default class ONGMapper {

    static toCompleteResponse(ong): ONGCompleteResponse {
        return {
            id: ong.id,
            login: ong.login,
            nome: ong.nome,
            descricao: ong.descricao,
            cnpj: ong.cnpj,
            data_criacao: ong.data_criacao,
            localizacao: {
                latitude: ong.lat,
                longitude: ong.lon,
            },
            necessidades: ong?.ongNecessidade?.map(ongNecessidade => (
                {
                    id: ongNecessidade.id,
                    tipo: ongNecessidade.necessidade.tipo
                }
            )) || [],
            images: ong?.ongImage?.map(image =>
                image.id,
            ) || [],
            publico_alvo: ong?.ongPublicoAlvo?.map(ongPublicoAlvo => (
                {
                    id: ongPublicoAlvo.id,
                    tipo: ongPublicoAlvo.publicoAlvo.tipo
                }
            )) || [],
            contatos: ong?.ongContato?.map(contato => {
                return ONGMapper.toContactResponse(contato)
            }) || []
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
