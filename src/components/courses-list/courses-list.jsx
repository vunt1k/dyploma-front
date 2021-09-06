import React, { useState, useEffect } from 'react'
import { getRequest } from '../../utils/helpers/request.helpers';
import { CourseCard } from '../course-card/course-card';

import './courses-list.scss';
import { Spin } from 'antd';

export const CourseList = ({url}) => {
    const [courses, setCourses] = useState([]);
    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        const getCourses = async () => {
            const {status, data} = await getRequest(url);
    
            if(status === 200)
            {
                setCourses(data);
                console.log(data);
            }
        }
        getCourses();
        setSpinning(false);
    }, [url]);

    return (
        <Spin spinning={spinning}>
            <div className="container">
                {courses.map(course => <CourseCard className="card" key={course.id} {...course} />)}
            </div>
        </Spin>
    )
}
