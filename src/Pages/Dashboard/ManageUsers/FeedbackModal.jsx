import React from 'react';

const FeedbackModal = ({ cls, handleSendFeedback }) => {

    // const { _id, price, quantity, description } = myToy;

    return (
        <div>
            {/* modal body */}
            <input type="checkbox" id={cls._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box whitespace-normal items-start">
                    <label htmlFor={cls._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* <h1 className='text-2xl font-bold'>{toyName}</h1> */}
                    <form onSubmit={(event) => handleSendFeedback(event, cls)}>
                        <div className="mb-3">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Feedback</span>
                                </label>
                                <label>
                                    <textarea type="text" className="textarea input-bordered w-full" name="feedback" placeholder="Give Feedback"></textarea>
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Send Feedback" className="btn btn-block btn-success border-none" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;