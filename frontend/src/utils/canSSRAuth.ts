// só pessoas logadas podem acessar
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

//função que só user logados podem ter acesso

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token']; // é para armazenar o cookie na variavel token

        if(!token){ // aqui só verifica se está logado para poder acessar, se não tiver o cookie redireciona para a tela de login
            return {
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            } // e se tiver o token e por algum motivo deu erro cai na verificação abaixo que destroi o cookie e redireciona para a pagina de login
        }

        try {
            return await fn(ctx);
        } catch (err) {
          if(err instanceof AuthTokenError){
            destroyCookie(ctx, '@nextauth.token');

            return{
                redirect:{
                    destination: '/',
                    permanent: false
                }
            }
          }
        }

    }



}
