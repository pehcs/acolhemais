export type ONGCompleteResponse = {
    id: string;
    login: string;
    nome: string;
    descricao: string;
    cnpj?: string; 
    anoFundacao: Date;
    deficiente: Boolean;
    localizacao: string;
    contatos: Contact[]
}

export type Contact = {
    id: string;
    tipo: "EMAIL" | "TELEFONE";
    valor: string;
}