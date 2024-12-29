import {Coordinates} from "@/components/ui/map/map.tsx";

export type Necessidade = {
    id: string;
    tipo: string;
};

export type PublicoAlvo = {
    id: string;
    tipo: string;
};

export type Ong = {
    id: string;
    login: string;
    nome: string;
    descricao: string;
    cnpj: string;
    data_criacao: number;
    localizacao: Coordinates;
    necessidades: Necessidade[];
    publico_alvo: PublicoAlvo[];
    contatos: any[]; // Substitua 'any[]' pelo tipo correto quando conhecido
};
