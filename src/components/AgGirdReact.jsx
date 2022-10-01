import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import EditButton from '../pages/SignUp/EditButton';
import DeleteButton from '../pages/SignUp/DeleteButton';
import Drawerbar from '../components/Drawerbar/Drawerbar'
export default function AgGirdReact({
  columnDefs,
  onCellClicked,
  frameworkComponents = {},
  rowData,
  pagination = true,
  height= '50vh',
  IconComponent,
  IconComponents,
  context,
  value,
  handleDelete
}) {
  const onCellClicked_ = e => {
    try {
      onCellClicked(e);
    } catch (e) {}
  };
console.log("Agvalue",typeof value)
  const defaultColDef = {
    filter: true,
            floatingFilter:true,
            resizable: true,
            sortable: true,
            // suppressMenu: true,
            enableFilter: true,

  };

  return (
    <div
      className='ag-theme-alpine  mb-0'
      style={{
      height: height,
      width : value === 'true' ? "78%" : "80%",
      marginLeft: value === 'true' ? "17%" : "15%",
      marginTop: '-4%',
      }}
    >
      <AgGridReact
        // domLayout='autoHeight'
        onCellClicked={e => onCellClicked_(e)}
        rowSelection='multiple'
        animateRows={true}
        columnDefs={columnDefs}
        rowData={rowData}
        // onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
        pagination={pagination}
        paginationPageSize={10}
        defaultColDef={defaultColDef}

        context={{ context, handleDelete }}
        // onSelectionChanged={onSelectionChanged}
        frameworkComponents={{
          frameworkComponents,
          iconComponent: IconComponent,
          iconComponents: IconComponents,
          EditButton,
          DeleteButton
        }}
      ></AgGridReact>
    </div>
  );
}
