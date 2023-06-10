import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import reg from '../../../public/register.json';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { googleSignIn, signIn } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || "/";

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true });
            })
            .catch(error => {
            })
    }


    const onSubmit = data => {
        setError('');
        console.log(data.email, data.password);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result);
                const loggedUser = result.user;
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User Logged in successfully.',
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
                console.log(error.message);
            })
    }

    return (
        <div className='px-3 md:lg:px-0'>
            <div className="hero bg-image rounded-lg my-12">
                <div className="hero-content flex flex-col md:flex-row lg:flex-row w-full my-10">
                    <div>
                        <Lottie animationData={reg} className='w-full'></Lottie>
                    </div>
                    <div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold">Please Login!!!</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                        <p className="text-red-600">{error}</p>
                                    </div>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                <div className="form-control mt-6">
                                    <button className="btn btn-outline btn-primary">Login</button>
                                </div>
                                <label className="label">
                                    <p>Don't Have an Account? <Link to="/register" className='text-blue-600 underline'>Register</Link></p>
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

export default Login;