// verifica se pode usuários não logados acessar
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

//função para páginas que só podem ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async ( ctx: GetServerSidePropsContext ): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        // Se tentar acessar a página porém tendo já um login salvo, será redirecionado
        if(cookies['@nextauth.token']){
            return {
               redirect: {
                destination: '/dashboard',
                permanent: false,
               }
            }
        }

        return await fn(ctx);
    }

}
