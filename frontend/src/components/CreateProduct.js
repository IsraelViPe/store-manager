export default function CreateProduct ({clickCreate, handleChange, newName}) {
    return (
        <form>
            <label for="createProduct">
                {'Nome do produto'}
                <input
                type="text"
                name="createNameProduct"
                value={newName['createNameProduct']}
                onChange={handleChange}/>
            </label>
            <button
            type="button"
            name="clickCreateProduduct"
            onClick={clickCreate}>
                Criar
            </button>
        </form>
    )
}