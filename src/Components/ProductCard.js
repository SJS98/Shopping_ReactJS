import React from 'react'
import { Button, Card } from 'react-bootstrap';

export default function ProductCard({ user, productDetails }) {
    return (
        <Card style={{ width: '18rem' }} className='ProductCard'>
            <Card.Img variant="top" style={{ minHeight: "200px" }} src={productDetails.imageUrl} />
            <Card.Body>
                <Card.Title style={{
                    overflow: "hidden",
                }}>{productDetails.title}</Card.Title>

                <Card.Text style={{
                    textOverflow: "ellipsis"
                }}>{productDetails.description}</Card.Text>

                <Card.Text>
                    ${productDetails.price}
                </Card.Text>
                <div className='button'>
                {user.role == 'Customer' && <>
                    <Button variant="outline-dark" className='mx-2'>Buy</Button>
                    <Button variant="danger" className='mx-2'>Add To Cart</Button></>
                }
                {user.role == 'Merchant' && <Button variant="outline-dark" className='mx-2' >Modify</Button>}
                </div>
            </Card.Body>
        </Card>
    );
}

