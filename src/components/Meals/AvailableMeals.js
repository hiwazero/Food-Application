import React from 'react'
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react';

 const AvailableMeals = () => {

    const [meals,setMeals] = useState([])
    const [mealsLoading, setMealsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch('https://food-order-82821-default-rtdb.firebaseio.com/meals.json')

        if(!response.ok){
          throw new Error('Something went wrong!')
        }

        const responseData = await response.json()
        const loadedMeals = []

        for(const key in responseData){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }

        setMeals(loadedMeals)
        setMealsLoading(false)
      }

        fetchMeals().catch(error =>{
          setMealsLoading(false)
          setHttpError(error.message)
        })

    } ,[] )

    if(mealsLoading){
      return(
        <section className={styles.MealsLoading}>
          <p>Loading ....</p>
        </section>
      )
    }

    if(httpError){
      return(
        <section className={styles.MealError}>
          <p>{httpError}</p>
        </section>
      )
    }

    const mealsList = meals.map(meal =>{
        return(
                <MealItem 
                    id={meal.id}
                    key={meal.id} 
                    name={meal.name} 
                    description={meal.description} 
                    price={meal.price}
                />
            )
    })

    return( 
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals