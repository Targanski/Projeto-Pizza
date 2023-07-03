import '../../styles/globals.scss' // importa o css de forma global, usa estilo padrão em todas as telas.
import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css' // alerta personalizado
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../contexts/AuthContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  <AuthProvider>
    <Component {...pageProps} />
    <ToastContainer autoClose={3000}/>
  </AuthProvider>
  )
}

export {MyApp}
