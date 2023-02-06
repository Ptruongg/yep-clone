import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import * as businessActions from "../../store/businesses";
import "./createBusiness.css";


const CreateBusiness = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { businessId } = useParams();
    businessId = Number(businessId);
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    // const [userId, setUserId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([]);
    // const [submitSuccess, setSubmitSuccess] = useState(false);

    // if (submitSuccess) {
    //     return <Redirect to={`/businesses/${businessId}/create`} />
    // }

    // const validations = () => {
    //     const errors = [];


    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setErrors(['Please enter in a name'])
            return;
        };
        if (!description) {
            setErrors(['Please enter in a description'])
            return;
        }
        if (!address) {
            setErrors(['Please enter in an address'])
            return;
        }
        if (!city) {
            setErrors(['Please enter in a city'])
            return;
        }
        if (!state) {
            setErrors(['Please enter in a state'])
            return;
        }
        if (!zipcode) {
            setErrors(['Please enter in a zipcode'])
            return;
        }
        if (!country) {
            setErrors(['Please enter in a country'])
            return;
        }
        if (!phoneNumber) {
            setErrors(['Please enter in a valid phone number'])
            return;
        }

        const imgRegex = new RegExp(
            /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
        );
        const phoneRegex = new RegExp(
            /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        )
        const zipcodeRegex = new RegExp(
            /^\d{5}(?:[-\s]\d{4})?$/
        )
        if (imageUrl && !imgRegex.test(imageUrl)) {
            setErrors([
                "Invalid Image Url! URL must start with https:// and contain a .png, .jpg, .jpeg, .gif, .png or .svg!",
            ]);
            return;
        };
        if (description.length < 5) {
            setErrors(["Description length must be longer than 5 characters"])
            return;
        }
        if (zipcode && !zipcodeRegex.test(zipcode)) {
            setErrors(["Please enter in a valid zipcode"])
            return;
        }
        if (phoneNumber && !phoneRegex.test(phoneNumber)) {
            setErrors(["Please enter in a valid phone number"])
            return;
        }
        if (phoneNumber.length >= 11 || phoneNumber <= 10) {
            setErrors(['Phone Number format must be 0001112222'])
            return;
        }

        if (!imageUrl) {
            setErrors(['Please enter in an image'])
            return;
        }

        // if (errors.length) {
        //     setErrors(errors);
        //     return;
        // }
        let data = {
            name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country,
            phoneNumber: phoneNumber,
            user_id: user.id,
            imageUrl: imageUrl
        }
        if (!data) {
            setErrors(['Please fill out the required fields'])
            return;
        }
        let created = await dispatch(businessActions.createBusiness(data))
        if (created) {
            history.push("/")
        }
    }

    return (
        <div className="createBizPage" >
            <div className="formContainer">

                <form className="business" onSubmit={handleSubmit}>
                    <div className="errors">
                        {errors ?? (
                            <ul
                            >
                                {errors.map((error, idx) => (
                                    <div key={idx}>{error} </div>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="form" style={{ justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <h2>Create Your Business</h2>
                        </div>
                        <div>
                            <label>
                                Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Business Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
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
                                style={{ justifyContent: "center", width: "100%", height: "40px" }}
                            />
                        </div>
                        <div>
                            <label>
                                ImageUrl:
                            </label>
                            <input
                                type="text"
                                placeholder="Image"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                style={{ justifyContent: "center", width: "100%", marginBottom: "20px", height: "40px" }}
                            />
                        </div>
                    </div>
                    <div>
                        <button className="createBusinessButton" type="submit" onClick={handleSubmit}>
                            Create Your Business
                        </button>
                    </div>
                </form >
            </div>
            <div className="createBizImgForm">
                <img src="https://s3-media0.fl.yelpcdn.com/assets/public/cityscape_300x233_v2.yji-deccc3d10e15b4494be1.svg" />
                <img src="https://s3-media0.fl.yelpcdn.com/assets/public/searching_on_map_234x177_v2.yji-0b5da3ce1e6a636298be.svg" />
            </div>
        </div>
    )
}
export default CreateBusiness;
