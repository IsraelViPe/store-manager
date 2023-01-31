export default function  ProductCard ({name, idUpdate, idDelete, updateProduct, deleteProduct, showDelete, id }) {
  return (
    <div>
      <div>
        <h4>Cod: {id}</h4>
        <p>{name}</p>
      </div>
    { showDelete && <> <button
      type="button"
      id={idUpdate}
      name="updateProduct"
      onClick={ updateProduct }>
        Editar
      </button>

      <button
      type="button"
      id={idDelete}
      onClick={ deleteProduct }>
        Deletar
      </button>
      </> }
    </div>
  )
}
