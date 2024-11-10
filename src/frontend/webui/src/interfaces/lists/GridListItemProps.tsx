export default interface GridListItemProps {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  footer?: gridItemFooter;
  editCallback?: () => void; // | undefined;
  viewCallback?: () => void;
  deleteCallback?: () => void;
}

export interface gridItemFooter {
  leftText?: string;
  centerText?: string;
  rightText?: string;
}
