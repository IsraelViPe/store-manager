export default function CreateProduct ({createProduct, handleNewProduct}) {
    return (
        <form>
            <label for="createProduct">
                {'Nome do produto'}
                <input
                type="text"
                name="name"
                onChange={handleNewProduct}/>
            </label>
            <button
            type="button"
            onClick={createProduct}>
                Criar
            </button>
        </form>
    )
}