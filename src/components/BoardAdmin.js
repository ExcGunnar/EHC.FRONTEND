
import {Component} from 'react'
import axios from 'axios';
import authHeader from "../services/auth.header";
import AddMedicine from './AddMedicine';
import UpdateMedicine from './UpdateMedicine';
import DeleteMedicine from './DeleteMedicine';
import ListUsers from './ListUsers';
import Table from './Table';
import ReportTable from './ReportTable';
import CartService from '../services/cart.service';
const API_URL = "http://localhost:5000/Ehc/Cart";
const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };



// const orderDetailsData = retrieveCartItems();

class Profile extends Component {
constructor(props){
    super(props);
    // this.state = {oDs: []};

 
//potentially set state here
    
}

// .then(response => {
//     setOrderDetails(response.data);
//     console.log(response.data);
//   })

    render(){


        //   const data = CartService.getAllOrderDetails();
        //   const other = {
        //     results: ''
        //   };

        //   const orderDetails = axios.get(API_URL + "/GetAllOrderDetails", config).
        //   then(response=> {
        //     if(response.status==200){
        //        (this.setState({response}))
        //     }
        //     console.log(response)
        // }).catch(error=> {
        //     console.log(error)
        //     });
        


        console.log()
        return(
            
            <div className="container">
                <AddMedicine />
            <div className="container">
                <UpdateMedicine />
            </div>
            <div>
                <DeleteMedicine />
            </div>
            <div>
                <ListUsers />
            </div>
            <div>
                <ReportTable />
            </div>
            </div>
        )
    }
}

export default Profile