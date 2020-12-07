import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'

export default function Error({ mensaje, esconderError }) {
    if (!mensaje) {
        return null;
    }
    return (
        <div className="ErrorContainer" role="alert">
            <div class="Error__inner">
                <span className="block">{mensaje}</span>
                <button onClick={esconderError} className="Error__button">
                    <FontAwesomeIcon className="Error__icon" icon={faTimesCircle} />
                </button>
            </div>
        </div>
    )
}