import db from '../db.ts'
import CreateONG from "./dto/ONGCreateDto";

class ONGRepository {

    async save(createONG: CreateONG) {
        await Promise.all([
            Promise.all(
                createONG.necessidades.map(n =>
                    db.necessidade.findFirstOrThrow({
                        where: {tipo: n}
                    })
                )
            ),
            Promise.all(
                createONG.publico_alvo.map(pa =>
                    db.publicoAlvo.findFirstOrThrow({
                        where: {tipo: pa}
                    })
                )
            )
        ]);
        return db.ong.create({
            data: {
                login: createONG.login,
                senha: createONG.senha,
                descricao: "Não há descrição",
                nome: createONG.nome,
                cnpj: createONG.cnpj,
                data_criacao: createONG.data_criacao,
                lat: createONG.localizacao[0],
                lon: createONG.localizacao[1],
                ongNecessidade: {
                    create: createONG.necessidades.map(n => ({
                        necessidade: {
                            connectOrCreate: {
                                where: {
                                    tipo: n
                                }
                                ,
                                create: {
                                    tipo: n
                                }
                            }
                        },
                    }))
                },
                ongPublicoAlvo: {
                    create: createONG.publico_alvo.map(p => ({
                        publicoAlvo: {
                            connectOrCreate: {
                                where: {
                                    tipo: p
                                },
                                create: {
                                    tipo: p
                                }
                            }
                        }
                    }))
                },
            },
            include: {
                ongNecessidade: {
                    include: {
                        necessidade: true
                    },
                },
                ongPublicoAlvo: {
                    include: {
                        publicoAlvo: true
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
                ongNecessidade: {
                    include: {
                        necessidade: true
                    }
                },
                ongPublicoAlvo: {
                    include: {
                        publicoAlvo: true
                    }
                },
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
        return db.ong.findMany({
                include: {
                    ongNecessidade: {
                        include: {
                            necessidade: true
                        }
                    },
                    ongPublicoAlvo: {
                        include: {
                            publicoAlvo: true
                        }
                    },
                    ongContato: {
                        include: {
                            tipoContato: true
                        },
                    },
                },
            }
        );
    }
}

export default new ONGRepository() 


