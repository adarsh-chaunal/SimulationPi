import GridListItemProps from "./GridListItemProps";
import PaginationProps from "./PaginationProps";

export default interface GridListProps {
  columns: number;
  paginationProps: PaginationProps;
  addCallback?: () => void;
  items: GridListItemProps[];
}