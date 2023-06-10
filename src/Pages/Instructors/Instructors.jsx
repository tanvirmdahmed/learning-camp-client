import React, { useEffect, useState } from 'react';
import Title from '../../components/Title/Title';

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])

    return (
        <div>
            <Title title='All Instructors'></Title>
            <div>
                {

                }
            </div>
        </div>
    );
};

export default Instructors;