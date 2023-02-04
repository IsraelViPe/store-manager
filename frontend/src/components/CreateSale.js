export default function CreateSale () {
    return (
        <form>
            <label for="productId">
                {'Id do produto'}
                <input
                type="number"
                onChange={() => {}}/>
            </label>
            
            <label for="quantity">
                {'Quantidade'}
                <input
                type="number"
                onChange={() => {}}/>
            </label>
            <button>
            Adicionar
            </button>
            <button>
            Adicionar Venda
            </button>
        </form>
    )
}