import db from '../db.ts';
import { AddContact } from './dto/ONGDtos.ts';

class ONGContactRepository {

    async addContact(ongId: string, addContact: AddContact) {
        const contactType = await db.tipoContato.findUnique({
            where: { tipo: addContact.tipo },
        });
    
        if (!contactType) {
            throw new Error(`Tipo de contato '${addContact.tipo}' não encontrado.`);
        }
    
        return await db.ongContato.create({
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
            where: { id }
        });
    }
       
}

export default new ONGContactRepository();


