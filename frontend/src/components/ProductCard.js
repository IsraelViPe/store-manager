export default function  ProductCard ({name, idDelete, updateProduct, deleteProduct, showDelete, id, updateNameProduct, handleChangeUpdate, showUpdateMode }) {
 
 return (
  <>  
   { showUpdateMode ? (
   <div>
      <h4>Cod: {id}</h4>
      <input
        type="text"
        name='productName'
        value={updateNameProduct['productName'] }
        placeholder={name}
        onChange={ handleChangeUpdate }/>

      <button
      type="button"
      name="updateProduct"
      id={id}
      onClick={updateProduct}>
        Salvar Alteração
      </button>
    </div>  
  ):(
    <div>
      <div>
        <h4>Cod: {id}</h4>
        <p>{name}</p>
      </div>
    { showDelete && <> <button
      type="button"
      id={id}
      name="requestUpdateProduct"
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
    )}
  </>
  )
}
