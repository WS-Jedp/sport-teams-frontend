import React from 'react'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Player } from '../../../dto/player'
import { ExerciseSmall } from '../../../dto/exercise'
import { MYSQL_FORMAT } from '../../../tools/dateFormats'

import { ButtonForm } from '../../../components/buttons/form'

export interface AddExerciseRegisterForm {
    playerId: string,
    exerciseId: string,
    result: number
}

interface AddExerciseRegisterContainer {
    players: Player[],
    exercise: ExerciseSmall,
    onSubmit: (data:AddExerciseRegisterForm) => void
}

export const AddExerciseRegisterContainer:React.FC<AddExerciseRegisterContainer> = ({ exercise, players, onSubmit }) => {

    const { register, handleSubmit } = useForm<AddExerciseRegisterForm>()

    return (
        <form className="flex flex-col align-start justify-start" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="content__title">Add Exercise Register</h2>
            <h2 className="content__sub-title">{exercise.title}</h2>
            <p className="content__paragraph">Select the player that made the result</p>
            <input 
                {...register('exerciseId', { required: true })}
                type="string" 
                hidden 
                value={exercise.id}     
            />

            <div className="form-input">
                <label className="form-input__label">Player</label>
                <select 
                    {...register('playerId', { required: true })}
                >
                    {
                        players.map(player => (
                            <option key={player.id} value={player.id}>{player.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="form-input">
                <label className="form-input__label">Result</label>
                <input 
                    {...register('result', { required: true })}
                    type="number" 
                    placeholder="Write the result of the exercise" 
                />
            </div>

            <ButtonForm 
                text="Register"
            />
        </form>
    )
}