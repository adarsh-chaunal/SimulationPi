import PaginationProps, { PaginationGoToPageProps } from "../../../interfaces/lists/PaginationProps";
import PaginationGoToPage from "./PaginationGoToPage";
import './PaginationBar.css';

const PaginationBar: React.FC<PaginationProps> = ({ ...props }) => {
    const numberOfPages = props.totalItems ? Math.ceil(props.totalItems/props.itemsPerPage) : 1;
  return (
    <div className="pagination-bar">
      {
        Array.from({length: numberOfPages}, (_,i) =>{
            const page = i+1;
            const goToPageProps: PaginationGoToPageProps = {
                page,
                isPageSelected: props.currentPage === page,
                onPageSelected : props.onPageChange
            };
            return <PaginationGoToPage {...goToPageProps} />
        })
      }
    </div>
  );
};

export default PaginationBar;
