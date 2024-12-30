import db from '../db.ts'

type AddContact = {
    id: string,
    tipo: "EMAIL" | "INSTAGRAM" | "WHATSAPP" | "TELEFONE" | "SITE",
    valor: string,
}

class ONGContactRepository {

    async addContact(ongId: string, addContact: AddContact) {
        const contactType: any = await db.tipoContato.findUnique({
            where: {tipo: addContact.tipo},
        });

        if (!contactType) {
            throw new Error(`Tipo de contato '${addContact.tipo}' não encontrado.`);
        }

        return db.ongContato.create({
            data: {
                tipoContatoId: contactType.id,
                ongId: ongId,
                valor: addContact.valor,
            },
            include: {
                tipoContato: true
            },
        });
    }

    async removeContact(id: string) {
        await db.ongContato.delete({
            where: {id}
        });
    }

}

export default new ONGContactRepository() 


