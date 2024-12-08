export type CreateBeneficiario = {
    upn: string;
    senha: string;
    generos_id?: number;
    racas_id?: number;
    sexualidades_id?: number;
    nome?: string;
    endereco?: string;
    observacao?: string;
};