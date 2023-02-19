import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'
import {useContext} from 'react'

export default function MealItem(props){
    const price = `$${props.price.toFixed(2)}`

    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    return(
        <li className={styles.meal}>  
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}