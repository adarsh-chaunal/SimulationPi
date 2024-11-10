import ActionButtonProps from "../../../interfaces/controls/ActionButtonProps";
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from "../../misc/icons";
import "./ActionButton.css";

const ActionButton: React.FC<ActionButtonProps> = ({ ...props }) => {
  const actionConfig = {
    add: { styleType: "add-action-button", icon: <AddIcon /> },
    edit: { styleType: "edit-action-button", icon: <EditIcon /> },
    view: { styleType: "view-action-button", icon: <ViewIcon /> },
    delete: { styleType: "delete-action-button", icon: <DeleteIcon /> },
  };

  const { styleType, icon } = actionConfig[props.actionType ?? "add"];

  return (
    <button
      className={`action-button ${styleType}`}
      type="button"
      onClick={props.onClick}
    >
      {icon}
      {typeof props.children === "string" &&
        props.children.trim().length > 0 && <span> {props.children}</span>}
    </button>
  );
};

export default ActionButton;
