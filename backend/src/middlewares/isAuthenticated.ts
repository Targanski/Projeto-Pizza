import {NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken'

interface Payload{
    sub: string;

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

// Receber o token 
    const authToken = req.headers.authorization;

    if(!authToken){
        return  res.status(401).end();
    }

    const [, token] = authToken.split(" ")
    

    try{
        // Validar esse token
        const { sub } = verify(
           token,
           process.env.JWT_SECRET// fica dentro de env a variável secreta
        ) as Payload;

        // Recuperar o id do token e colocar dentro de uma variável user_id dentro do request.
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();// erro 401 não autorizado
    }
}