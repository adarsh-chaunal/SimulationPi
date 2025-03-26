export default interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems?: number; // used for server side pagination
  onPageChange: (page: number) => void;
}

export interface PaginationGoToPageProps {
  page: number;
  isPageSelected: boolean;
  onPageSelected: (page: number) => void;
}
