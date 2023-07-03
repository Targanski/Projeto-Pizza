import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi'
import { OrderItemProps } from '../../pages/dashboard/index'


interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps){
        // função para retornar o valor do pedido
        // let total = 0;

        // order.map(item => {
        // const itemTotal = Number(item.amount) * Number(item.product.price);
        // total += itemTotal;
        // });

        // console.log(total.toFixed(2));

    const customStyles = {
       content:{ // tem na documentação do react modal isso daqui.
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        padding: '30px',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#1d1d2e'
       }
    };

    return(
       <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
       >

        <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border:0 }}
        >
            <FiX size={45} color="#f34748"/>
        </button>

        <div className={styles.container}>


            <h2>Detalhes do pedido</h2>
            <span className={styles.table}>
                Mesa: <strong>{order[0].order.table}</strong>
            </span>

            {order.map( item => (
                <section key={item.id} className={styles.containerItem}>
                    <span>{item.amount} - <strong>{item.product.name}</strong></span>
                    <span className={styles.description}>{item.product.description}</span>
                    {/* <span>Valor : {Number(item.amount)*(Number(item.product.price))} </span> */}
                </section>



            ))}
            {/* <span><p>Total: R$ {total.toFixed(2)}</p></span> */}

            <button className={styles.buttonOrder} onClick={ () => handleFinishOrder(order[0].order_id) }>
                Concluir pedido
            </button>

        </div>

       </Modal>
    )
}
