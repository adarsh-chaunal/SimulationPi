import TextFieldProps from "../../interfaces/inputs/TextFieldProps";

const TextField: React.FC<TextFieldProps> = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input
        className="input-text-field"
        type="text"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextField;
