import React from 'react'
import { useForm } from 'react-hook-form'

import { ButtonForm } from '../../../components/buttons/form'

export interface TrainingForm {
    date: Date,
    time: string,
}

interface CreateTraining {
    onSubmit: (data:TrainingForm) => void
}

export const CreateTraining:React.FC<CreateTraining> = ({ onSubmit }) => {

    const { register, handleSubmit } = useForm<TrainingForm>() 

    return (
        <form className="flex flex-col align-start justify-start define-next-training" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Schedule Training</h2>
            <p className="content__paragraph">Define the hours of the training</p>
        
            <div className="form-input">
                <label className="form-input__label">Date</label>
                <input {...register('date', {required: true})} type="date" />
            </div>
            <div className="form-input">
                <label className="form-input__label">Time</label>
                <input {...register('time', {required: true})} type="time" />
            </div>
            <ButtonForm 
                text="Schedule"
            />

        </form>
    )
}