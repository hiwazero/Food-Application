import CartIcon from "../Cart/CartIcon"
import styles from './HeaderCartButton.module.css'
import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"

export default function HeaderCartButton(props){
    const cartCtx = useContext(CartContext)
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber + item.amount; //make it a number
    },0)

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

    const {items} = cartCtx
    useEffect(()=>{
        if(items.length === 0){
            return
        }

        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return(()=>{
            clearTimeout(timer)
        })
    },[items])

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>You Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}