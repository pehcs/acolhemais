export type CreateONG = {
    login: string;
    senha: string;
    nome: string;
    descricao: string;
    cnpj?: string; 
    anoFundacao: Date;
    deficiente: Boolean;
    localizacao: string;
    contatos: AddContact[];
}

export type AddContact = {
    tipo: "EMAIL" | "TELEFONE";
    valor: string;
}