export default function  SaleCard ({saleId, idUpdate, idDelete, date, productId, 
  quantity, updateSale, deleteSale, 
  showUpdate, updateIdProduct, handleChangeUpdate, 
  updateProductQuantit, clickUpdate }) {
  return (
    <>
      { showUpdate ? (
        <div>
          <h4> { saleId && `Cod: ${saleId }`}</h4>
          <ul>
            <li>{`Data: ${new Date(date).toLocaleString()}`}</li>
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
        <h4> { saleId && `Cod: ${saleId }`}</h4>
        <ul>
          <li>{`Data: ${new Date(date).toLocaleString()}`}</li>
          <li>{`cod. prod. ${productId}`}</li>
          <li>{`quant. ${quantity}`}</li>
        </ul>
        </div>
       { !saleId && <button
        type="button"
        id={idUpdate}
        name="updateSale"
        onClick={ updateSale }>
          Editar
        </button>}
  
        {!saleId && <button
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
