import React from 'react'
import { getRequest } from '../../utils/helpers/request.helpers';
import { useEffect } from 'react';
import { useState } from 'react';
import { ExpendableCourseCard } from '../expendable-cours-card/expendable-course-card';
import { Spin } from 'antd';

export const CourseExpandableList = ({email}) => {
    const [courses, setCourses] = useState([{}]);
    const [ spinner, setSpinner] = useState(true);

    useEffect(() => {
        const fetchCourses = async () =>{
            const { status, data } = await getRequest(`/Courses/GetCoursesByStudentEmail/${email}`);
            console.log(data);
            if(status === 200){
                var i = 1;
                data.forEach(x => {
                    x.id = i;
                    i+=1;
                });
                setCourses(data);
            }
            setSpinner(false);
        }
        if(email){
            fetchCourses();
        }
    }, [email])

    return (
        <Spin spinning={spinner}>
            <div>
                { courses[0].id ? courses.map(course => <ExpendableCourseCard className="card" key={course.id} {...course}/>) : <p>This user has not subscribed to any courses</p>}
            </div>
        </Spin>
    )
}