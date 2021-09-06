import React from 'react'
import './expendable-course-card.scss'

export const ExpendableCourseCard = ({id, name, startDate, endDate}) => 
<p> {id}) <span className="textAccent">Course:</span> {name} <span className="textAccent">Date:</span> <b>{startDate}</b> | <b>{endDate}</b></p>
