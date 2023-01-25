import { useEffect, useState } from "react";
import ProductsSearchForm from "../components/ProductsSearchForm";
import api from "../utils/api";

export default function StoreManager () {

  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [saleId, setSaleId] = useState('');
  const [products, setProducts] = useState([]);
  const [fetch, setFetch] = useState({ request: false });

  useEffect( () => {
    if(fetch.request === true ) {
    fetchApi(fetch)
    }
  }, [fetch])

  const fetchApi = async (info) => {
    switch (info.method) {
      case 'get':
        return await api.get(info.route).then( response => setProducts(response.data))
      default:
        return
    }
  }

  console.log(products)

  const handleChange = ({ target: { name, value }}) => {
    if(name === 'productName') {
      setProductName(value)
    } else if (name === 'productId') {
      setProductId(value);
    } else if (name === 'saleId') {
      setSaleId(value);
    }
  }



  const searchProducts = () => {

   if(productId ) {
    setFetch({request: true, route: `/products/${productId}`, method: 'get'})
   } else if (productName) {
    setFetch({request: true, route: `/products/q=${productName}`, method: 'get'})
   } else {
     setFetch({ request: true , route: '/products', method: 'get'});
   }

  }

  return (
    <main>
      <h1>Store Manager</h1>
      <section>
        <h2>Produtos</h2>
        <ProductsSearchForm
        handleChange={ handleChange }
        productId={productId}
        productName={productName}
        searchProducts={searchProducts} />
      </section>
      <section>
        <h2>Vendas</h2>
      </section>
    </main>
  )
}
