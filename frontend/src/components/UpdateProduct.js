export default function UpdateProduct ({product, handleChangeUpdate, updateNameProduct, clickRequestUpdate}) {

  return (
    <form>
      <label htmlFor="name">
        Atualizar Produto
        <input
        type="text"
        name='inputProduct'
        value={updateNameProduct}
        placeholder={product.name}
        onChange={ handleChangeUpdate }/>
      </label>

      <button
      type="button"
      name="updateProduct"
      id={product.id}
      onClick={clickRequestUpdate}>
        Salvar Alteração
      </button>

    </form>
  )
}
