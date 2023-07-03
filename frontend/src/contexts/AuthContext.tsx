import { createContext,  ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';

import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
   name: string;
   email: string;
   password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){ // função de deslogar
    try{
        destroyCookie(undefined, '@nextauth.token')// deslogar, destruir o cookie
        Router.push('/')// depois de deslogar ele direciona para a tela inicial
    }catch{
        toast.error("Erro ao deslogar!")
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(()=> {

        // tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const {id, name, email} = response.data;

                setUser({
                    id,
                    name,
                    email
                }
                )
            })
            .catch(()=> {
               // Se  deu erro deslogamos o usuário
               signOut();
            })
        }

    }, [])

    async function signIn({ email, password }: SignInProps){ // função assincrona de receber os dados email e senha para mandar para a autenticação
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            // console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
               maxAge: 60 * 60 * 24 * 30, // faz o cookie expirar em 1 mês
               path: "/" // Quais caminhos terão acesso ao cookie, com / será todos
            })

            setUser({
               id,
               name,
               email,
            })

            // Passar para próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso!')

            //Redirecionar o user para /dashbord
            Router.push('/dashboard')


        }catch(err){
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar", err)
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try {

            const response = await api.post('/users', {
              name,
              email,
              password
            })

            toast.success('Conta criada com sucesso!')

            Router.push('/')

        } catch (err) {
            toast.error("Erro ao cadastrar!")
            console.log("erro ao cadastrar ", err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    )
}
