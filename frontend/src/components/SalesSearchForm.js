export default function SalesSearchForm ({handleChange, saleId, searchSales}) {
  return (
    <form>
      <label>
        <input
        type="number"
        name="saleId"
        placeholder="Informe o código da venda"
        value={saleId}
        onChange={ handleChange }
        />
      </label>
      <button
      type="button"
      onClick={ searchSales }>
        Buscar
      </button>
    </form>
  )
};
