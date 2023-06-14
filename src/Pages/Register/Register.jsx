import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import reg from '../../../public/register.json';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const { googleSignIn, createUser, updateUserProfile } = useAuth();
    const [notMatch, setNotMatch] = useState('')

    const from = location.state?.from?.pathname || "/";

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirm = () => {
        setShowConfirm(!showConfirm);
    };


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, photo: loggedInUser.photoURL }
                fetch('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }


    const onSubmit = data => {
        if (data.password !== data.confirm) {
            setNotMatch('Passwords do not match');
            return;
        }

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, photo: data.photoURL }
                        console.log(saveUser);
                        fetch('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                    console.log(data);
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
    };


    return (
        <div className='px-3 md:lg:px-0'>
            <div className="hero bg-image rounded-lg my-12">
                <div className="hero-content flex flex-col md:flex-row lg:flex-row w-full my-10">
                    <div>
                        <Lottie animationData={reg} className='w-full'></Lottie>
                    </div>
                    <div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold">Please Register!!!</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name*</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL*</span>
                                    </label>
                                    <input type="url" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email*</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password*</span>
                                    </label>
                                    <div>
                                        <div className='w-full h-12 relative' >
                                            <input type={showPassword ? 'text' : 'password'} {...register("password", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])/,
                                                pattern1: /(?=.*[!@#$&*])/
                                            })} placeholder="Password" className="input input-bordered border-[#d2d4d7] w-full h-full bg-transparent" />
                                            {showPassword ? <FaEyeSlash className='text-sky-600 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer' onClick={toggleShowPassword} /> : <FaEye className='text-sky-600 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer' onClick={toggleShowPassword} />}
                                        </div>
                                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase</p>}
                                        {errors.password?.type === 'pattern1' && <p className="text-red-600">Password must have one Special Character</p>}
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Confirm Password*</span>
                                    </label>
                                    <div>
                                        <div className='w-full h-12 relative' >
                                            <input type={showConfirm ? 'text' : 'password'} {...register("confirm", {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 20,
                                                pattern: /(?=.*[A-Z])/,
                                                pattern1: /(?=.*[!@#$&*])/
                                            })} placeholder="Confirm Password" className="input input-bordered border-[#d2d4d7] w-full h-full bg-transparent" required />
                                            {showConfirm ? <FaEyeSlash className='text-sky-600 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer' onClick={toggleShowConfirm} /> : <FaEye className='text-sky-600 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer' onClick={toggleShowConfirm} />}
                                        </div>
                                        {errors.confirm?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                        {errors.confirm?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                        {errors.confirm?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                        {errors.confirm?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase</p>}
                                        {errors.confirm?.type === 'pattern1' && <p className="text-red-600">Password must have one Special Character</p>}
                                        <p className="text-red-600">{notMatch}</p>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-outline btn-primary">Register</button>
                                </div>
                                <label className="label">
                                    <p>Already have an Account? <Link to="/login" className='text-blue-600 underline'>Login</Link></p>
                                </label>
                            </form>
                        </div>
                        <div className="flex flex-col w-full border-opacity-50">
                            <div className="divider">OR</div>
                        </div>
                        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                            <div className='px-8 mt-8 mx-auto'>
                                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-lg btn-outline mb-4 gap-2"><FaGoogle></FaGoogle></button>
                                {/* <button onClick={handleGithubSignIn} className="btn btn-outline w-full mb-8 gap-2"><FaGithub></FaGithub> Register with GitHub</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;