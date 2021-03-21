import React, { useState } from 'react';
import axios from 'axios';
import CreditCard from './credit-card';
import { validateFilds, messageAlert } from '../helpers';

import config from '../../config.json';

const App = () => {
    const [loadSubmit, setLoadSubmit] = useState(false);

    const handleSubmit = data => {
        const dataForm = Object.assign({}, data);
        const dataValidate = [];
        dataValidate.push(dataForm.cardNumber);
        dataValidate.push(dataForm.cardName);
        dataValidate.push(dataForm.month);
        dataValidate.push(dataForm.year);
        dataValidate.push(dataForm.cvvValue);
        validateFilds (dataValidate, async(valid) => {
            if (valid) {
                const dataSend = {
                    cardNumber: dataForm.cardNumber,
                    cardName: dataForm.cardName,
                    cvv: dataForm.cvvValue,
                    expiration: `${dataForm.month}/${dataForm.year}`
                };
                setLoadSubmit(true);
                axios.post(`${config.api}/api/v1/card`, dataSend, { headers: {}})
                    .then(response => {
                        setLoadSubmit(false);
                        messageAlert({ type: 'info', title: response.data.message });
                    })
                    .catch((error) => {
                        setLoadSubmit(false);
                        messageAlert({ type: 'info', title: error.response.data.message });
                    });
            } else {
                messageAlert({ type: 'info', title: 'Faltan campos requeridos' });
            }
        });
    };
    
    
    return (
        <>
            <CreditCard
                loading={loadSubmit}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default App;
