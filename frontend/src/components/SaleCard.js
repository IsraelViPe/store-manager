export default function  SaleCard ({ 
  sale, idUpdate, idDelete, 
  updateSale, deleteSale,
  updateInputSale, 
  showUpdate, handleChangeUpdate, 
  clickUpdate }) {


const products = sale.products.map(({productId, quantity}) => (
                    <ul key={productId}>
                      <li>{`cod. prod ${productId}`}</li>
                      <li>{`quant  ${quantity}`}</li>
                    </ul>))

const editProducts = sale.products.map(({productId, quantity}) => (
  <ul key={productId}>
    <li>
    <label for="inputId">
      {'cod '}
      <input
      type="text"
      name={`${productId}-product`}
      value={updateInputSale[`${productId}-product`]}
      onChange={handleChangeUpdate}
      placeholder={`cod. ${productId}`}/>
    </label>
    </li>
    <li>
    <label for="inputQuantity">
      {'quant '}
      <input
        type="text"
        name={`${productId}-quantity`}
        value={updateInputSale[`${productId}-quantity`]}
        onChange={handleChangeUpdate}
        placeholder={`quant. ${quantity}`}/>
    </label>
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
          id={idUpdate}
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
        name="requestUpdateSale"
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
