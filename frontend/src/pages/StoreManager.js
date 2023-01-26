import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import ProductsSearchForm from "../components/ProductsSearchForm";
import SalesSearchForm from "../components/SalesSearchForm";
import api from "../utils/api";

export default function StoreManager () {

  const [InputProduct, setInputProduct] = useState('');
  const [saleId, setSaleId] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [fetchInfo, setFetchInfo] = useState({ request: false });
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    if(fetchInfo.request === true ) {
      setIsLoading(true);
    fetchProducts(fetchInfo)
    }
  }, [fetchInfo])

  const fetchProducts = async (info) => {
    switch (info.method) {
      case 'get':{
         try {
          const { data } = await api.get(info.route)
          setError(null);
          if (info.route.includes('products')) {
            data.length ? setProductsList(data) : setProductsList([data])
          }
          if (info.route.includes('sales')) {
            data.length ? setSalesList(data) : setSalesList([data])
          }
        } catch (error) {
          setError('Produto não encontrado')
        } finally {
          setIsLoading(false);
          return
        }
      }
      case 'post': {
        return true
      }
      case 'put': {
        return true
      }
      case 'delete': {
        return true
      }
      default:
        return
    }
  }

  console.log(productsList);
  console.log(salesList)

  const handleChange = ({ target: { name, value }}) => {
    if(name === 'InputProduct') {
      setInputProduct(value)
    } else if (name === 'saleId') {
      setSaleId(value);
    }
  }


  const searchProducts = () => {
   if(!isNaN(Number(InputProduct))) {
    setFetchInfo({request: true, route: `/products/${InputProduct}`, method: 'get'})
   } else if (InputProduct) {
    setFetchInfo({request: true, route: `/products/search?q=${InputProduct}`, method: 'get'})
   } else {
     setFetchInfo({ request: true , route: '/products', method: 'get'});
   }
  }

  const searchSales = () => {
    if(!saleId) {
      setFetchInfo({ request: true, route: '/sales', method: 'get'})
      return;
    }
    return setFetchInfo({ request: true, route: `/sales/${saleId}`, method: 'get'})
  }

  console.log(fetchInfo);

  return (
    <main>
      {isLoading && <Loading />}
      <h1>Store Manager</h1>
      <section>
        <h2>Produtos</h2>

        <ProductsSearchForm
        handleChange={ handleChange }
        InputProduct={InputProduct}
        searchProducts={searchProducts} />

        {Error && <h2>{Error}</h2>}
        { productsList.map((product) => (
        <ProductCard name={product.name} id={product.id} />
        ))}

      </section>
      <section>
        <h2>Vendas</h2>

          <SalesSearchForm saleId={saleId} handleChange={handleChange} searchSales={ searchSales } />

      </section>
    </main>
  )
}
