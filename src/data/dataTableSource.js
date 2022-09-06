export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || 'https://png.pngtree.com/element_our/20200609/ourmid/pngtree-default-avatar-image_2235111.jpg'} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "address",
      headerName: "Address",
      width: 300,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];
  

  export const userColumnProduct = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "product",
      headerName: "Product",
      width: 230,
      renderCell: (params) => {
        // console.log("params:" , params.row.img[0].img);
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img[0].img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
  
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 50,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div className={`cellWithStatus ${params.row.status}`}>
    //         {params.row.status}
    //       </div>
    //     );
    //   },
    // },
  ];
  //temporary data
  