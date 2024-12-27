type CreateONG = {
    login: string;
    senha: string;
    nome: string;
    descricao: string;
    cnpj: string;
    data_criacao: number;
    localizacao: number[];
    publico_alvo: string[],
    necessidades: string[],
}

export default CreateONG;