export default interface ActionButtonProps {
  children?: string;
  onClick: () => void;
  disabled?: boolean;
  actionType?: "add" | "edit" | "delete" | "view";
}