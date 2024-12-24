import db from '../db.ts'
import {CreateONG} from './dto/ONGDtos.ts';

class ONGRepository {

    async save(createONG: CreateONG) {
        const contactTypes = await Promise.all(
            // TODO procurar necessidades
            // TODO procurar publico_alvo
            createONG.contatos.map(async (contato) => {
                const contactType = await db.tipoContato.findUnique({
                    where: {tipo: contato.tipo},
                });

                if (!contactType) {
                    throw new Error(`Tipo de contato '${contato.tipo}' não encontrado.`);
                }

                return {
                    tipo: contato.tipo,
                    id: contactType.id,
                };
            })
        );

        const ongContatos = createONG.contatos.map((contato) => {
            const contactType = contactTypes.find((type) => type.tipo === contato.tipo);
            return {
                tipoContatoId: contactType!.id,
                valor: contato.valor,
            };
        });

        return db.ong.create({
            data: {
                login: createONG.login,
                senha: createONG.senha,
                nome: createONG.nome,
                descricao: createONG.descricao,
                cnpj: createONG.cnpj,
                anoFundacao: createONG.anoFundacao,
                deficiente: createONG.deficiente,
                localizacao: createONG.localizacao,
                ongContato: {
                    create: ongContatos,
                },
            },
            include: {
                ongContato: {
                    include: {
                        tipoContato: true, // Inclui detalhes do tipo de contato, se necessário
                    },
                },
            },
        });
    }


    async findById(id: string) {
        return db.ong.findUnique({
            where: {
                id
            },
            include: {
                ongContato: {
                    include: {
                        tipoContato: true
                    },
                },
            },
        });
    }

    async existsByLogin(login: string): Promise<Boolean> {
        const exists = await db.ong.findFirst({
            where: {
                login: login
            }
        })
        return exists !== null;
    }

    async findAll() {
        return await db.ong.findMany({
                include: {
                    ongContato: {
                        include: {
                            tipoContato: true
                        },
                    },
                }
            }
        );
    }
}

export default new ONGRepository() 


