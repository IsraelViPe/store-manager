import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SaleCard from "../components/SaleCard";
import SearchForm from "../components/SearchForm";
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
          setError('Item não encontrado')
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
        try {
          await api.delete(info.route)
          setError(null);
          info.route.includes('products') ? setProductsList([]) : setSalesList([])
        } catch (error) {
          setError(error.message)
        } finally {
          setIsLoading(false);
          return
        }
      }
      default:
        return
    }
  }

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

  const handleDelete = ({target:{id}}) => {
    if(window.confirm('Ao cliclar em OK esse item será excluído do Bando de Dados')) {
      setFetchInfo({ request: true , route: id, method: 'delete'});
    }
  }

  return (
    <main>
      {isLoading && <Loading />}
      <h1>Store Manager</h1>
      <section>
        <h2>Produtos</h2>

        <SearchForm
        handleChange={ handleChange }
        InputValue={InputProduct}
        onClick={searchProducts}
        InputType={'text'}
        placeHolder={'Nome ou código de produto'}
        name={'InputProduct'} />

        {Error && <h2>{Error}</h2>}
        {!Error && productsList.map((product, index) => (
        <ProductCard
        key={ index }
        name={product.name}
        id={`/products/${product.id}`}
        deleteProduct={handleDelete}
        />
        ))}

      </section>
      <section>
        <h2>Vendas</h2>

        <SearchForm
        handleChange={ handleChange }
        InputValue={saleId}
        onClick={searchSales }
        InputType={'number'}
        placeHolder={'informe o codigó da venda'}
        name={'saleId'} />

        {!Error && salesList.map((sale, index) => (
          <SaleCard
          key={index}
          saleId={sale.saleId}
          id={`/sales/${saleId}`}
          date={sale.date}
          productId={sale.productId}
          quantity={sale.quantity}
          updateProduct={() => {}}
          deleteProduct={handleDelete}
          />
        ))}

      </section>
    </main>
  )
}
