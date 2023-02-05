export default function CreateSale ({updateInput, clickCreate,
    handleChangeUpdate, clickAddProduct, preview }) {
    
    const isDesable = updateInput['inputIdProduct'] === undefined || updateInput['inputIdProduct'] === '' || 
    updateInput['inputQuantity'] === undefined || updateInput['inputQuantity'] === ''
   
    const showPreview = preview?.map(({productId, quantity}) => (
        <ul key={ productId }>
          <li>Código do Produto : {productId}</li>
          <li>Quantidade: {quantity}</li>  
        </ul>
    ))

    return (
        <div>
            <form>
                <label for="productId">
                    {'Id do produto'}
                    <input
                    type="number"
                    name="inputIdProduct"
                    value={updateInput['inputIdProduct']}
                    onChange={handleChangeUpdate }/>
                </label>
            
                <label for="quantity">
                    {'Quantidade'}
                    <input
                    name="inputQuantity"
                    value={updateInput['inputQuantity']}
                    type="number"
                    onChange={handleChangeUpdate }/>
                </label>
                <button
                type="button"
                name="add"
                onClick={clickAddProduct}
                disabled={isDesable} >
                Adicionar
                </button>
                <button
                type="button"
                name="clickCreateSale"
                onClick={clickCreate}>
                Adicionar Venda
                </button>
            </form>
            {showPreview}
        </div>
    )
}