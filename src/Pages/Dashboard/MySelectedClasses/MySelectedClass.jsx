import React from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


const MySelectedClass = ({ selectedClass, i, handleDelete }) => {
    const { _id, className, instructorName, price } = selectedClass;



    return (
        <tr className="hover">
            <th>{i + 1}</th>
            <td>{className}</td>
            <td>{instructorName}</td>
            <td>${price}</td>
            <td>
                <button className="btn btn-square btn-outline">
                    <FaMoneyCheckAlt></FaMoneyCheckAlt>
                </button>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
        </tr>
    );
};

export default MySelectedClass;