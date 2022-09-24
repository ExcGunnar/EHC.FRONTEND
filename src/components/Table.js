
// import authHeader from "../services/auth.header";
// import axios from "axios";
// import CartService from "../services/cart.service";
// const API_URL = "http://localhost:5000/Ehc/Cart";
// const headerBase = authHeader().authorization
// const config = {
//     headers:{
//       Authorization: `Bearer ${headerBase}`,
//     }
//   };



// const [orderDetails, setOrderDetails] = useState([]);}

// const retrieveOrderDetails = () => {
// CartService.getAllOrderDetails()
//   .then(response => {
//     return(response.data);
//   })
//   .catch(e => {
//     console.log(e);
//   });
// };



// const od = {
//   response: ''
// };

// axios.get(API_URL + "/GetAllOrderDetails", config).then(result=> {
//   if(result.status==200){
//      od.response = result.data;//this.setState({message:"User Updated in Database", updateUser:{}})
//   }
//   console.log(result)
// })

// const ReportsTable = ({ caption }) => {//data

//   const [od, handleSorting] = useSortableTable(od, columns);



//   //   const orderDetailItems = CartService.getAllOrderDetails;
// // //   const retrieveOrderDetails = () => {
// // // CartService.getAllOrderDetails()
// // //   .then(response => {
// // //     return(response.data);
// // //   })
// // //   .catch(e => {
// // //     console.log(e);
// // //   });
// // // };
// //caption, data, columns


//   return (
//     <>
//       <table className="table">
//         <caption>{caption}</caption>
//         <TableHead {...{ columns, handleSorting }} />
//         <TableBody {...{ columns, od }} />
//       </table>
//     </>
//   );
// };
// const Table = ({ caption, data, columns }) => {
//   const [tableData, handleSorting] = useSortableTable(data, columns);





import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../useSortableTable";

const Table = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <caption>{caption}</caption>
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default Table;

// export default ReportsTable;