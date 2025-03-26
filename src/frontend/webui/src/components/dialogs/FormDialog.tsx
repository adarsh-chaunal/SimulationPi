import { useEffect } from "react";
import InputForm from "../input/InputForm";
import DialogHeader from "./DialogHeader";
import "./FormDialog.css";
import FormDialogProps from "../../interfaces/inputs/FormDialogProps";

const FormDialog: React.FC<FormDialogProps> = (props) => {

  return (
    <div className="dialog-overlay">
      <div className="dialog-close-button" onClick={() => props.CloseDialogHandler()}>X</div>
      <div className="dialog-window">
        <DialogHeader />
        <InputForm
          Columns={3}
          InputElements={[
            { ID:"UniqueID1", ColumnSpan: 1, Type: "text" },
            { ID:"UniqueID2",  ColumnSpan: 2, Type: "number" },
            { ID:"UniqueID3", ColumnSpan: 3, Type: "fileUpload" },
          ]}
          SubmitButtonText="Save"
          SubmitButtonHandler={() => {console.log("Submitted")}}
          BackButtonText="Cancel"
          BackButtonHandler={() => {console.log("Cancelled")}}
        />
      </div>
    </div>
  );
};

export default FormDialog;
