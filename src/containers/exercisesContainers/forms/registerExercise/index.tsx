import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { UserContext } from '../../../../contexts/user'
import { ExercisesContext } from '../../../../contexts/exercises'

import { ButtonForm } from '../../../../components/buttons/form'

export interface RegisterExerciseForm {
    user_id: string,
    exercise_id: string,
    result: number,
    date: Date,
    video?: File[]
}

interface RegisterExerciseContainer {
    onSubmit: (data:RegisterExerciseForm) => void,
    selectedExercise?: string,
    teamId?: string,
}

export const RegisterExerciseContainer:React.FC<RegisterExerciseContainer> = ({ onSubmit, selectedExercise, teamId = undefined }) => {

    const { id } = useContext(UserContext)
    const { exercises } = useContext(ExercisesContext)

    const { register, handleSubmit ,formState: { errors } } = useForm<RegisterExerciseForm>() 


    return (
        <form className="flex flex-col align-start justify-start register-exercise" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Register Exercise</h2>
            <p className="content__paragraph">Register a new exercise!</p>

            <input type="string" value={teamId ? teamId : id} hidden {...register('user_id', { required: true })}/>

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

            <div className="form-input">
                <label className="form-input__label" htmlFor="result">
                    Video
                </label>
                <input 
                    type="file" 
                    accept=".mp4"
                    id="video" 
                    placeholder="Write the result of the exercise" 
                    {...register('video', { required: false })}
                />
                {
                    errors.video && <small className="form-input__error">There is an error with the file</small>
                }
            </div>



            <ButtonForm 
                text="Register!"
            />
            
        </form>
    )
}