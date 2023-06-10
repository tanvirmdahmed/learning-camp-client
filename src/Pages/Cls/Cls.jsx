import React from 'react';

const Cls = ({ cls }) => {
    console.log(cls);

    const { _id, className, classImage, instructorName, availableSeats, price } = cls;
    console.log(classImage);

    return (
        <div>
            <div className={availableSeats === 0 ? 'card card-compact w-[80%] bg-red-400 shadow-xl mx-auto' : 'card card-compact w-[80%] bg-base-100 shadow-xl mx-auto'}>
                <figure><img src={classImage} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{className}</h2>
                    <p><strong>Instructor Name:</strong> {instructorName}</p>
                    <p><strong>Available Seats:</strong> {availableSeats}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <div className="">
                        <button className={availableSeats === 0 ? 'btn bg-red-800 border-none text-white' : 'btn btn-neutral border-none'}>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cls;