import React from 'react'
import { format } from 'date-fns'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Exercise } from '../../../dto/exercise'
import { FORMAT } from '../../../tools/dateFormats'
import './styles.scss'

export type LineGraphType = {
    date: string,
    result: number 
}

interface LineGraphProps {
    exercises: Exercise[]
}

export const LineGraph:React.FC<LineGraphProps> = ({ exercises }) => {

    const transformDataToGraph = (exercises:Exercise[]) => {
        const formatedData:LineGraphType[] = [] 
        for(let i = 0; i < exercises.length; i++) {

            if (i === 5 ) break

            if(!exercises[i].date || !exercises[i].result) {
                continue
            } 
            formatedData.push({date: format(new Date(exercises[i].date || ''), FORMAT), result: exercises[i].result || 0})
        }
        return formatedData.sort((a,b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
    }

    return (
        <article className="graph-line">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart className="graph-line__chart" data={transformDataToGraph(exercises)}>
                    <Line type="monotone" dataKey="result" name="date" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                </LineChart>
            </ResponsiveContainer>
        </article>
    )
}