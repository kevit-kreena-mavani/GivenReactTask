import styles from './Card.module.css'

const Card = (props) =>{
  
    return <div className={`${styles.card} ${props.className}`} onClick={props.onProductClick}>{props.children}</div>
} 
export default Card ; 