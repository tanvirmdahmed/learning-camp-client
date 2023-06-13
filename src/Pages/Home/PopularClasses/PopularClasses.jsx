import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import { Fade } from 'react-awesome-reveal';

const PopularClasses = () => {
    const { data: popularClasses = [], refetch } = useQuery(['popularClasses'], async () => {
        const res = await axios.get('http://localhost:5000/popularClasses')
        return res.data;
    })
    console.log(popularClasses);

    return (
        <div className='my-12'>
            <Title title='Popular Classes'></Title>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <Fade delay={1e3} cascade damping={1e-1}>
                    {
                        popularClasses.map(cls => <div key={cls._id}>
                            <div className='card card-compact w-96 h-[420px] bg-base-100 shadow-xl mx-auto'>
                                <figure><img src={cls.classImage} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{cls.className}</h2>
                                    <p><strong>Instructor Name:</strong> {cls.instructorName}</p>
                                    <p><strong>Available Seats:</strong> {cls.availableSeats}</p>
                                    <p><strong>Enrolled Students:</strong> {cls.enrolledStudents}</p>
                                    <p><strong>Price:</strong> ${cls.price}</p>
                                    <div className="">
                                        <Link to='/classes' className='btn btn-warning rounded-xl'>Enroll Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </Fade>
            </div>
        </div>
    );
};

export default PopularClasses;