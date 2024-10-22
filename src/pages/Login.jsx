import { useContext } from 'react';
import logo from '../assets/logo.png';
import bgLogin from '../assets/bgLogin.png';
import { Button, Input, Divider,  Link } from '@nextui-org/react';
import { useState } from 'react';
import { EyeSlashFilledIcon } from '../assets/login/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../assets/login/EyeFilledIcon';
import { useFormik } from 'formik';
import { authValidate } from '../security/authValidate';
import { AuthContext } from '../context/AuthContext';
import {ToastContainer} from 'react-toastify';

const initialValues = { username: '', password: ''} 

export const Login = () => {

    const { login, loader } = useContext(AuthContext)
    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues,
        onSubmit: async({username, password}, {resetForm}) => {
            // (remember) 
            //     ? localStorage.setItem('username', JSON.stringify(username))
            //     : localStorage.removeItem('username')
            await login({username, password})
            return resetForm() 
        },
        validate: values => authValidate({values})
    })

    return (
        <div className='h-full'> 
            <div className='grid grid-cols-12 h-full'>
                <div className='col-span-12 md:col-span-5 gap-3 px-8 w-full flex flex-col'>
                    <div className='mt-20 flex items-center justify-center'>
                        <img className='h-[60px]' src={logo} alt="logo" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xl font-medium" >Inicia sesión</h4>
                        <p className="text-small text-default-400">Ingresa las credenciales asignadas para acceder</p>
                    </div>
                    
                    <Divider className="my-4" />
                    
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <ToastContainer
                            
                        />
                        <div className='flex flex-col'>
                            <Input 
                                name='username'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                
                                isInvalid={errors.username && touched.username}
                                errorMessage={errors.username && touched.username && 'El campo usuario es obligatorio'}
                                isRequired
                                isDisabled={loader}
                                
                                size='sm' 
                                type="text" 
                                label="Ingresa tu usuario" 
                            />
                        </div>
                        
                        <div className='flex flex-col'>
                        <Input
                            name='password'
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            
                            isInvalid={errors.password && touched.password}
                            errorMessage={errors.password && touched.password && 'El campo contraseña es obligatorio'}
                            isDisabled={loader}
                            
                            isRequired
                            label="Ingresa tu contraseña"
                            size='sm'
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            required
                            type={isVisible ? "text" : "password"}
                        />
                        </div>
                        {/* <Checkbox defaultChecked name='remember' onChange={handleChange} value={values.remember}  size="md">Recordar usuario</Checkbox> */}

                        <Button 
                            isDisabled={(touched.username && values.username?.length == 0) || (touched.username && values.password?.length == 0)}
                            type='submit' 
                            color="primary" 
                            isLoading={loader}
                            variant="shadow"
                        >
                            {(loader) 
                                ? 'Verificando datos...'
                                : 'Iniciar sesión'
                            }
                        </Button> 
                        <p className='text-center'>Desarrollado con 💖 por <Link href='https://t.me/hookom' isExternal  key={'tg'} >@hookom119</Link></p>
                    </form> 
                </div>

                <div
                    style={{ 
                        backgroundImage: `url(${bgLogin})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }} 
                    className='hidden md:col-span-7 h-screen md:flex justify-end items-start'>
                </div>
            </div>
        </div>
    )
}
