import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './checkoutForm.css'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";



const CheckoutForm = ({ selectedClass, closeModal }) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);


    useEffect(() => {
        if (selectedClass.price > 0) {
            axiosSecure
                .post("/create-payment-intent", { price: selectedClass.price })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [selectedClass, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("error", error);
            setCardError(error.message);
        } else {
            setCardError("");
            // console.log('payment method', paymentMethod)
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous",
                    },
                },
            });

        if (paymentIntent.status === 'succeeded') {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Enrollment Successful!, TransactionId: ${paymentIntent.id}`,
                showConfirmButton: false,
                timer: 2500
            });
        }

        console.log(paymentIntent, confirmError, clientSecret);
        if (confirmError) {
            setCardError(confirmError.message);
        }

        console.log("payment intent", paymentIntent);

        if (paymentIntent.status === "succeeded") {
            // save payment information to the server
            const paymentInfo = {
                ...selectedClass,
                transactionId: paymentIntent.id,
            };
            axiosSecure.post("/enrolledClass", paymentInfo).then((res) => {
                if (res.data.insertedId) {
                    // updateStatus(selectedClass.classId, true)
                    //   .then(data => {
                    //     setProcessing(false)
                    //     console.log(data)
                    //     const text = Enrollment Successful!, TransactionId: ${paymentIntent.id}
                    //     toast.success(text)
                    //     // navigate('/dashboard/my-bookings')
                    //     closeModal()
                    //   })
                    //   .catch(err => console.log(err))
                    setProcessing(false);
                    // const text = `Enrollment Successful!, TransactionId: ${paymentIntent.id}`;
                    navigate('/dashboard/enrolled-classes')
                    closeModal();
                }
            });
        }
    };
    return (
        <>
            <form className="my-2" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />

                <div className="flex mt-2 justify-around">
                    <button
                        type="button"
                        className="btn btn-neutral btn-sm"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret || processing}
                        className="btn btn-success btn-sm"
                    >
                        {`Pay $${selectedClass?.price}`}
                    </button>
                </div>
            </form>
            {cardError && <p className="text-red-600 ml-8">{cardError}</p>}

        </>
    );
};

export default CheckoutForm;