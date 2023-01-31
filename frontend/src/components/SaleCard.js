export default function  SaleCard ({saleId, idUpdate, idDelete, date, productId, quantity, updateSale, deleteSale }) {
  return (
    <div>
      <div>
        <h4> { saleId && `Cod: ${saleId }`}</h4>
        <ul>
          <li>{`Data: ${new Date(date).toLocaleString()}`}</li>
          <li>{`Código do produto: ${productId}`}</li>
          <li>{`Quantidade: ${quantity}`}</li>
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
