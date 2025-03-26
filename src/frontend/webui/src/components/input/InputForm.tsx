import { FORM_INPUT_TYPES } from "../../constants/formInputConstants";
import InputFormProps, {
  InputElementProp,
  BaseInputElement
} from "../../interfaces/inputs/InputFormProps";
import TextField from "./TextField";

const InputForm: React.FC<InputFormProps> = (props) => {
  const getInputElement = (inputElement: InputElementProp) => {
    switch (inputElement.Type) {
        case FORM_INPUT_TYPES.TEXT: {
            const { ID, Label, Placeholder, Disabled } = inputElement as BaseInputElement<typeof FORM_INPUT_TYPES.TEXT>;
            return <TextField key={ID || ""} label={Label || ""} placeholder={Placeholder || ""} disabled={Disabled} />;
        }
    }
    
    // switch (inputElement.Type) {
    //   case FORM_INPUT_TYPES.TEXT:
    //     const {ID, Label, Placeholder, Disabled} = inputElement as BaseInputElement<typeof FORM_INPUT_TYPES.TEXT>;
    //     return <TextField 
    //                 key={ID}
    //                 label={Label || ""}
    //                 placeholder={Placeholder||""}
    //                 disabled={Disabled} />;
    // }

    return <div key = {inputElement.ID}></div>;
  };

  return (
    <form>
      {props.InputElements.map((inputElement) => {
        return getInputElement(inputElement);
      })}
    </form>
  );
};

export default InputForm;
