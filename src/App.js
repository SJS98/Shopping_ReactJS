import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyNavBar from './Components/MyNavBar'
import MainContent from './Components/MainContent'
import { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from './Components/Private'
import Profile from './Components/Profile'
import Home from './Components/Home'

function App() {

  const [user, setUser] = useState([])
  const [searchedText, setSearchedText] = useState("")
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [tab, setTab] = useState(0);

  const bg_links = [
    'https://www.tendencias.kpmg.es/wp-content/uploads/2018/11/GettyImages-912949110.jpg',
    'https://www.tendencias.kpmg.es/wp-content/uploads/2018/11/GettyImages-912949110.jpg',
    'https://www.tendencias.kpmg.es/wp-content/uploads/2018/11/GettyImages-912949110.jpg',
    'https://www.tendencias.kpmg.es/wp-content/uploads/2018/11/GettyImages-912949110.jpg',
    'https://www.tendencias.kpmg.es/wp-content/uploads/2018/11/GettyImages-912949110.jpg'
  ]

  useEffect(() => {

    axios.get(baseUrl + "/products/all").then(
      resp => {
        loadProducts(resp.data.data)
        setAllProducts(resp.data.data)
      },
      err => console.log(err)
    )

  }, [])

  const filterBySearch = (query) => {

    setProducts(products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())))

    if (query == '') {
      setProducts(allProducts)
    }
  }

  const loadProducts = (data) => {
    setProducts(data)
  }

  return (
    <div className='App' style={{backgroundImage:`url('${bg_links[tab]}')`}}>
      <MyNavBar
        searchedText={searchedText}
        setSearchedText={setSearchedText}
        filterBySearch={filterBySearch}
        setTab={setTab}
      />
      {
        tab == 0 && <MainContent allProducts={allProducts} products={products} /> ||
        tab == 2 && <Profile user={user} setUser={setUser} /> ||
        tab == 6 && <Home />
      }
    </div>
  )
}

export default App