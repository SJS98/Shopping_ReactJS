import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'

export default function MainContent({ allProducts, products }) {

    return (
        <div className='Main-Content'>

            <div className='Products'>
                {
                    products != null && !undefined && products.length > 0
                        ? products.map(p => <ProductCard key={p.title} productDetails={p} />)
                        : <div className="product-not-found">
                            <span className='no-product-found'>No Product Found</span>
                            <div className='all-products'>{allProducts.map(p => <ProductCard key={p.title} productDetails={p} />)}</div>
                        </div>
                }
            </div>
        </div>
    )
}




function ProductCard({ productDetails }) {
    return (
        <Card style={{ width: '18rem' }} className='ProductCard'>
            <Card.Img variant="top" style={{ minHeight: "200px" }} src={productDetails.imageUrl} />
            <Card.Body>
                <Card.Title style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>{productDetails.title}</Card.Title>
                <Card.Text>
                    {productDetails.description}
                </Card.Text>
                <Card.Text>
                    ${productDetails.price}
                </Card.Text>
                <Button variant="outline-dark" className='mx-2'>Buy</Button>
                <Button variant="danger" className='mx-2'>Add To Cart</Button>
            </Card.Body>
        </Card>
    );
}
