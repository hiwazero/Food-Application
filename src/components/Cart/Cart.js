import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { Fragment, useContext , useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const onAddHandler = (item) =>{
    cartCtx.addItem(item)
  }
  const onRemoveHandler = (id) =>{
    cartCtx.removeItem(id)
  }

  const onClearHandler = () =>{
    cartCtx.clearItem()
  }

  const onOrderHandler = () =>{
    setIsCheckout(true)
  }

  const onFormSubmitted = () =>{
    setIsFormSubmitted(true)
  }

  const onSubmitOrder = (userData) =>{
    setIsLoading(true)
    fetch('https://food-order-82821-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        orders: cartCtx.items,
        user: userData
      })
    })
    setIsLoading(false)
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onAdd={onAddHandler.bind(null,item)} onRemove={onRemoveHandler.bind(null,item.id)} />
      ))}
    </ul>
  );

  const modalEmpty = <Fragment>
    <p>No foods ordered yet ...</p>
  </Fragment>

  const modalAction = <div className={styles.actions}>
  <button className={styles["button--alt"]} onClick={props.onHideCart}>
    Close
  </button>
  <button className={styles.button} onClick={onOrderHandler}>Order</button>
</div>

const modalOrder = <Fragment>
{cartItems}
 <div className={styles.total}>
   <span>Total Amount</span>
   <span>{totalAmount}</span>
 </div>
 {isCheckout && <Checkout onSubmitOrder={onSubmitOrder} onCancel={props.onHideCart} onFormSubmitted={onFormSubmitted} onClearItem={onClearHandler}/>}
 {!isCheckout && modalAction}
</Fragment>

  const modalLoading = <Fragment>
    <p>Submitting Order ...</p>
  </Fragment>

  const modalSuccess = <Fragment>
    <p>Order submitted successfuly ...</p>
  </Fragment>

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isFormSubmitted && !isLoading && cartCtx.items.length === 0 && modalEmpty}
      {!isFormSubmitted && !isLoading && cartCtx.items.length > 0 && modalOrder}
      {isLoading && modalLoading}
      {isFormSubmitted && !isLoading && modalSuccess}
    </Modal>
  );
}
