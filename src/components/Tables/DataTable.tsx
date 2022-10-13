import React from "react";
import DataTable, {
  TableProps,
  createTheme,
  defaultThemes,
} from "react-data-table-component";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

createTheme("solarized", {
  // text: {
  //   primary: "#268bd2",
  //   secondary: "#2aa198",
  // },
  // background: {
  //   default: "#002b36",
  // },
  // context: {
  //   background: "#cb4b16",
  //   text: "#FFFFFF",
  // },
  // divider: {
  //   default: "#073642",
  // },
  button: {
    default: "#2aa198",
    hover: "rgba(0,0,0,.08)",
    focus: "rgba(255,255,255,.12)",
    disabled: "rgba(255, 255, 255, .34)",
  },
  sortFocus: {
    default: "#2aa198",
  },
});

const customStyles = {
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      background: "#7380ec",
      color: "#FFF",
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};
const sortIcon = <ArrowDownward />;
const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination
      sortIcon={sortIcon}
      theme="solarized"
      customStyles={customStyles}
      dense
      {...props}
    />
  );
}

export default DataTableBase;
