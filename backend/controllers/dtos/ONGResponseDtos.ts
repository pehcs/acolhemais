export type ONGCompleteResponse = {
    id: string;
    login: string;
    nome: string;
    descricao: string;
    cnpj?: string;
    data_criacao: number;
    localizacao: Coordinates;
    necessidades: Necessidades[];
    publico_alvo: PublicoAlvo[];
    contatos: Contact[]
}
export type Coordinates = { latitude: number, longitude: number };
export type Necessidades = { id: string, tipo: string };
export type PublicoAlvo = { id: string, tipo: string };

export type Contact = {
    id: string;
    tipo: "EMAIL" | "TELEFONE";
    valor: string;
}