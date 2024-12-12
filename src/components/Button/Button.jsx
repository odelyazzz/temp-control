import "./Button.css";

const Button = ({ children, disabled, onClick }) => {
  return (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
