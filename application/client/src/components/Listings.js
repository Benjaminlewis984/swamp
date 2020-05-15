import React, { Component } from 'react'

const getListings = () => {
    console.log('Retrieving listings');
    const axios = require('axios');
    axios.defaults.withCredentials = true;
    


        axios.post(`http://18.191.184.143:3001/listings`, {"username": "onu"}

        )
            .then((res) => {
                console.log(res);
    

            }).catch(err => console.log("Did not upload"));
    
}


export default class Listings extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
