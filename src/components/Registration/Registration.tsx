import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
    MainWrapper,
    RegistrationForm,
    RegistrationField,
    MessageBox
} from './RegistrationStyles';

import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import Button from '@mui/material/Button';

const formData = new FormData();
const registrationURL = 'http://localhost/bug-tracker-backend/registration.php';

function Registration() {
    const { setUsername } = useContext(AppContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isUserAlreadyKnown, setIsUserAlreadyKnown] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: yup.object({
            username: yup.string()
            .min(3, 'Username must contain between 3 and 30 characters')
            .max(30, 'Username must contain between 3 and 30 characters')
            .required('Username is required'),
            password: yup.string()
            .min(3, 'Password must contain between 3 and 60 characters')
            .max(60, 'Password must contain between 3 and 60 characters')
            .required('Password is required')
        }),
        onSubmit: values => {
            formData.append('values', JSON.stringify(values));
            axios({
                method: 'post',
                url: registrationURL,
                data: formData,
                withCredentials: true
            })
            .then(res => {
                switch(res.data.status) {
                    case true:
                        setUsername(res.data.username);
                        navigate('/dashboard');
                        break;
                    case false:
                        setIsUserAlreadyKnown(true);
                }
            });
        }
    });

    const handlePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    return(
        <MainWrapper>
            {isUserAlreadyKnown && <MessageBox>User already exists!</MessageBox>}
            <RegistrationForm 
            onSubmit={formik.handleSubmit}>
                <RegistrationField
                type='text'
                label='Username'
                name='username'
                error={
                    formik.touched.username &&
                    formik.errors.username ?
                    true : false
                }
                helperText={
                    formik.touched.username &&
                    formik.errors.username ?
                    formik.errors.username :
                    null
                }
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete='off' 
                variant='outlined' 
                size='small'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <PersonIcon sx={{color: 'var(--primary-color)'}} />
                        </InputAdornment>
                    )
                }} />

                <RegistrationField
                type={isPasswordVisible ? 'text' : 'password'}
                label='Password'
                name='password'
                error={
                    formik.touched.password &&
                    formik.errors.password ?
                    true : false
                }
                helperText={
                    formik.touched.password &&
                    formik.errors.password ?
                    formik.errors.password :
                    null 
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete='off'
                variant='outlined' 
                size='small'
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton 
                            onClick={handlePasswordVisibility}
                            sx={{padding: 0}}>
                                {
                                    isPasswordVisible ? 
                                    <KeyOffIcon sx={{color: 'var(--primary-color)'}} /> : 
                                    <KeyIcon sx={{color: 'var(--primary-color)'}} /> 
                                }
                            </IconButton>
                        </InputAdornment>
                    )
                }} />
                    
                <Button
                sx={{ mt: 3 }}
                type='submit'
                variant='contained'
                size='medium'>
                Register
                </Button>
            </RegistrationForm>
        </MainWrapper>
    )
}

export default Registration;