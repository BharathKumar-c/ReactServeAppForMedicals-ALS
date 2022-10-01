import moment from 'moment';
import './grid.css';
const cartColDef = [
  {
    headerName: 'First Name',
    field: 'first_name',
    // sortable: true,
    filter: true,
    editable: true,
   sort:'asc',
    // cellStyle: function (params) {
    //   if (params.data.status === 'inactive') {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    // },
    suppressMenuHide: true,


    headerClass: 'header-black'
  },
  {
    headerName: 'Last Name',
    field: 'last_name',
    sortable: true,
    filter: true,
    editable: true,
    headerClass: 'header-black',
    sort:'asc',
    suppressMenuHide: true,

    // cellStyle: function (params) {
    //   if (params.data.status === 'inactive') {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    // }
  },
  {
    headerName: 'Email',
    field: 'email',
    sortable: true,
    filter: true,
    headerClass: 'header-black',
    sort:'asc',

    // cellStyle: function (params) {
    //   if (params.data.status === 'inactive') {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    // }
  },
  {
    headerName: 'Phone Number',
    field: 'phone',
    sortable: true,
    filter: true,
    headerClass: 'header-black',
    sort: 'asc',
    suppressMenuHide: true,

    // cellStyle: function (params) {
    //   if (params.data.status === 'inactive') {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    //},
    editable: true
  },
  {
    headerName: 'Status',
    field: 'status',
    sortable: true,
    filter: true,
    headerClass: 'header-black',
    scrollY: 'scrollable-element',
    sort:'asc',
    suppressMenuHide: true,

    // cellStyle: function (params) {
    //   if (params.data.status === 'active') {
    //     return { color: 'green' };
    //   } else if (params.data.status === 'pending') {
    //     return { color: 'orange' };
    //   } else {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    // },
    suppressClickEdit: function (params) {
      if (params.data.roleId === 2) {
        return false;
      }
    },

    editable: true
  },
  {
    headerName: 'Last Logged In',
    field: 'logged_In',
    sortable: true,
    filter: true,
    headerClass: 'header-black',
    sort: 'asc',
    suppressMenuHide: true,
    cellRenderer: (data) => {
      // return moment(data.logged_In).format('MM/DD/YYYY HH:mm')
      return data.value ? (new Date( data.value)).toLocaleString() : '';
    //  return (new Date(data.value)).toLocalString().split('T')[0]

  }
    // cellStyle: function (params) {
    //   if (params.data.status === 'inactive') {
    //     return { color: 'red', 'pointer-events': 'none', opacity: '0.4' };
    //   }
    //},
    // editable: true
  },
  {
    headerName: 'Edit',
    field: 'action',
    cellRenderer: 'EditButton',
    headerClass: 'header-black',
    width: '80%'
  },
  {
    headerName: 'Delete',
    field: 'delete',
    cellRenderer: 'DeleteButton',
    headerClass: 'header-black'
  }
];

export default cartColDef;
