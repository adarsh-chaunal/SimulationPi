import { PaginationGoToPageProps } from "../../../interfaces/lists/PaginationProps";

const PaginationGoToPage: React.FC<PaginationGoToPageProps> = (props) => {
    return(
        <div className="pagination-go-to-page">
            {props.page}
        </div>
    );
}

export default PaginationGoToPage;