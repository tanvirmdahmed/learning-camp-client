import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './checkoutForm.css'
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";



const CheckoutForm = ({ selectedClass, closeModal, refetch }) => {
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


        console.log(paymentIntent, confirmError, clientSecret);
        if (confirmError) {
            setCardError(confirmError.message);
        }

        console.log("payment intent", paymentIntent);

        if (paymentIntent.status === "succeeded") {
            Swal.fire({
                title: 'Payment Successful!',
                text: `TransactionId: ${paymentIntent.id}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            })

            // save payment information to the server
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: selectedClass.price,
                date: new Date(),
                id: selectedClass._id,
                classId: selectedClass.classId,
                classImage: selectedClass.classImage,
                status: 'Payment Successful',
                className: selectedClass.className,
                instructorName: selectedClass.instructorName
            }

            axiosSecure.post('/payments', payment)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.insertedId) {

                    }
                })


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