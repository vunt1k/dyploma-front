import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import {getRequest} from '../../utils/helpers/request.helpers';
import { Spin } from 'antd';
import { CourseInfoCard } from '../../components/course-info-card/course-info-card'

export const SubscribtionPage = () => {
    const [course, setCourse] = useState({});
    const { courseId } = useParams();
    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        const getCourseById = async () => {
            setSpinning(true);
            console.log('courseId', {courseId})
            const { data } = await getRequest(`/Courses/GetCourseById/${courseId}`);
            setCourse(data);
            console.log('halo',{course})
            setSpinning(false);
        }
        getCourseById();
    }, [courseId])

    return (
        <Spin spinning={spinning}>
            <CourseInfoCard {...course}/>
            {/* {course ? <CourseInfoCard {...course}/> : <Redirect to="/404"/>} */}
        </Spin>
    );
};