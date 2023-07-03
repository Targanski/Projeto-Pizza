import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}// tipagem que recebe os elementos de entrada html

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}// tipagem do elemento text area do html

export function Input({...rest}: InputProps){
   return(
    <input className={ styles.input } {...rest}/>
   )
}

export function TextArea({...rest}: TextAreaProps){
   return(
        <textarea className={styles.input} {...rest}></textarea>
   )
}
