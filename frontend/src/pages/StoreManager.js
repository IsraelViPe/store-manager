import { useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SaleCard from "../components/SaleCard";
import SearchForm from "../components/SearchForm";
import salesFormat from '../utils/handleData';
import api from "../utils/api";

export default function StoreManager () {

  const [InputProduct, setInputProduct] = useState('');
  const [saleId, setSaleId] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateNameProduct, setUpdateNameProduct] = useState('');
  const [updateIdProduct, setUpdateIdProduct] = useState('');
  const [updateProductQuantit, setProductQuantity] = useState('');
  const [Error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = ({ target: { name, value }}) => {
    if(name === 'InputProduct') {
      setInputProduct(value)
    } else if (name === 'saleId') {
      setSaleId(value);
    }
  }

  const handleChangeUpdate = ({ target: { name, value }}) => {
    if(name === 'inputProduct') {
      setUpdateNameProduct(value)
    } else if (name === 'productId') {
      setUpdateIdProduct(value)
    } else if (name === 'productQuantity') {
      setProductQuantity(value)
    }
  }


  const getProducts = async () => {
    try {
      setIsLoading(true);
      if (isNaN(Number(InputProduct))) {
        const { data } = await api.get(`/products/search?q=${InputProduct}`)
        setError(null);
        data.length ? setProductsList(data) : setProductsList([data])
        return;
      }
      const { data } = await api.get(`/products/${InputProduct}`)
      setError(null);
      data.length ? setProductsList(data) : setProductsList([data])
    } catch (error) {
      setError(JSON.parse(error.request.responseText).message)
    } finally {
      setIsLoading(false);
      return
    }
  }

  const getSales = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/sales/${saleId}`)
      const salesFormated = salesFormat(saleId, data) 
      setError(null); 
      setSalesList(salesFormated);
    } catch (error) {
      console.error(error)
      setError(JSON.parse(error.request.responseText).message)
    } finally {
      setIsLoading(false);
      return
    }
  }
 

  const clickUpdate = async ({target:{name, id}}) => {
   setShowUpdate(true)
   
    if(name === 'updateProduct') {
      const infoToUpdate = { name : updateNameProduct }
      try {
        const { data } = await api.put(`/products/${id}`, infoToUpdate)
        setError(null);
        setProductsList([data])
      } catch(error) {
        console.error(error)
        setError(JSON.parse(error.request.responseText).message)
      } finally {
        setShowUpdate(false);
        return
      }
    }

  }

  const handleDelete = async ({target:{id}}) => {
    if(window.confirm('Ao cliclar em OK esse item será excluído do Bando de Dados')) {
      try {
        setIsLoading(true);
        await api.delete(id);
      } catch (error) {
        setError(JSON.parse(error.request.responseText).message)
      } finally {
        setIsLoading(false);
        return
      }
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
        onClick={getProducts}
        InputType={'text'}
        placeHolder={'Nome ou código de produto'}
        name={'InputProduct'} />

        {Error && <h2>{Error}</h2>}

        { Error || productsList.map((product, index) => (
        <ProductCard
        key={ index }
        name={product.name}
        id={product.id}
        idDelete={`/products/${product.id}`}
        updateProduct={ clickUpdate }
        deleteProduct={handleDelete}
        handleChangeUpdate={ handleChangeUpdate }
        updateNameProduct={updateNameProduct}
        showUpdateMode={ showUpdate } 
        showDelete={productsList.length === 1}
        />
        ))}

      </section>
      <section>
        <h2>Vendas</h2>

        <SearchForm
        handleChange={ handleChange }
        InputValue={saleId}
        onClick={getSales }
        InputType={'number'}
        placeHolder={'informe o codigó da venda'}
        name={'saleId'} />


        {!Error && salesList.map((sale, index) => (
          <SaleCard
          key={index}
          sale={sale}
          // saleId={sale.saleId}
          idDelete={`/sales/${saleId}`}
          idUpdate={saleId}
          // date={sale.date}
          // productId={sale.productId}
          // quantity={sale.quantity}
          updateSale={ clickUpdate }
          deleteSale={handleDelete}
          showUpdate={ showUpdate}
          updateIdProduct={updateIdProduct}
          handleChangeUpdate={handleChangeUpdate}
          updateProductQuantit={updateProductQuantit}
          clickUpdate={clickUpdate}
          />
        ))}

      </section>
    </main>
  )
}

