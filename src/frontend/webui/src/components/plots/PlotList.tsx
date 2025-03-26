import { useState } from "react";
import GridListItemProps from "../../interfaces/lists/GridListItemProps";
import PaginationProps from "../../interfaces/lists/PaginationProps";
import GridList from "../lists/grid/GirdList";
import FormDialog from "../dialogs/FormDialog";

const PlotList: React.FC = () => {
  const sampleData: GridListItemProps[] = [
    {
      id: "1",
      image: "https://placehold.co/50x150",
      imageAlt: "Sample image 1",
      title: "Item 1",
      description: "This is a description for item 1.",
      footer: {
        leftText: "Left 1",
        centerText: "Center 1",
        rightText: "Right 1",
      },
      viewCallback: () => {},
      deleteCallback: () => {},
    },
    {
      id: "2",
      image: "https://placehold.co/250x100",
      imageAlt: "Sample image 2",
      title: "Item 2",
      description: "This is a description for item 2.",
      footer: {
        leftText: "Left 2",
        centerText: "Center 2",
        rightText: "Right 2",
      },
      editCallback: () => {},
      deleteCallback: () => {},
    },
    {
      id: "3",
      image: "https://placehold.co/50x100",
      imageAlt: "Sample image 3",
      title: "Item 3",
      description: "This is a description for item 3.",
      footer: {
        leftText: "Left 3",
        centerText: "Center 3",
        rightText: "Right 3",
      },
      editCallback: () => {},
      viewCallback: () => {},
    },
    {
      id: "4",
      image: "https://placehold.co/250x300",
      imageAlt: "Sample image 4",
      title: "Item 4",
      description: "This is a description for item 4.",
      footer: {
        leftText: "Left 4",
        centerText: "Center 4",
        rightText: "Right 4",
      },
      editCallback: () => {},
      viewCallback: () => {},
      deleteCallback: () => {},
    },
    {
      id: "5",
      image: "https://placehold.co/250x350",
      imageAlt: "Sample image 5",
      title: "Item 5",
      description: "This is a description for item 5.",
      footer: {
        leftText: "Left 5",
        centerText: "Center 5",
        rightText: "Right 5",
      },
      editCallback: () => {},
      viewCallback: () => {},
      deleteCallback: () => {},
    },
    {
      id: "6",
      image: "https://placehold.co/250x400",
      imageAlt: "Sample image 6",
      title: "Item 6",
      description: "This is a description for item 6.",
      footer: {
        leftText: "Left 6",
        centerText: "Center 6",
        rightText: "Right 6",
      },
      editCallback: () => {},
      viewCallback: () => {},
      deleteCallback: () => {},
    },
  ];

  const paginationProps: PaginationProps = {
    currentPage: 1,
    itemsPerPage: 5,
    onPageChange: () => {},
  };

  const [isAddPlotDialogOpen, setIsAddPlotDialogOpen] = useState(false);

  const openAddPlotDialogHandler = () => {
    setIsAddPlotDialogOpen(true);
  };

  const closeAddDialogHandler = () => {
    setIsAddPlotDialogOpen(false);
  };

  return (
    <div>
      <GridList
        columns={5}
        items={sampleData}
        addCallback={openAddPlotDialogHandler}
        paginationProps={paginationProps}
      />
      {isAddPlotDialogOpen && <FormDialog CloseDialogHandler={closeAddDialogHandler} />}
    </div>
  );
};

export default PlotList;
