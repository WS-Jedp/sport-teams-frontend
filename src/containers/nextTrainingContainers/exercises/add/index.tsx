import React, { useContext, useState, useRef } from 'react'
import { ExercisesContext } from '../../../../contexts/exercises'
import { TrainingContext } from '../../../../contexts/training'
import { ButtonForm } from '../../../../components/buttons/form'
import { useForm } from 'react-hook-form'
import { SelectExercises } from '../../../../components/forms/selectExercises'

interface AddNextTrainingExerciseForm {
    exercisesId: string
}

interface AddNextTrainingExercise {
    onSubmit: (data:AddNextTrainingExerciseForm) => void 
}

export const AddNextTrainingExercise:React.FC<AddNextTrainingExercise> = ({ onSubmit }) => {
    
    const { exercises } = useContext(ExercisesContext)
    const { addNextTrainingExercise } = useContext(TrainingContext)
    const [selectedExercises, setSelectedExercises] = useState<number[]>([])

    const { register, formState: {errors}, handleSubmit } = useForm<AddNextTrainingExerciseForm>()

    const inputRef = useRef<HTMLInputElement>(null)
    const handleSelectedExercises = (id:number) => {
        if(!selectedExercises.includes(id)) {
            setSelectedExercises(old => [...old, id])
            inputRef.current?.focus()
            return null
        }        
        setSelectedExercises(selectedExercises.filter(exercise => exercise !== id))
        inputRef.current?.focus()

    }



    return (
        <form className="flex flex-col align-start justify-start add-next-training-exercise" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Next Training Exercises</h2>
            <p className="content__paragraph">Select the exercises that will do in the next training!</p>
            <input 
                {...register('exercisesId', { required: true, min: 1 })} 
                value={selectedExercises.join('-')} 
                style={{opacity: 0, position: 'absolute', top: 0, left: 0, width: 0, height: 0}} 
                ref={inputRef}
            />
            <SelectExercises 
                exercises={exercises}
                selectedExercises={selectedExercises}
                onSelect={(id) => handleSelectedExercises(id)}
            />
            <ButtonForm 
                text="Add"
            />
        </form>
    )
}