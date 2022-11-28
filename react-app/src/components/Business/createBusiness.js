import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as businessActions from "../../store/businesses";
import "./createBusiness.css";


const CreateBusiness = () => {
    const dispatch = useDispatch();
    let { businessId } = useParams();
    businessId = Number(businessId);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    // const [userId, setUserId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    if (submitSuccess) {
        return <Redirect to={`/businesses/${businessId}`} />
    }

    const validations = () => {
        const errors = [];
        if (!name) {
            errors.push('Please enter in a name')
        };
        if (!description) {
            errors.push('Please enter in a description')
        }
        if (!address) {
            errors.push('Please enter in an address')
        }
        if (!city) {
            errors.push('Please enter in a city')
        }
        if (!state) {
            errors.push('Please enter in a state')
        }
        if (!zipcode) {
            errors.push('Please enter in a zipcode')
        }
        if (!country) {
            errors.push('Please enter in a country')
        }
        if (!phoneNumber) {
            errors.push('Please enter in a phone number')
        }
        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country,
            phoneNumber: phoneNumber
        }
        const errors = validations();
        if (errors.length) {
            setErrors(errors);
            return;
        }
        return dispatch(businessActions.createBusiness(businessId, data)).then(
            async (res) => {
                setSubmitSuccess(true)
            }
        )
    }

    return (
        <div className="createBusinessContainer">
            <form className="business" onSubmit={handleSubmit}>
                <div className="businessTitle">Create Your Business</div>
                {errors ?? (
                    <ul>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                        ))}
                    </ul>
                )}
                <div>
                    <div>
                        <label>
                            Name:
                        </label>
                        <input
                            type="text"
                            placeholder="Business Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Description:
                        </label>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Address:
                        </label>
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            City:
                        </label>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            State:
                        </label>
                        <input
                            type="state"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Zipcode:
                        </label>
                        <input
                            type="text"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Country:
                        </label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <button className="createBusinessButton" type="submit">
                        Create Your Business
                    </button>
                </div>
            </form >
        </div >
    )
}
export default CreateBusiness;
