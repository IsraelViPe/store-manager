export default function  SaleCard ({ 
  sale, idUpdate, idDelete, 
  updateSale, deleteSale, 
  showUpdate, updateIdProduct, handleChangeUpdate, 
  updateProductQuantit, clickUpdate }) {


const products = sale.products.map(({productId, quantity}) => (
                    <ul key={productId}>
                      <li>{`cod. prod ${productId}`}</li>
                      <li>{`quant  ${quantity}`}</li>
                    </ul>))

const editProducts = sale.products.map(({productId, quantity}) => (
  <ul key={productId}>
    <li>
    <input
    type="text"
    name="productId"
    value={updateIdProduct}
    onChange={handleChangeUpdate}
    placeholder={`cod. ${productId}`}/>
    </li>
    <li>
    <input
      type="text"
      name="productQuantity"
      value={updateProductQuantit}
      onChange={handleChangeUpdate}
      placeholder={`quant. ${quantity}`}/>
      </li>
  </ul>
))                    
   
  return (
    <>
      { showUpdate ? (
        <div>
          <h4> { sale.saleId && `Cod: ${sale.saleId }`}</h4>
            <p>{`Data: ${new Date(sale.date).toLocaleString()}`}</p>
            {editProducts}
          <button
          type="button"
          name="updateSale"
          onClick={clickUpdate}>
            Salvar Alterações
          </button>
        </div>
      ): (
        <div>
        <div>
        <h4> { sale.saleId && `Cod: ${sale.saleId }`}</h4>
        <p>{`Data: ${new Date(sale.date).toLocaleString()}`}</p>
        {products}
        </div>
       { !sale.saleId && <button
        type="button"
        id={idUpdate}
        name="updateSale"
        onClick={ updateSale }>
          Editar
        </button>}
  
        {!sale.saleId && <button
        type="button"
        id={idDelete}
        onClick={ deleteSale }>
          Deletar
        </button>}
        </div>
         )
      } 
    </>
  )
}
