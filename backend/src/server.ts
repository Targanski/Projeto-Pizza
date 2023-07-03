import express, { Request, Response, NextFunction, json} from 'express' // tipagem
import 'express-async-errors';// tratativa de erros
import cors from 'cors';// acessa de qualquer ip com essa biblioteca
import path from 'path'

import {router} from './routes'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
   '/files',
   express.static(path.resolve(__dirname, '..','tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){ // faz uma trativa de erro da rota
        // Se for uma instancia do tipo Error
        return res.status(400).json({
           error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})

app.listen(3333, () => console.log('Servidor online!'))