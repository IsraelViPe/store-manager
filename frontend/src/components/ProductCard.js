export default function  ProductCard ({name, id, updateProduct, deleteProduct }) {
  return (
    <div>
      <div>
        <h3>{name}</h3>
      </div>
      <button
      type="button"
      id={id}
      onClick={ updateProduct }>
        Editar
      </button>

      <button
      type="button"
      id={id}
      onClick={ deleteProduct }>
        Deletar
      </button>
    </div>
  )
}
