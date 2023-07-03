import prismaClient from "../../prisma";

class ListOrdersService{
    async execute(){

        const orders = await prismaClient.order.findMany({ // retorna todos os pedidos em aberto
            where:{
                draft : false,
                status : false,
            },
            orderBy:{
                created_at: 'desc' // ordena pelo menos recente para sair o pedido menos recente primeiro.
            }
        })
        return orders;
    }
}

export { ListOrdersService }
