

export default function SearchForm ({handleChange, InputValue, onClick, inputType, placeHolder, name}) {
  return (
    <form>
      <label>
        <input
        type={inputType}
        name={name}
        placeholder={placeHolder}
        value={InputValue}
        onChange={ handleChange }
        />
      </label>
      <button
      type="button"
      onClick={ onClick }>
        Buscar
      </button>
    </form>
  )
};

