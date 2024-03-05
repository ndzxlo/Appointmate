import "./input.css";

const Input = ({ type, placeholder, classname, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`inputBox ${classname}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
