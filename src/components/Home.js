import React,{useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
const initialDate = new Date().toISOString().slice(0, 10);
const [state, setstate] = useState([]);
const [pincode, setpincode] = useState('560001');
const [input, setinput] = useState('');
const [dates, setdates] = useState(initialDate)
useEffect(() => {
    
    console.log('hell');
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${new Date(dates).toLocaleDateString('en-GB').split('/').join('-')}`)
    .then(response => {

        let newState = response.data.sessions.filter((data) => {
            return data.min_age_limit < 30 && data.available_capacity > 0;
        })
        setstate(newState);
        console.log(newState);
    })
    .catch(error => console.log(error))
    
}, [pincode,dates]);

const onSubmitHandler = (event) => {
    event.preventDefault();
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${new Date(dates).toLocaleDateString('en-GB').split('/').join('-')}`)
    .then(response => {

        let newState = response.data.sessions.filter((data) => {
            return data.min_age_limit < 30 && data.available_capacity > 0;
        })
        setstate(newState);
        console.log(newState);
    })
    .catch(error => console.log(error))
}

    return (
        <div className="container">
            <div className="row">
            <div className="col-md-8 form-container">
                <div className="d-flex justify-content-between">
                    <span>Date: {new Date(dates).toLocaleDateString('en-GB').split('/').join('-')}</span>
                    <span>Pincode: {pincode}</span>
                </div>
            <hr />
            <table className="table table-bordered">
            <thead>
            <tr>
                <th>Hospital</th>
                <th>Age</th>
                <th>Available</th>
            </tr>
            </thead>
            <tbody>
            {state.map(center => <tr>
                <td>{center.name}</td>
                <td>{center.min_age_limit}</td>
                <td>{center.available_capacity}</td>
            </tr>)}
            {state.length?"": <tr><td colSpan="3">No Vaccine Available</td></tr>}
            </tbody>
        </table>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3 form-container">
            <h5>Search By Pincode</h5>
            <form onSubmit={onSubmitHandler} >
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Pincode</label>
                <input 
                type="number" 
                className="form-control form-control-sm" 
                placeholder="Pincode" 
                value={pincode}
                onChange={(event) => setpincode(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Date</label>
                <input 
                type="date" 
                className="form-control form-control-sm" 
                placeholder="Pincode" 
                value={dates}
                onChange={(event) => {setdates(event.target.value)}}
                />
            </div>
              
            </form> 
            </div>
            </div>
        </div>
    )
}

export default Home
