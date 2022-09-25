
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CartService from "../services/cart.service";
import { Link } from "react-router-dom";
import Table from "./Table";
import tableData1 from "./tableData1.json"

const ReportTable = () => {
  const [items, setOrderDetails] = useState([]);


//   useEffect(() => {
//     retrieveOrderDetails();
//   }, []);

//   const retrieveOrderDetails = () => {

//   };

  CartService.getAllOrderDetails()
  .then(response => {
    setOrderDetails(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });

  const columns = [
    // { label: "Id", accessor: "id", sortable: true },
    { label: "OrderId", accessor: "orderId", sortable: true },
    { label: "UserId", accessor: "userId", sortable: true },//order id, userid, itemName, itemAmount, placedon
    { label: "ItemName", accessor: "itemName", sortable: true,},
    { label: "ItemAmount", accessor: "itemAmount", sortable: true },
    { label: "PlacedOn", accessor: "placedOn", sortable: true }
  ];

//   const refreshList = () => {
//     retrieveOrderDetails();
//   };

    return (
     <div className="col-md-12">
            <div className="container">
            <div>
                <Table 
                caption="Sortable Reports Table"
                data={items}//other.results
                columns={columns}
                />
            </div>
            </div>

    </div>
  );
};

export default ReportTable;