import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductCard from './ProductCard';


export default function Products({ref, searchedText}) {

  useEffect(() => {
    const data = [
      {
        title: "Apple - Red Delicious",
        price: 1.99,
        imageUrl: "https://th.bing.com/th/id/OIP.nQbFXga7NxjRTGY7xfGhuQHaE7?w=272&h=181&c=7&r=0&o=5&pid=1.7",
        description: "Sweet and juicy red apples, perfect for snacking or baking.",
      },
      {
        title: "Organic Colombian Roast",
        price: 12.99,
        imageUrl: "https://th.bing.com/th/id/OIP.nLzdJ8rQMboQNnosCx-S_gHaE8?w=290&h=194&c=7&r=0&o=5&pid=1.7",
        description: "Smooth and bold flavor, ethically sourced and roasted to perfection.",
      },
      {
        title: "Noise-Cancelling Wireless Headphones",
        price: 199.99,
        imageUrl: "https://th.bing.com/th/id/R.bb7fa91af14d6e02f95d05a756c5e7fa?rik=OR4qmGTE7NlyFg&riu=http%3a%2f%2fecx.images-amazon.com%2fimages%2fI%2f71joq-txpaL._SL1500_.jpg&ehk=YFgK5mVS2TZfWSdgXyAEdWtzjg1S78C3voAMbX1R9mw%3d&risl=&pid=ImgRaw&r=0",
        description: "Immerse yourself in your music with active noise cancellation.",
      },
      {
        title: "The Martian",
        price: 9.99,
        imageUrl: "https://th.bing.com/th/id/R.36c21bdf95fd1aa6daeb1559f65b4267?rik=mAQu3apXRhZ4IA&riu=http%3a%2f%2fvolganga.com%2fwordpress%2fwp-content%2fuploads%2f2015%2f10%2fthe_martian_2015_movie_hd_wallpapers_01.jpg&ehk=M00GnBq%2b2RXBhXgypvf%2fPBUtTu%2bO5BT4dLkzqVMt%2fCo%3d&risl=&pid=ImgRaw&r=0",
        description: "A thrilling tale of survival on Mars.",
      },
      {
        title: "Funny Cat T-Shirt",
        price: 24.99,
        imageUrl: "https://th.bing.com/th/id/R.c58db9104ca0305abfdcf50ae7088fe8?rik=F%2f3hu6obcpegoA&riu=http%3a%2f%2fimg1.etsystatic.com%2f003%2f0%2f6243697%2fil_fullxfull.368409989_liu0.jpg&ehk=QFRJV2zZZJpASrUSGu85x8eHyD4hHt2HkklHFKyfR%2fE%3d&risl=&pid=ImgRaw&r=0",
        description: "Make a statement with this adorable and hilarious cat tee.",
      },
      {
        title: "Ultra-Thin Notebook Laptop",
        price: 799.99,
        imageUrl: "https://th.bing.com/th/id/R.5fc3d3ff834fe63acf8baf4b472766c3?rik=z8dTVkxeSGUdvQ&riu=http%3a%2f%2ftweaklibrary.com%2fwp-content%2fuploads%2f2019%2f08%2fASUS-ZenBook-S13-Ultra-Thin-Laptop.jpg&ehk=rhkyH4SYhbdzRmAEJznSoguDoM7c52VaCC8fAZaE3p8%3d&risl=&pid=ImgRaw&r=0",
        description: "Powerful performance on the go, thin and lightweight design.",
      },
      {
        title: "Running Shoes",
        price: 89.99,
        imageUrl: "https://th.bing.com/th/id/OIP.xS0izgkdKpj0RWa0u0VsDgHaHa?rs=1&pid=ImgDetMain",
        description: "Comfortable and stylish, perfect for any workout.",
      },
      {
        title: "Waterproof Smartwatch",
        price: 299.99,
        imageUrl: "https://th.bing.com/th/id/OIP.XOhmsklubtkLreyOe0IOhgHaE7?rs=1&pid=ImgDetMain",
        description: "Track your fitness, stay connected, and look good doing it.",
      },
      {
        title: "Travel Backpack",
        price: 59.99,
        imageUrl: "https://th.bing.com/th/id/R.a2d89bf599e0c25687336c626b1a108a?rik=hLIAkZdNd7GdBQ&pid=ImgRaw&r=0",
        description: "Spacious and durable, perfect for your next adventure.",
      },
      {
        title: "Digital SLR Camera",
        price: 499.99,
        imageUrl: "https://1.bp.blogspot.com/-EU-gQA0HCn8/X1dLP6Z6kOI/AAAAAAAAAtQ/T8n_Ftnu1eMpEbxCZCJJX4BOky8whb3igCLcBGAsYHQ/s1920/camera-1639636_1920.jpg",
        description: "Capture stunning photos and videos with this versatile camera.",
      },
    ]
    loadProducts(data)


    ref.current = filterBySearch

  }, [])

    

  const [products, setProducts] = useState([]);

  const filterBySearch = (query) => {
    setProducts(products.filter(p => p.title.includes(query)))
  } 

  const loadProducts = (data) => {
    setProducts(data)
  }


  return (
    <div className='Products'>
      {
        products && products.map(p => <ProductCard productDetails={p} />)
      }
    </div>
  )
}




