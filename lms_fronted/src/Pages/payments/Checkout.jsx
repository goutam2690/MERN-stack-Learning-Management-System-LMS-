import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRazorpayId, purchaseCourse, verifyUserPayment } from '../../Redux/slices/razorpaySlice.jsx';
import toast from 'react-hot-toast';
import { BiRupee } from 'react-icons/bi';


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);
    const userData = useSelector((state) => state?.auth?.data);
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    const handleSubscription = async (e) => {
    try {
        e.preventDefault();

        if (!razorpayKey || !subscription_id) {
            toast.error("something went wrong");
            return;
        }


        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "Coube Pvt. Ltd.",
            description: "subscription",
            theme: {
                color: "#012652"
            },
            prefill: {
                email: userData.email,
                name: userData.fullName
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id,
                    paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id,
                    paymentDetails.razorpay_signature = response.razorpay_signature;

                toast.success("Payment Successfull");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail")

            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        toast.error("subscription error :" , error)
        console.log(error)
    }
    }


    const load = async () => {
        await dispatch(getRazorpayId());
        await dispatch(purchaseCourse());
    }

    useEffect(() => {
        load();
    }, [])

    return (
        <div>
            <HomeLayout>
                <form
                    onSubmit={handleSubscription}
                    className='min-h-[90vh] flex items-center justify-center text-white'
                >

                    <div className='w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_gray] rounded-lg relative'>
                        <h1 className='bg-yellow-500 top-0 absolute w-full font-bold py-3 text-center text-xl rounded-sm'>Subscription Bundle</h1>
                        <div className='px-5 space-y-5 text-center'>
                            <p>This purchase will allow you to access all the lectures and videos for</p>
                            <span className='font-semibold text-yellow-500'>1 year duration.</span>
                            {/* <p>All the existing and new courses will be also available</p> */}

                            <p className='flex items-center justify-center gap-2 text-2xl font-bold text-yellow-500'>
                                <BiRupee /><span>499</span>only
                            </p>

                            <div className='text-gray-200'>
                                <p>1 year of duration</p>
                                <p>*Terms and conditions applied*</p>

                            </div>

                            <button type='submit' className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 py-2 font-bold rounded'>
                                Buy Now
                            </button>
                        </div>

                    </div>



                </form>
            </HomeLayout>
        </div>
    )
}

export default Checkout;
