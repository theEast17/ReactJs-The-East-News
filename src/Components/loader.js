import React, { Component } from 'react'
import Loader from './1488 (1).gif';

export default class loader extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center'>
                <img src={Loader} alt="loading" />
            </div>
        )
    }
}
