import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editBusiness, getAllBusinesses, getBusinessDetails } from "../../store/businesses";
import "./editBusiness.css"

const EditBusiness = ({ onClick }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    let { businessId } = useParams();
    businessId = Number(businessId)

    // const business = useSelector((state) => state.businesses[businessId])
    const user = useSelector((state) => state.session.user)
    const business = useSelector((state) => state.businessReducer[businessId]);

    const [name, setName] = useState(business?.name);
    const [description, setDescription] = useState(business?.description);
    const [address, setAddress] = useState(business?.address);
    const [city, setCity] = useState(business?.city);
    const [state, setState] = useState(business?.state);
    const [zipcode, setZipcode] = useState(business?.zipcode);
    const [country, setCountry] = useState(business?.country);
    const [phoneNumber, setPhoneNumber] = useState(business?.phoneNumber)
    const [imageUrl, setImageUrl] = useState(business?.imageUrl)
    // const [previewImage, setPreviewImage] = useState(business?.previewImage);
    const [errors, setErrors] = useState([])

    const updatedName = (e) => setName(e.target.value);
    const updatedDescription = (e) => setDescription(e.target.value);
    const updatedAddress = (e) => setAddress(e.target.value);
    const updatedCity = (e) => setCity(e.target.value);
    const updatedState = (e) => setState(e.target.value);
    const updatedZipcode = (e) => setZipcode(e.target.value);
    const updatedCountry = (e) => setCountry(e.target.value);
    const updatedPhoneNumber = (e) => setPhoneNumber(e.target.value)
    const updatedImageUrl = (e) => setImageUrl(e.target.value)
    // const updatedPreviewImage = (e) => setPreviewImage(e.target.value);
    useEffect(() => {
        dispatch(getAllBusinesses());
    }, [dispatch])

    useEffect(() => {
        const errorNotifications = [];

        if (!name) errorNotifications.push("Name is required")
        if (!description) errorNotifications.push("Description is required")
        if (!address) errorNotifications.push("Address is required")
        if (!city) errorNotifications.push("City is required")
        if (!state) errorNotifications.push("State is required")
        if (!zipcode) errorNotifications.push("Zipcode is required");
        if (!country) errorNotifications.push("Country is required")
        if (!phoneNumber) errorNotifications.push("Phone number is required")
        if (!imageUrl) errorNotifications.push("Image is required")
        setErrors(errorNotifications)

    }, [name, description, address, city, state, zipcode, country, phoneNumber, imageUrl])

    // const cancelEdit = (e) => {
    //     e.preventDefault();
    //     history.push(`business/${businessId}`);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) {
            return;
        }

        if (description.length < 5) {
            setErrors(["Not a valid description"])
            return;
        }

        let payload = {
            name: name,
            description: description,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country,
            phoneNumber: phoneNumber,
            imageUrl: imageUrl
            // user_id: user.id
        };

        await dispatch(editBusiness(payload, business.id));
        dispatch(getBusinessDetails);
        onClick();



    }
    return (
        <div className="editBusinessDiv">
            <div>
                <h2>Edit your Business</h2>
            </div>
            <form className="business-form" onSubmit={handleSubmit}>
                <div style={{ color: "red" }}>
                    {errors ?? (
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error.split(":")[1]}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <label>
                        Name
                        <input
                            type="text"
                            value={name}
                            onChange={updatedName}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={updatedDescription}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Address
                        <input
                            type="text"
                            // placeholder="Address"
                            value={address}
                            onChange={updatedAddress}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={updatedCity}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={updatedState}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Zipcode
                        <input
                            type="number"
                            value={zipcode}
                            onChange={updatedZipcode}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>

                    <label>
                        Country
                        <input
                            type="text"
                            value={country}
                            onChange={updatedCountry}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Phone
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={updatedPhoneNumber}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Images
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={setImageUrl}
                            style={{ marginTop: "10px", marginBottom: "20px", width: "465px" }}
                        />
                    </label>
                </div>
                <div className="submitContainer">
                    <button className="confirmEditButton" onClick={handleSubmit} type="submit">
                        Confirm Edit
                    </button>
                    {/* <button className="cancelButton" onClick={cancelEdit}>
                        Cancel
                    </button> */}
                </div>

            </form>
        </div>
    );
}
export default EditBusiness;
