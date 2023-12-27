import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import baseUrl from './Private';
import ProductCard from './ProductCard';
import AddProductForm from './AddProductForm';

const Profile = ({ user, setUser }) => {

    const [updateProfilePop, setUpdateProfilePop] = useState(false);
    const [addProductPop, setAddProductPop] = useState(false)

    return (
        <>
            <ProfileCanvas user={user} setUpdateProfilePop={setUpdateProfilePop} setUser={setUser} setAddProductPop={setAddProductPop} />
            {
                updateProfilePop && <UpdateProfileForm user={user} setUpdateProfilePop={setUpdateProfilePop} setUser={setUser} />
            }

            {
                addProductPop && <AddProductForm user={user} setUser={setUser} setAddProductPop={setAddProductPop} />
            }

        </>
    )
}

export default Profile


const ProfileCanvas = ({ user, setUpdateProfilePop, setUser, setAddProductPop }) => {

    const [imageUrl, setImageUrl] = useState(null)

    // Profile details state
    const [profile, setProfile] = useState({
        email: "",
        password: "",
        name: "",
        role: "",
        state: "",
        city: "",
        landmark: "",
        image: "",
        cart: null,
        "reviews": [],
        "products": []
    })

    useEffect(() => {
        axios({
            method: 'get', // or 'get', 'put', 'delete', etc.
            url: baseUrl + '/users',
            headers: {
                "email": "sabir@gmail.com",
                "password": "Sabir@123"
            }
        }).then(
            resp => {
                console.log(resp.data.data)
                setUser(resp.data.data)
                setProfile(user)
                setProducts(resp.data.data.products)
            },
            err => console.log(err)
        )
    }, [0])

    useEffect(() => {
        setImageUrl(URL.createObjectURL(new Blob([profile.image], { type: 'image/png' })))
        console.log(imageUrl)
    }, [])

    // Product state
    const [products, setProducts] = useState(profile.products)

    // CRUD operations for products
    const addProduct = (newProduct) => {
        setProducts([...products, newProduct])
    }

    const updateProduct = (index, updatedProduct) => {
        const updatedProducts = [...products]
        updatedProducts[index] = updatedProduct
        setProducts(updatedProducts)
    }

    const deleteProduct = (index) => {
        const updatedProducts = [...products]
        updatedProducts.splice(index, 1)
        setProducts(updatedProducts)
    }

    const deleteHandler = () => {
        const option = prompt("Are you sure to delete account. Confirm by password")
        if (option == profile.password) {
            axios({
                method: "DELETE",
                url: baseUrl + '/users',
                headers: {
                    'email': profile.email
                }
            }).then(
                resp => {
                    console.log(resp)
                },
                err => {
                    console.log(err)
                }
            )
        }

    }
    return (
        <>
            <Container className="profile-canvas">
                <div className='profile-image'>
                    <ImageComponent imageBytes={profile.image} alt='Profile Image' />
                </div>
                <div className='profile-details'>
                    <>Name<h1>{profile.name}</h1></>
                    <h6>{profile.role} Profile</h6>
                    {/* Profile Details */}
                    <div className="profile-more-details">
                        <h5>Profile Details</h5>
                        <>Email<h5>{profile.email}</h5></>
                        <>Password<h6> {profile.password}</h6></>
                    </div>
                    <div className='profile-btns'>
                        <Button variant="primary" onClick={() => setUpdateProfilePop(true)}>Update Profile</Button>
                        <Button variant='outline-danger' onClick={deleteHandler}>Delete Profile</Button>
                    </div>
                </div>
            </Container>

            <Container className="product-canvas">
                <Button className='sell-btn' variant="success" onClick={() => setAddProductPop(true)} >Sell +</Button>
                <h3>My Store ({products.length})</h3>
                <div className='my-products'>
                    {
                        products.length > 0 ? products.map(p => <ProductCard key={p.title} user={user} productDetails={p} />) : <><span>Store is empty! Add product now &nbsp; &nbsp; <Button variant="success" onClick={() => setAddProductPop(true)} >Sell +</Button></span></>
                    }
                </div>
            </Container >

        </>
    )
}

const UpdateProfileForm = ({ user, setUpdateProfilePop, setUser }) => {

    const formData = {
        name: '',
        password: '',
        confirmPassword: '',
        state: '',
        city: '',
        landmark: '',
    }

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [landmark, setLandmark] = useState('');
    const [uploadImage, setUploadImage] = useState('');

    if (name) user.name = name
    if (password) user.password = password
    if (state) user.state = state
    if (city) user.city = city
    if (landmark) user.landmark = landmark
    if (uploadImage) user.image = uploadImage

    const handleUpdateForm = () => {
        console.log('User: ', user)
        axios({
            method: "PUT",
            url: baseUrl + '/users',
            data: user
        }).then(
            resp => {
                console.log(resp)
            },
            err => console.log(err))

        setUpdateProfilePop(false)
    }



    const handleImage = () => {
        const formData = new FormData();
        formData.append('file', uploadImage);

        axios({
            method: "POST",
            url: baseUrl + '/users/upload-profile',
            data: formData,
            headers: {
                'email': user.email,
                'Content-Type': 'multipart/form-data'
            }
            
        }).then(
            resp => {
                console.log(resp)
                setUser(resp.data.data)
            },
            err => console.log(err))

        setUpdateProfilePop(false)
    }


    return (
        <div className='update-profile-form'>

            <div className='section1'>
                <div> <label for='image'> Upload Image</label> <input style={{ display: 'none' }} type='file' id='image'onChange={(e) => setUploadImage(e.target.files[0])} />
                    <Button variant='outline-success' onClick={handleImage}>Upload</Button>
                </div>
                <div className=''>
                    <Button variant='outline-success' onClick={handleUpdateForm}>Save</Button>
                    <Button variant='outline-dark' onClick={() => setUpdateProfilePop(false)}>Cancel</Button>
                </div>
            </div>

            <div className='section2 container'>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Name"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm Password"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="State"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="State" onChange={(e) => setState(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="City"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Landmark"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} />
                </FloatingLabel>

            </div>

        </div>
    )
}

const ImageComponent = ({ imageBytes }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const imageBlob = new Blob([imageBytes], { type: 'image/jpg' });
        const url = URL.createObjectURL(imageBlob);
        setImageUrl(url);
        console.log(url)
    }, []);

    return (
        <>
        <img src={imageUrl} alt="Image" />
        </>
    );
};