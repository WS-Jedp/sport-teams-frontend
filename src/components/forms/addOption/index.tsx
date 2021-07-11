import React, { useState, ChangeEventHandler } from 'react'
import { MdAdd } from 'react-icons/md'
import { ButtonCircle } from '../../buttons/circle'

interface FormAddOption {
    elements: {title: string, id: number}[],
    onAdd: (element:{title: string, id: number}) => void
}

export const FormAddOption:React.FC<FormAddOption> = ({ elements, onAdd }) => {

    const [currentElement, setCurrentElement ] = useState<{title: string, id: number}>(elements[0])

    const getElement = (id:number) => {
        return elements.filter(element => element.id === id)[0]
    }
    const handleCurrentElement:ChangeEventHandler<HTMLSelectElement> = (ev) => {
        const element = getElement(Number(ev.currentTarget.value))
        setCurrentElement(element)
        return element
    }

    return (
        <div className="flex flex-row align-start justify-center form-add-option">
            <select onChange={handleCurrentElement}>
                {
                    elements.map(element => (
                        <option key={element.id} value={element.id}>{element.title}</option>
                    ))
                }
            </select>
            <ButtonCircle 
                Icon={MdAdd}
                action={() => onAdd(currentElement)}
            />
        </div>
    )
}
