import GridListItemProps from "../../../interfaces/lists/GridListItemProps";
import ActionButton from "../../controls/buttons/ActionButton";

const GridListItem: React.FC<GridListItemProps> = ({ ...props }) => {
  return (
    <div className="grid-item">
      <div className="grid-item-image">
        <img src={props.image} alt={props.imageAlt} />
      </div>
      <div className="grid-item-content">
        <h5>
          <strong>{props.title}</strong>
        </h5>
        <div className="grid-item-content-description">{props.description}</div>
        {props.footer && (
          <div className="grid-item-content-footer">
            <div>{props.footer.leftText}</div>
            <div>{props.footer.centerText}</div>
            <div>{props.footer.rightText}</div>
          </div>
        )}
      </div>
      <div className="grid-item-action">
        <div>
          {props.editCallback ? (
            <ActionButton
              actionType="edit"
              onClick={props.editCallback}
            ></ActionButton>
          ) : (
            ""
          )}
        </div>
        <div>
          {props.deleteCallback ? (
            <ActionButton
              actionType="delete"
              onClick={props.deleteCallback}
            ></ActionButton>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default GridListItem;
