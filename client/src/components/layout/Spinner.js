import React, {Fragment} from 'react';
import Spinner from './spinner.gif'

const spinner = () => {
    return (
        <Fragment>
            <img src={Spinner} alt='loading...' style={{width: '60px', margin: 'auto', display: 'block'}}/>
        </Fragment>
    )
}

export default spinner;
