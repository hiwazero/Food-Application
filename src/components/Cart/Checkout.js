import React , {useRef , useState} from 'react'
import styles from './Checkout.module.css'


const Checkout = (props) =>{
    const [formIsValid, setFormIsValid] = useState({
        name: true,
        street: true,
        postalcode: true,
        city: true
    })

    const nameRef = useRef()
    const streetRef = useRef()
    const postalcodeRef = useRef()
    const cityRef = useRef()


    const onConfirmHandler = (event) => {
        event.preventDefault()
        const enteredName = nameRef.current.value
        const enteredStreet = streetRef.current.value
        const enteredPostalCode = postalcodeRef.current.value
        const enteredCity = cityRef.current.value

        const nameIsValid = /^(?!\s)(?!.*\s$).+$/.test(enteredName)
        const streetIsValid = /^(?!\s)(?!.*\s$).+$/.test(enteredStreet)
        const postalcodeIsValid = /^\d{5}$/.test(enteredPostalCode)
        const cityIsValid = /^(?!\s)(?!.*\s$).+$/.test(enteredCity)

        setFormIsValid({
            name: nameIsValid,
            street: streetIsValid,
            postalcode: postalcodeIsValid,
            city: cityIsValid 
        })

        const formValidation = nameIsValid && streetIsValid && postalcodeIsValid && cityIsValid

        if(!formValidation){
            return
        }

        props.onSubmitOrder({
            name: enteredName,
            street: enteredStreet,
            postalcode: enteredPostalCode,
            city: enteredCity
        })

        props.onFormSubmitted()
        props.onClearItem()
    } 

    // const nameClassName = formIsValid.name ? `.control` : `.control.invalid`
    const nameClassName = `${styles.control} ${formIsValid.name ? '' : styles.invalid}`
    const streetClassName = `${styles.control} ${formIsValid.street ? '' : styles.invalid}`
    const postalcodeClassName = `${styles.control} ${formIsValid.postalcode ? '' : styles.invalid}`
    const cityClassName = `${styles.control} ${formIsValid.city ? '' : styles.invalid}`

    return(
        <form className={styles.form} onSubmit={onConfirmHandler}>
        <div className={nameClassName}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameRef}/>
          {!formIsValid.name && <p>Please enter valid name</p>}
        </div>
        <div className={streetClassName}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street'  ref={streetRef}/>
          {!formIsValid.street && <p>Please enter valid street</p>}
        </div>
        <div className={postalcodeClassName}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal' ref={postalcodeRef}/>
          {!formIsValid.postalcode && <p>Please enter valid postal code (5 digits long)</p>}
        </div>
        <div className={cityClassName}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityRef}/>
          {!formIsValid.city && <p>Please enter valid city</p>}
        </div>
        <div className={styles.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={styles.submit}>Confirm</button>
        </div>
      </form>
    )
}

export default Checkout