import { beneficiarios_locais } from "@prisma/client";

export default class BeneficiarioMapper {
    static toCompleteResponse(beneficiario: beneficiarios_locais) {
        return {
            id: beneficiario.id,
            upn: beneficiario.upn,
            nome: beneficiario.nome,
            endereco: beneficiario.endereco,
            observacao: beneficiario.observacao,
            generos_id: beneficiario.generos_id,
            racas_id: beneficiario.racas_id,
            sexualidades_id: beneficiario.sexualidades_id,
            created_at: beneficiario.created_at,
            updated_at: beneficiario.updated_at,
        };
    }
}