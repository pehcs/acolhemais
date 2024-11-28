import db from '../db.ts'
import { CreateONG } from './dto/ONGDtos.ts';

class ONGRepository {

    async save(createONG: CreateONG) {
        return await db.ong.create({
            data: {
                ...createONG
            }
        }); 
    }

    async findById(id: string) {
        return await db.ong.findUnique({
            where: {
                id
            }
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
        return await db.ong.findMany(); 
    }
}

export default new ONGRepository() 


