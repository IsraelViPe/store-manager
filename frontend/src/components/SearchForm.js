import styles from './css/search_form.module.css';

export default function SearchForm ({handleChange, InputValue, onClick, inputType, placeHolder, name}) {
  return (
    <form className={styles.form__container}>
      
        <input
        type={inputType}
        name={name}
        placeholder={placeHolder}
        value={InputValue}
        onChange={ handleChange }
        />
      <button
      className={styles.btn }
      type="button"
      onClick={ onClick }>
        Buscar
      </button>
    </form>
  )
};

