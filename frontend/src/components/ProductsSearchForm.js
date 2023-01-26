

export default function ProductsSearchForm ({handleChange, InputProduct, searchProducts}) {
  return (
    <form>
      <label>
        <input
        type="text"
        name="InputProduct"
        placeholder="Nome do Produto ou Código"
        value={InputProduct}
        onChange={ handleChange }
        />
      </label>
      <button
      type="button"
      onClick={ searchProducts }>
        Buscar
      </button>
    </form>
  )
};


{/* <h1>Produtos</h1>
<p>Digite o nome do produto (input)</p>
<p>Código do produto</p>
<p>Se eu cliclar no botão sem nada eu busco tudo/
  a medida do que foi preenchido eu filtro a minha busca </p>
<p>Com os produtos que vierem eu adiciono um botão de deletar e um botão de atualizar</p>
<p>repito a mesma coisa pra vendas</p>
<p>Criar uma seção de cadastro</p> */}
