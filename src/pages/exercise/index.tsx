import React, { useContext } from 'react'
import { DashboardLayout } from '../../layouts/dashboard'
import { ExercisesContext } from '../../contexts/exercises'
import { UserContext } from '../../contexts/user'

import { ExerciseCategoryCard } from '../../components/exercises/category'
import { ButtonCircle } from '../../components/buttons/circle'
import { Button } from '../../components/buttons/simple'
import { renderPurposes } from '../../containers/exerciseContainers/purposes'

import './styles.scss'
import { MdAdd, MdEdit } from 'react-icons/md'

export const Exercise:React.FC = () => {

    const { exercise } = useContext(ExercisesContext)
    const { role } = useContext(UserContext)
    

    if(!exercise) {
        return (
            <DashboardLayout>
            <article className="flex flex-col exercise exercise__header">
                <h1 className="exercise__header-title">Exercise 🔥</h1>
                <p className="content__paragraph">You must need select a exercise</p>
            </article>
        </DashboardLayout>
        ) 
    }

    return (
        <DashboardLayout>
            <article className="flex flex-col exercise exercise__header">
                <h1 className="exercise__header-title">Exercise 🔥</h1>
                <h2 className="content__title">{exercise.title}</h2>
                {
                    exercise.videoUrl && (
                        <iframe className="exercise__video" src={`https://www.youtube.com/embed/${exercise.videoUrl}`} title={exercise.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen  />
                    )
                }
            </article>


            <article className="exercise exercise__about">
                <h2 className="content__title">Description</h2>
                <p className="content__pargraph">{exercise.description}</p>
                <h3 className="m-t-xl content__sub-title">Category</h3>
                <ExerciseCategoryCard category={exercise.category} />
            </article>

            <article className="flex flex-row align-center justify-start exercise exercise__buttons">
                <Button 
                    text="History"
                    action={() => {}}
                />
                <ButtonCircle 
                    Icon={MdAdd}
                    action={() => {}}
                />
                {
                    role === 'coach' && (
                        <ButtonCircle 
                            Icon={MdEdit}
                            action={() => {}}
                        />
                    )
                }
            </article>

            <article className="exercise exercise__purposes">
                <h2 className="content__title">Purposes</h2>
                {
                    renderPurposes(exercise.purposes)
                }

            </article>

        </DashboardLayout>
    )
}