import React from 'react';
import { RegistrationForm } from '../../components/register-form/register-form';

import './register-page.scss';

export const RegisterPage = () => {
    return (
        <div className="register-container">
            <RegistrationForm />
        </div>
    )
}