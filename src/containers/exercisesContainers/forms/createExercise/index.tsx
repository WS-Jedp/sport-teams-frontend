import React, { useState, useContext, useRef } from 'react'
import { EXERCISES_TYPE, EXERCISE_CATEGORY, exercisesCategories, exercisesTypes } from '../../../../tools/defineExercise'
import { useForm } from 'react-hook-form'
import { FormAddOption } from '../../../../components/forms/addOption'
import { ButtonForm } from '../../../../components/buttons/form'

import { ExercisesContext } from '../../../../contexts/exercises'

export interface CreateExerciseForm {
    title: string,
    description: string,
    type: EXERCISES_TYPE,
    category: EXERCISE_CATEGORY,
    videoId?:string,
    purposes?: string
}

interface CreateExerciseContainer {
    onSubmit: (data:CreateExerciseForm) => void,
}

export const CreateExerciseContainer:React.FC<CreateExerciseContainer> = ({ onSubmit }) => {

    const { purposes } = useContext(ExercisesContext)

    const purposesRef = useRef<HTMLInputElement>(null)
    const [selectedPurposes, setSelectedPurposes] = useState<{title:string, id: number}[]>([])
    const addPurpose = (purpose:{id:number, title: string}) => {
        setSelectedPurposes(old => [...old, purpose])
        purposesRef.current?.focus()
    }
    const removePurpose = (id:number) => setSelectedPurposes(selectedPurposes.filter(purpose => purpose.id !== id))
    const purposesToString = () => selectedPurposes.map(purpose => purpose.id).join('-')

    const { register, handleSubmit ,formState: { errors } } = useForm<CreateExerciseForm>() 

    return (
        <form className="flex flex-col align-start justify-start register-exercise" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">New Exercise</h2>
            <p className="content__paragraph">Create a new exercise!</p>

            <div className="form-input">
                <label className="form-input__label" htmlFor="title">
                    Title
                </label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Write the name of the exercise" 
                    {...register('title', { required: true, minLength: 3, maxLength: 60 })}
                />
                {
                    errors.title && <small className="form-input__error">{errors.title.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="description">
                    Description
                </label>
                <textarea 
                    id="description" 
                    placeholder="Wrtie the description of the exercise" 
                    rows={12}
                    {...register('description', { required: true, minLength: 3, maxLength: 210 })}
                />
                {
                    errors.description && <small className="form-input__error">{errors.description.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="type">
                    Type
                </label>
                <select id="type" {...register('type', { required: true })}>
                    {
                        exercisesTypes.map(type => (
                            <option key={type} title={type} value={type}>{type}</option>
                        ))
                    }
                </select>
                {
                    errors.type && <small className="form-input__error">{errors.type.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="category">
                    Category
                </label>
                <select id="category" {...register('category', { required: true })}>
                    {
                        exercisesCategories.map(category => (
                            <option key={category} title={category} value={category}>{category}</option>
                        ))
                    }
                </select>
                {
                    errors.category && <small className="form-input__error">{errors.category.message}</small>
                }
            </div>

            <div className="form-input">
                <label className="form-input__label" htmlFor="title">
                    Video Url
                </label>
                <input 
                    type="text" 
                    id="videoId" 
                    placeholder="Paste the Youtube video URL" 
                    {...register('videoId', { required: false, minLength: 12 })}
                />
                {
                    errors.videoId && <small className="form-input__error">{errors.videoId.message}</small>
                }
            </div>

            {/* <div className="form-input">
                <label className="form-input__label" htmlFor="category">
                    Purposes
                </label>
                <p className="content__paragraph">Add the purposes of the exercise</p>

                <input type="text" style={{opacity: 0, width: 0, height: 0, overflow: 'hidden'}} value={purposesToString()} id="purposes" {...register('purposes', { required: false })} ref={purposesRef} />

                <h2 className="content__sub-title">Purposes Selected</h2>
                <ul>
                    {
                        selectedPurposes.length > 0 ? selectedPurposes.map(purpose => (
                            <li className="content__paragraph" key={purpose.id}>- {purpose.title}</li>
                        )) : (
                            <p className="content__paragraph">This exercise doesn't have related purposes yet</p>
                        )
                    }
                </ul>
                <FormAddOption 
                    elements={purposes}
                    onAdd={(element) => addPurpose(element)}
                />
                {
                    errors.purposes && <small className="form-input__error">{errors.purposes.message}</small>
                }
            </div> */}

            <ButtonForm 
                text="Register!"
            />
            
        </form>
    )
}