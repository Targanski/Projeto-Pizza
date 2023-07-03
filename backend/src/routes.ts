import {Router, Request, Response} from 'express';
import multer from 'multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'


import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'

import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'

import {  AddItemController } from './controllers/order/AddItemController'
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController } from './controllers/order/SendOrderController'

import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'
// cria rota
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
// -- ROTA TESTE --
router.get('/teste', (req: Request, res: Response) => {
    return res.json({ nome: 'Code Slice' })
})

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle)

// -- ROTA AUTENTICAÇÃO DE LOGIN --
router.post('/session', new AuthUserController().handle)

// Rota que pega informação do usuário
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

// ROTA QUE LISTA TODAS CATEGORIAS
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT --
router.post('/product', isAuthenticated,upload.single('file'), new CreateProductController().handle)
// mostra os item da categoria
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// -- ROTAS ORDER
// criar uma ordem
router.post('/order', isAuthenticated, new CreateOrderController().handle)
// deletar uma ordem
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
// adicionar um item a ordem
router.post('/order/add', isAuthenticated, new AddItemController().handle)
// remover um item da ordem
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
// tirar ordem do modo rascunho e enviar o pedido
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
// pega todos as ordens de pedido para mostrar na cozinha
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
// mostra os detalhes do pedido da mesa
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
// finaliza pedido na cozinha ja feito
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle )

export { router };
