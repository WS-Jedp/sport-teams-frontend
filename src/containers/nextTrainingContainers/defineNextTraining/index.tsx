import React from 'react'
import { useForm } from 'react-hook-form'

import { ButtonForm } from '../../../components/buttons/form'

export interface NextTrainingForm {
    date: Date,
    time: string,
    state: string
}

interface DefineNextTraining {
    date: string,
    onSubmit: (data:NextTrainingForm) => void
}

export const DefineNextTraining:React.FC<DefineNextTraining> = ({ date, onSubmit }) => {

    const { register, handleSubmit } = useForm<NextTrainingForm>() 

    return (
        <form className="flex flex-col align-start justify-start define-next-training" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Schedule Training</h2>
            <p className="content__paragraph">Define the hours of the training</p>
            
            <input {...register('date', {required: true})} type="date" value={date}  hidden/>
            <input {...register('state', {required: true})} type="state" value="true"  hidden/>

            <div className="form-input">
                <input {...register('time', {required: true})} type="time" />
            </div>
            <ButtonForm 
                text="Schedule"
            />

        </form>
    )
}