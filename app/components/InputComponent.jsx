const InputComponent = ({ name, value, onChange }) => {
    return (
      <input
        type="text"
        placeholder={name}
        className=""
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  };
  export default InputComponent;