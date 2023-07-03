
import { useState, FormEvent, useContext } from 'react'
// tag html do nextjs
import Head from 'next/head'
// tag img do next js
import Image from 'next/image';
// logo
import logoImg from '../../../public/CodeSlicePizzaria.svg';
// css
import styles from '../../../styles/home.module.scss';
// importar campo de digitar
import { Input } from '../../components/ui/Input'
// importar botão
import { Button } from '../../components/ui/Button'

//contexto de autenticação
import { AuthContext } from '../../contexts/AuthContext'
// alerta personalizado
import { toast } from 'react-toastify'

// navegação entre paginas
import Link from 'next/link';

// as tags definem a pagina, tags html...
export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      toast.error("Preencha todos os campos!")
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    setLoading(false);

  }

  return (
    <>
  <Head>
    <title>
    CodeSlice - Faça o seu cadastro agora!
    </title>
  </Head>
  <div className={styles.containerCenter}>
    <Image src={logoImg}alt="Logo Code Slice Pizzaria"/>


    <div className={styles.login}>
        <h1>Criando sua conta</h1>
      <form onSubmit={handleSignUp}>
      <Input
        placeholder="Digite seu nome"
        type="text"
        value={name}
        onChange={ (e) => setName(e.target.value)}
        />

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
          Cadastrar
        </Button>
      </form>

      <Link href="/">
        <p className={styles.text}>Já possui uma conta? <b>Faça o login!</b></p>
      </Link>

    </div>
  </div>
    </>
  )
}
