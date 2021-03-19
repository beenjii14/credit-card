import React, { useState } from 'react';
import { validateFilds, messageAlert} from '../helpers';
import '../assets/styles/App.scss';

const App = () => {
    const [data, setData] = useState({});
    const [cvv, setCvv] = useState({ showCvv: false });

    const onFocus = () => {
        setCvv({ showCvv: true });
    };

    const onFocusOut = () => {
        setCvv({ showCvv: false });
    };
  
    const handleChange = event => {
        const { name, value } = event.target;
        const dataForm = Object.assign({}, data);
        dataForm[name] = value;
        setData(dataForm);
    };

    const handleSubmit = () => {
        const dataForm = Object.assign({}, data);
        const dataValidate = [];
        dataValidate.push(dataForm.cardNumber);
        dataValidate.push(dataForm.cardName);
        dataValidate.push(dataForm.month);
        dataValidate.push(dataForm.year);
        dataValidate.push(dataForm.cvvValue);
        validateFilds(dataValidate, valid => {
            if (valid) {
                messageAlert({ type: 'success', title: 'Todo chido' });
            } else {
                messageAlert({ type: 'info', title: 'Faltan campos requeridos' });
            }
        });
    };
    
    const { cardNumber, cardName, month, year, cvvValue } = data;
    return (
        <div className="App">
            <div className="card">
                <div className={`credit-card ${cvv.showCvv ? 'active' : ''}`}>
                    <div className="card-1">
                        <p className="num-card">
                            {cardNumber ? cardNumber.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ') : ''}
                        </p>
                        <p className="expired">{ month ? month : ''}/{ year ? year : ''}</p>
                        <p className="name">{ cardName ? cardName.trim() : '' }</p>
                    </div>
                    <div className="card-2">
                        <p className="cvv">{cvvValue ? cvvValue : ''}</p>
                    </div>
                </div>
                <form autoComplete={'off'}>
                    <div className="cont-input">
                        <label>Card Number</label>
                        <input type="number" name="cardNumber"
                            value={cardNumber ? cardNumber : ''}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="cont-input">
                        <label>Card Name</label>
                        <input type="text" name="cardName"
                            value={cardName ? cardName : ''}
                            onChange={handleChange} />
                    </div>

                    <div className="complementary">
                        <div className="cont-input">
                            <label htmlFor="">Month</label>
                            <input type="text" name={'month'}
                                value={month ? month : ''}
                                onChange={event => (event.target.value.length < 3) ? handleChange(event) : null}
                            />
                        </div>

                        <div className="cont-input">
                            <label htmlFor="">Year</label>
                            <input type="text" name={'year'}
                                value={year ? year : ''}
                                onChange={event => (event.target.value.length < 5) ? handleChange(event) : null}
                            />
                        </div>

                        <div className="cont-input">
                            <label htmlFor="">Cvv</label>
                            <input type="number" name="cvvValue"
                                value={cvvValue ? cvvValue : ''}
                                onChange={event => (event.target.value.length < 5) ? handleChange(event) : null}
                                onFocus={onFocus}
                                onBlur={onFocusOut}
                            />
                        </div>
                    </div>

                    <button className="submit" type="button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default App;
