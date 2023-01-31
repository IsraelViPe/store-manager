export default function UpdateProduct ({product, handleChange, inputProduct, handleRequestUpdate}) {

  return (
    <form>
      <label htmlFor="name">
        Atualizar Produto
        <input
        type="text"
        name='inputProduct'
        value={inputProduct}
        placeholder={product.name}
        onChange={ handleChange }/>
      </label>

      <button
      type="button"
      onClick={handleRequestUpdate}>
        Salvar Alteração
      </button>

    </form>
  )
}
