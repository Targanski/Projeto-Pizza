import prismaClient from "../../prisma";

import { compare } from 'bcryptjs'// método de comparar senha criptografada do banco com a enviada.

import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string;
    password: string;
}


class AuthUserService{
    async execute({email, password}: AuthRequest){
        // Verificar se o email existe.
        const user = await prismaClient.user.findFirst({
            where:{
                email : email
            }
        })

        if(!user){
            throw new Error("Usuário/senha incorreto")
        }
        // preciso verificar a senha se está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário/senha incorreto")
        }

        // se deu tudo certo vamos gerar o token pro usuario.
        const token = sign(
           {
            name: user.name,
            email: user.email
           },
           process.env.JWT_SECRET,
           {
            subject: user.id,
            expiresIn: '30d'
           }
        )

        return{
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export {AuthUserService};