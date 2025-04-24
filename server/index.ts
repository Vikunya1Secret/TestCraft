import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { PrismaClient } from './src/generated/prisma/client'
import authRouter from './src/auth/auth.router'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 2000
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter)

const main = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

main()
    .then(async () => {
        await prisma.$connect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })