import express from 'express'
import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// async function main() {
//     const newOng = await prisma.ong.create({
//       data: {
//         nome: "nome da ONG",
//         login: "123456",
//         senha: "senha123",
//         descricao: "Descrição da ONG",
//         cnpj: "12.345.678/0001-99",
//         localizacao: "Rua Exemplo, 123",
//       },
//     });
  
//     console.log('ONG criada com sucesso:', newOng);
//   }

// main()

const app = express()
app.use(express.json())

export default app