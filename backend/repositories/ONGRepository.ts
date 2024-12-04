import db from '../db.ts'
import { CreateONG } from './dto/ONGDtos.ts';

class ONGRepository {
    
    async save(createONG: CreateONG) {
        const contactTypes = await Promise.all(
            createONG.contatos.map(async (contato) => {
                const contactType = await db.tipoContato.findUnique({
                    where: { tipo: contato.tipo },
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
    
        return await db.ong.create({
            data: {
                login: createONG.login,
                senha: createONG.senha,
                nome: createONG.nome,
                descricao: createONG.descricao,
                cnpj: createONG.cnpj,
                localizacao: createONG.localizacao,
                ongContato: {
                    create: ongContatos,
                },
            },
            include: {
                ongContato: {
                    include: {
                        tipoContato: true,
                    },
                },
            },
        });
    }
    

    async findById(id: string) {
        return await db.ong.findUnique({
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
        const exists =  await db.ong.findFirst({
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
        }}
        ); 
    }

    async update(id: string, updateData: Partial<CreateONG>) {
        try {
            const { contatos, ...data } = updateData;
            
            if (contatos) {
               
                await db.ongContato.deleteMany({
                    where: { ongId: id }
                });

             
                const contactPromises = contatos.map(async (contato) => {
                    const contactType = await db.tipoContato.findUnique({
                        where: { tipo: contato.tipo }
                    });

                    if (!contactType) {
                        throw new Error(`Tipo de contato '${contato.tipo}' não encontrado`);
                    }

                    return {
                        tipoContatoId: contactType.id,
                        valor: contato.valor,
                        ongId: id
                    };
                });

                const contacts = await Promise.all(contactPromises);
                await db.ongContato.createMany({
                    data: contacts
                });
            }

            return await db.ong.update({
                where: { id },
                data,
                include: {
                    ongContato: {
                        include: {
                            tipoContato: true
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Repository update error:', error);
            throw error;
        }
    }

    async updateLogin(id: string, newLogin: string) {
        try {
            const exists = await this.existsByLogin(newLogin);
            if (exists) {
                throw new Error("Este email já está em uso");
            }

            const updatedOng = await db.ong.update({
                where: { id },
                data: { login: newLogin },
                include: {
                    ongContato: {
                        include: {
                            tipoContato: true
                        }
                    }
                }
            });

            return updatedOng;
        } catch (error) {
            console.error('Repository updateLogin error:', error);
            throw error;
        }
    }
}

export default new ONGRepository();
