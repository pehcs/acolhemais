import { PrismaClient } from "@prisma/client";
import { CreateBeneficiario } from "./dto/BeneficiarioDtos";

const prisma = new PrismaClient();

export default class BeneficiarioRepository {
    static async save(data: CreateBeneficiario) {
        return prisma.beneficiarios_locais.create({ data });
    }

    static async findById(id: number) {
        return prisma.beneficiarios_locais.findUnique({ where: { id } });
    }

    static async update(id: number, data: Partial<CreateBeneficiario>) {
        return prisma.beneficiarios_locais.update({ where: { id }, data });
    }
}