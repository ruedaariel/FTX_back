
import React, { useState } from 'react';
import { loginSchema } from '../../../../schemas/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';




const LoginFormSection = ({ logo }) => {
    // handlers, state, submit, etc. — agregalos según tu lógica
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    // const onSubmit = async (data: LoginFormDat
    // a) => {
    const onSubmit = async (data) => {
        try {
            console.log('Login data validated:', data);
            // await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Login exitoso! (simulado)');
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    const handleRegister = () => {
        console.log('Register clicked');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Logo */}
                    <div className="text-center mb-4 d-lg-none">
                        <img src={logo} alt="FTX" style={{ height: '50px' }} />
                    </div>

                    {/* Welcome */}
                    <div className="text-center mb-4">
                        <h1 className="fs-1 login-text fw-bold">Bienvenido</h1>
                        <p className="fs-5 login-subtitulo">Ingresa tus credenciales</p>
                    </div>

                    {/* Form */}

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="needs-validation space-y-6"
                        noValidate
                    >
                        {/* Email */}
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Correo, ej: uncorreo@ejemplo.com"
                                {...register('email')}
                                className={`form-control login-form-control ${errors.email ? 'is-invalid' : ''}`}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email.message}</div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-3 position-relative ">
                            <div className='login-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Contraseña"
                                    {...register('password')}
                                    className={`form-control login-form-control ${errors.password ? 'is-invalid' : ''}`}
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                />

                                <button
                                    type="button"
                                    /*  onClick={() => setShowPassword(!showPassword)}
                                     className="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
                                 >
                                     {showPassword ? 'Ocultar' : 'Mostrar'} */
                                    onClick={() => setShowPassword(s => !s)}
                                    className="login-btn-password-toggle"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                                 {errors.password && (
                                <div id="password-error" className="invalid-feedback">{errors.password.message}</div>
                            )}
                            </div>
                           
                        </div>

                        {/* Forgot Password */}
                        <div className="text-center mb-3 login-olvidaste-pass">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="btn btn-link login-text-secondary"
                            >
                                ¿Olvidaste el password?{' '}
                                <span className="login-text fw-semibold">Ir a resetear</span>
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn login-btn w-100 fw-bold"
                        >
                            {isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>

                        {/* Register */}
                        <div className="text-center mt-4">
                            {/* <span className="login-text-secondary">¿No tienes cuenta? </span> */}
                            <button
                                type="button"
                                onClick={handleRegister}
                                className="btn btn-link login-text-secondary"
                            >
                                ¿No tienes cuenta?{' '}
                                <span className="login-text fw-semibold">Regístrate</span>
                            </button>
                        </div>
                    </motion.form>


                </motion.div>
            </div>
        </div >
    );
}

export default LoginFormSection;
