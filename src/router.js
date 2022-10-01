import React, { createContext, useReducer } from 'react'

import ValidationOTP from './pages/ValidationOTP/ValidationOTP'
import Registration from './pages/RegistrationPage/Registration'


export const routes = [
    {
        COMPONENT: <Registration />,
        PATH: '/'
    },
    {
        COMPONENT: <ValidationOTP />,
        PATH: '/ValidationOTP'
    },

    // {
    //     COMPONENT: < />,
    //     PATH: '/'
    // }

]