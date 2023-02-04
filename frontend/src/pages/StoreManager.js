import { useState } from "react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import SaleCard from "../components/SaleCard";
import SearchForm from "../components/SearchForm";
import salesFormat from '../utils/handleData';
import api from "../utils/api";
import CreateProduct from "../components/CreateProduct";
import CreateSale from "../components/CreateSale";

export default function StoreManager () {

  const [InputProduct, setInputProduct] = useState('');
  const [saleId, setSaleId] = useState('');
  const [productsList, setProductsList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showUpdateSale, setShowUpdateSale] = useState(false)
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showCreateSale, setShowCreateSale] = useState(false);
  const [updateInput, setUpdateInput] = useState({});
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
    setUpdateInput(values => ({...values, [name]: value }) )
  }


  const getProducts = async () => {
    setShowUpdateProduct(false)
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
    name === 'requestUpdateProduct' ? setShowUpdateProduct(true) : setShowUpdateSale(true)
   
    if(name === 'updateProduct') {
      const infoToUpdate = { name : updateInput.productName }
      try {
        const { data } = await api.put(`/products/${id}`, infoToUpdate)
        setError(null);
        setProductsList([data])
      } catch(error) {
        console.error(error)
        setError(JSON.parse(error.request.responseText).message)
      } finally {
        setShowUpdateProduct(false);
        return
      }
    }


    if( name === 'updateSale') {
      const infoToUpdate = salesList[0].products.map(({productId}) => ({
        productId : Number(updateInput[`${productId}-product`]), quantity : Number(updateInput[`${productId}-quantity`])}))
       try {
        const { data } = await api.put(`/sales/${id}`, infoToUpdate)
        setError(null);
       setSalesList((sale) => [{...sale[0], products: data.itemsUpdated}])
       } catch(error) {
        setError(JSON.parse(error.request.responseText).message)
       } finally {
        setShowUpdateSale(false);
        return
       }
    }
  }

  const clickCreate = ({target:{name}}) => {
    name === 'createProduct' ? setShowCreateProduct(!showCreateProduct): setShowCreateSale(!showCreateSale)
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

        <button
        type="button"
        name="createProduct"
        onClick={ clickCreate }>
          Adicionar Produto
        </button>
        {showCreateProduct && <CreateProduct />}

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
        updateNameProduct={updateInput}
        showUpdateMode={ showUpdateProduct } 
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

        <button
        type="button"
        name="createSale"
        onClick={ clickCreate }>
          Adicionar Venda
        </button>
        {showCreateSale && <CreateSale />}

        {!Error && salesList.map((sale, index) => (
          <SaleCard
          key={index}
          sale={sale}
          idDelete={`/sales/${saleId}`}
          idUpdate={saleId}
          updateSale={ clickUpdate }
          deleteSale={handleDelete}
          showUpdate={ showUpdateSale}
          updateInputSale={ updateInput }
          handleChangeUpdate={handleChangeUpdate}
          clickUpdate={clickUpdate}
          />
        ))}

      </section>
    </main>
  )
}

