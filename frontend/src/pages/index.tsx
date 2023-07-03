import { useContext, FormEvent, useState } from 'react'
// tag html do nextjs
import Head from 'next/head'
// tag img do next js
import Image from 'next/image';
// logo
import logoImg from '../../public/CodeSlicePizzaria.svg';
// css
import styles from '../../styles/home.module.scss';
// importar campo de digitar
import { Input } from '../components/ui/Input'
// importar botão
import { Button } from '../components/ui/Button'
// importar contexto de autenticação
import { AuthContext } from '../contexts/AuthContext';
// alerta personalizado
import { toast } from 'react-toastify'
// navegação entre paginas
import Link from 'next/link';

import { canSSRGuest } from '../utils/canSSRGuest'

// as tags definem a pagina, tags html...
export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha os campos!")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

  await signIn(data)



  setLoading(false);
  }

  return (
    <>
  <Head>
    <title>
    CodeSlice - Faça o login
    </title>
  </Head>
  <div className={styles.containerCenter}>
    <Image src={logoImg}alt="Logo Code Slice Pizzaria"/>


    <div className={styles.login}>
      <form onSubmit={handleLogin}>
        <Input
        placeholder="Digite seu email"
        type="text"
        value={email}
        onChange={ (e) => setEmail(e.target.value)}
        />

        <Input
        placeholder="Sua senha"
        type="password"
        value={password}
        onChange={ (e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          loading={loading}
        >
          Acessar
        </Button>
      </form>

      <Link href="/signup">
        <p className={styles.text}>Não possui uma conta? <b>Cadastre-se!</b></p>
      </Link>

    </div>
  </div>
    </>
  )
}



// função anonima que por ela tudo pode ser renderizado pelo lado servidor pra depois mandar pro usuário

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})
