import {Request, response, Response} from 'express'
import { CreteUserService } from '../../services/user/CreateUserService'

class CreateUserController {
    async handle(req:Request, res: Response){
        const {name, email, password} = req.body;// onde recebe as informações json

        const createUserService = new CreteUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(user)
    }
}

export {CreateUserController}