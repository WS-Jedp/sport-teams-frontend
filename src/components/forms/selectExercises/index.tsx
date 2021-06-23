import React from 'react'
import { ExerciseSmall } from 'dto/exercise'
import { ExerciseSmallCard } from '../../exercises/smallCard'
import './styles.scss'

interface SelectExercises {
    exercises: ExerciseSmall[],
    selectedExercises: number[],
    onSelect: (id:number) => void
}

export const SelectExercises:React.FC<SelectExercises> = ({ exercises, selectedExercises, onSelect }) => {
    return (
        <ul className="flex flex-row align-start justify-start select-exercises select-exercises__list">
            {
                exercises.map(exercise => (
                    <li key={exercise.id} className={`${selectedExercises.includes(exercise.id) ? 'select-exercises__selected' : ''}`}>
                        <ExerciseSmallCard
                            exerciseName={exercise.title}
                            exerciseType={exercise.type}
                            category={exercise.category}
                            action={() => onSelect(exercise.id)}
                        />
                    </li>
                ))
            }
        </ul>
    )
}