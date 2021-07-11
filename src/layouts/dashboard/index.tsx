import React from 'react'
import { Nav } from '../../components/commons/nav' 

export const DashboardLayout:React.FC = ({ children }) => {
    
    return (
        <section className="dashboard">
            <div className="dashboard__content">
                {
                    children
                }
            </div>
            <div className="dashboard__nav">
                <Nav />
            </div>
        </section>
    )
}