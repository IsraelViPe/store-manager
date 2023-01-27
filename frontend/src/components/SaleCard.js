export default function  SaleCard ({saleId, id, date, productId, quantity, updateProduct, deleteProduct }) {
  return (
    <div>
      <div>
        <h3> { saleId && `Código de venda: ${saleId }`}</h3>
        <ul>
          <li>{`Data: ${new Date(date).toLocaleString()}`}</li>
          <li>{`Código do produto: ${productId}`}</li>
          <li>{`Quantidade: ${quantity}`}</li>
        </ul>
      </div>
     { !saleId && <button
      type="button"
      id={id}
      onClick={ updateProduct }>
        Editar
      </button>}

      {!saleId && <button
      type="button"
      id={id}
      onClick={ deleteProduct }>
        Deletar
      </button>}
    </div>
  )
}
