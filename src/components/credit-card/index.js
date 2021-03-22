import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/App.scss';
import { cardFormat } from '../../helpers';

const CreditCard = ({ onSubmit, loading }) => {
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
  
    const { cardNumber, cardName, month, year, cvvValue } = data;

    return (
        <div className="App">
            <div className="card">
                <div className={`credit-card ${cvv.showCvv ? 'active' : ''}`}>
                    <div className="card-1">
                        <p className="num-card">
                            {cardNumber ? cardFormat({ card: cardNumber}) : ''}
                        </p>
                        <p className="expired">{month ? month : ''}/{year ? year : ''}</p>
                        <p className="name">{cardName ? cardName.toUpperCase().trim() : ''}</p>
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
                            onChange={event => (event.target.value.length <= 16) ? handleChange(event) : null}
                        />
                    </div>

                    <div className="cont-input">
                        <label>Card Name</label>
                        <input type="text" name="cardName"
                            value={cardName ? cardName.toUpperCase() : ''}
                            onChange={handleChange}
                        />
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

                    <button className="submit" type="button" disabled={loading} onClick={() => onSubmit(data)}>Submit</button>
                </form>
            </div>
        </div>
    );
};

CreditCard.defaultProps = {
    onSubmit: f => f,
    loading: false
};

CreditCard.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default CreditCard;
