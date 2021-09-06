import React from 'react'
import { CourseList } from '../../components/courses-list/courses-list'

import './courses-page.scss';

export const CoursesPage = () => {
    return (
        <div className="container2">
            <CourseList url="/Courses/GetAllCourses"/>
        </div>
    )
}