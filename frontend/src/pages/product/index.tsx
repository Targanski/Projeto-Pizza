import { useState, ChangeEvent,  FormEvent} from 'react'
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header/index'
import { FiUpload } from 'react-icons/fi'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { setupAPIClient } from '../../services/api'

import { toast } from 'react-toastify'

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps{
    categoryList: ItemProps[];
}


export default function Product({ categoryList }: CategoryProps){

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');// da uma visualização da imagem escolhida no bloco de enviar imagens
    const [imageAvatar, setImageAvatar] = useState(null) // aqui pega a imagem para cadastrar

    const [categories, setCategories] = useState(categoryList || [])// aqui vai acessar todos os itens de categorias ou se não tiver alguma cadastrada retorna o []
    const [categorySelected, setCategorySelected] = useState(0)// aqui seleciona o item da categoria e começa em 0 do array

    function handleFile(event: ChangeEvent<HTMLInputElement>){
        if(!event.target.files){ // verifica se não tem arquivo e se não tem ele não faz nada
            return;
        }

        const image = event.target.files[0]; // dó pega a primeira imagem enviada, pq os parametros ficam armazenados em array

        if(!image){
            return; //verifica se não tem imagem e se não tem ele não faz nada
        }

        if(image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png'){
            setImageAvatar(image); // coloca o arquivo de imagem aqui
            setAvatarUrl(URL.createObjectURL(event.target.files[0]))
        }

    }
    // Quando seleciona uma nova categoria na lista
    function handleChangeCategory(event){
        // console.log("POSIÇÃO DA CATEGORIA SELECIONADA ", event.target.value) // aqui mostra a posição da categoria selecionada
        // console.log('Categoria Selecionada ', categories[event.target.value]) // aqui as propriedades, o array em si

        setCategorySelected(event.target.value) // posição nova que ficara armazenada aqui até selecionar uma outra na lista
    }

    async function handleRegister(event: FormEvent){
        event.preventDefault(); // so para não atualizar a pagina quando der submit

        try {
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null){
                toast.error("Preencha todos os campos!");
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar);

            const apiClient = setupAPIClient();

            await apiClient.post('/product', data);

            toast.success('Cadastrado com sucesso!')

        } catch (err) {
            console.log(err);
            toast.error("Erro ao cadastrar!")
        }

        setName('');
        setPrice('');
        setDescription('');
        setImageAvatar(null);
        setAvatarUrl('');
    }

    return(
        <>
            <Head>
               <title>Novo produto - Code Slice</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>


                    <form className={styles.form} onSubmit={handleRegister}>

                        <label className={styles.labelAvatar}>
                            <span>
                                <FiUpload size={30} color="black"/>
                            </span>

                            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFile}/>

                        {avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt="Foto do produto"
                                    width={250}
                                    height={250}
                                />
                        )}
                        </label>


                       <select value={categorySelected} onChange={handleChangeCategory}> {/* o item selecionado sempre será o que está no value */}
                            {categories.map( (item, index) => {
                                return(
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input
                        type="text"
                        placeholder="Digite o nome do produto"
                        className={styles.input}
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                        />

                        <input
                        type="text"
                        placeholder="Preço do produto"
                        className={styles.input}
                        value={price}
                        onChange={ (e) => setPrice(e.target.value)}
                        />


                        <textarea
                            placeholder="Descreva seu produto..."
                            className={styles.input}
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)}
                        />

                        <button className={styles.buttonAdd} type="submit">
                            Cadastrar
                        </button>

                    </form>
                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => { // esse serverside é executado antes da interface grafica ser carregada
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category');
    // console.log(response.data);

    return {
        props: {
            categoryList: response.data
        }
    }
})
