import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name : string;
    email: string;
    password: string;
}


class CreteUserService {
  async execute({name, email, password}: UserRequest){
    
    //verificar se ele enviou um email
    if(! email){
        throw new Error("Email incorreto")
    }
    // verificar se email já está cadastrado na plataforma
       const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
          email: email
        }
       })

       if(userAlreadyExists){// verifica se ja tem usuário
        throw new Error("Usuário já existe")
       }

       const passwordHash = await hash(password, 8)

       const user = await prismaClient.user.create({// cadastra no banco o usuário
        data:{
          name: name,
          email: email,
          password: passwordHash,
        },
        select:{
          id: true,
          name: true,
          email: true,
        }
       })

    return user;
  } 
}

export { CreteUserService }