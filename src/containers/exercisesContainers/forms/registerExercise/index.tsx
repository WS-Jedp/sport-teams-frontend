import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../../../contexts/user'
import { ExercisesContext } from '../../../../contexts/exercises'

import { ButtonForm } from '../../../../components/buttons/form'
import { format } from 'date-fns'
import { MYSQL_FORMAT } from '../../../../tools/dateFormats'

export interface RegisterExerciseForm {
    user_id: number,
    exercise_id: number,
    result: number,
    date: Date
}

interface RegisterExerciseContainer {
    onSubmit: (data:RegisterExerciseForm) => void,
    selectedExercise?: number
}

export const RegisterExerciseContainer:React.FC<RegisterExerciseContainer> = ({ onSubmit, selectedExercise }) => {

    const { id } = useContext(UserContext)
    const { exercises } = useContext(ExercisesContext)

    const { register, handleSubmit ,formState: { errors } } = useForm<RegisterExerciseForm>() 

    return (
        <form className="flex flex-col align-start justify-start register-exercise" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Register Exercise</h2>
            <p className="content__paragraph">Register a new exercise!</p>

            <input type="number" value={id} hidden {...register('user_id', { required: true })} />

            <div className="form-input">
                <label className="form-input__label" htmlFor="id">
                    Exercise
                </label>
                <select id="id" {...register('exercise_id', { required: true })} >
                    {
                        exercises.map(exercise => (
                            <option key={exercise.id} value={exercise.id} defaultValue={selectedExercise}>{exercise.title}</option>
                        ))
                    }
                </select>
                {
                    errors.exercise_id && <small className="form-input__error">{errors.exercise_id.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="date">
                    Date
                </label>
                <input type="date" id="date" {...register('date', { required: true, valueAsDate: true })} />
                {
                    errors.date && <small className="form-input__error">{errors.date.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="result">
                    Result
                </label>
                <input 
                    type="number" 
                    id="number" 
                    placeholder="Write the result of the exercise" 
                    {...register('result', { required: true })}
                />
                {
                    errors.result && <small className="form-input__error">{errors.result.message}</small>
                }
            </div>

            <ButtonForm 
                text="Register!"
            />
            
        </form>
    )
}