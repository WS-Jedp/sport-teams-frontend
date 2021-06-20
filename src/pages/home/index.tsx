import React from 'react'
import { ExerciseCategoryCard } from '../../components/exercises/category'
import './styles.scss'


export const Home:React.FC = () => {

    return (
        <section className="flex flex-row align-center justify-center home">
            <ExerciseCategoryCard 
                category="strength"
            />
            <ExerciseCategoryCard 
                category="cardio"
            />
            <ExerciseCategoryCard 
                category="technical"
            />
            <ExerciseCategoryCard 
                category="velocity"
            />
        </section>
    )
}