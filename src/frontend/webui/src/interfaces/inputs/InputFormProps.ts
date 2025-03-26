import { FORM_INPUT_TYPES } from "../../constants/formInputConstants";

export default interface InputFormProps {
  InputElements: InputElementProp[];
  Columns: number;
  SubmitButtonText?: string;
  SubmitButtonHandler: () => void;
  BackButtonText?: string;
  BackButtonHandler: () => void;
}

export type InputElementProp =
  BaseInputElement<typeof FORM_INPUT_TYPES.TEXT>
  | BaseInputElement<typeof FORM_INPUT_TYPES.LARGE_TEXT>
  | BaseInputElement<typeof FORM_INPUT_TYPES.NUMBER>
  | NumberInputElement
  | RadioInputElement
  | CheckboxInputElement
  | SelectInputElement
  | MultiSelectInputElement
  | BaseInputElement<typeof FORM_INPUT_TYPES.TEXT_EDITOR>
  | SliderInputElement
  | FileUploadInputElement
  | ButtonInputElement
  | HtmlInputElement;

export interface BaseInputElement<T extends string> {
  ID: string;
  ColumnSpan: number;
  Type: T;
  Label?: string;
  Placeholder?: string;
  Required?: boolean;
  Disabled?: boolean;
  //typeof FORM_INPUT_TYPES[keyof typeof FORM_INPUT_TYPES]
  //'text'|'largText'|'password'|'number'|'radio'|'check'|'select'|'multiSelect'|'textEditor'|'slider'|'fileUpload'|'button'|'html'; // a 'buton will we used for some specific operation we need to perform in the form like file download.'
}

interface NumberInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.NUMBER> {
  MinValue?: number;
  MaxValue?: number;
  Step?: number;
}

interface RadioInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.RADIO> {
  Options: { label: string; value: string }[];
  SelectedValue?: string;
}

interface CheckboxInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.CHECK> {
  Checked?: boolean;
}

interface SelectInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.SELECT> {
  Options: { label: string; value: string }[];
  SelectedValue?: string;
}

interface MultiSelectInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.MULTI_SELECT> {
  Options: { label: string; value: string }[];
  SelectedValues?: string[];
}

interface SliderInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.SLIDER> {
  MinValue: number;
  MaxValue: number;
  Step?: number;
  CurrentValue?: number;
}

interface FileUploadInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.FILE_UPLOAD> {
  AcceptedFileTypes?: string[];
  MaxFileSizeMB?: number;
}

interface ButtonInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.BUTTON> {
  ButtonText: string;
  OnClick?: () => void;
}

interface HtmlInputElement
  extends BaseInputElement<typeof FORM_INPUT_TYPES.HTML> {
  HtmlContent: string;
}