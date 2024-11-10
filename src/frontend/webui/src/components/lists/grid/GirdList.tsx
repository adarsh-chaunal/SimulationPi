import GridListProps from "../../../interfaces/lists/GridListProps";
import GridListItem from "./GridListItem";
import "./GridList.css";
import ActionButton from "../../controls/buttons/ActionButton";
import PaginationBar from "../pagination/PaginationBar";

const GridList: React.FC<GridListProps> = ({
  columns,
  paginationProps,
  addCallback,
  items,
}) => {
  const updatedPaginationProps = {
    ...paginationProps,
    totalItems: paginationProps?.totalItems ?? items.length,
  };

  return (
    <div>
      {addCallback && (
        <ActionButton actionType="add" onClick={addCallback}></ActionButton>
      )}
      <div
        className="grid-container"
        style={{ "--column": columns } as React.CSSProperties}
      >
        {items.map((item) => (
          <GridListItem key={item.id} {...item} />
        ))}
      </div>
      <PaginationBar {...updatedPaginationProps}></PaginationBar>
    </div>
  );
};

export default GridList;
