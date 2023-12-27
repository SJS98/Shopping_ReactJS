import axios from 'axios';
import React, { useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import baseUrl from './Private';

export default function AddProductForm({ user, setAddProductPop, setUser }) {

    //add
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [image, setImage] = useState("");


    const addProduct = () => {
        const newProduct = {
            'title': title,
            'description': description,
            'price': price,
            'imageUrl': imageURL,
            'image': [image]
        }
        axios(
            {
                method: 'POST',
                url: baseUrl + '/products',
                headers: {
                    'merchantEmail': user.email
                },
                data: newProduct
            }
        ).then(
            resp => {
                console.log(resp.data.data)
            },
            err => console.log(err)
        )

        setAddProductPop(false)
    }




    return (
        <div className='add-product-form'>

            <h3>Add Product</h3>
            <div className='section2 container'>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Description"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Price in $"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="number" placeholder="Price" onChange={(event) => setPrice(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Image URL"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="text" placeholder="Image URL" onChange={(event) => setImageURL(event.target.value)} />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label="Image"
                    className="mb-3 mx-3 my-3"
                >
                    <Form.Control type="file" accept='image/jpg' placeholder="Image" onChange={(event) => setImage(event.target.value)} />
                </FloatingLabel>

                <div className='section1'>
                    <div className=''>
                        <Button variant='outline-success' onClick={addProduct} >ADD</Button>
                        <Button variant='outline-dark' onClick={() => setAddProductPop(false)}>Cancel</Button>
                    </div>
                </div>
            </div>

        </div>
    )
}