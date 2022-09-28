import axios from 'axios';
import {Component} from 'react'
import authHeader from "../services/auth.header";
const API_URL = "http://localhost:30499/Ehc/User";

const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };

class OrderStatus extends Component {
constructor(props) {
    super(props);
    this.state= {orderFields:{}}
}

changeHandle=(event)=> {
    let orderFields = this.state.orderFields;
    orderFields[event.target.name]=event.target.value;
    this.setState({orderFields:orderFields});
  
}
handleSubmit=(event)=> {
    event.preventDefault();
    let orderFields = this.state.orderFields;
axios.get(API_URL + "/FindOrderById/" + orderFields.id, config).then(result=> {
    if(result.status==200){
        this.setState({message:"Order Status: " + result.data ,orderFields:{}})       
    }
}
).catch(error=> {
    if(error.response.status == 400)
    {
        this.setState({message:"Problem Finding Order - Make sure order id is valid or filled" ,updateUser:{}}) 
    };
    console.log(error);
})
event.target.reset();
}
render() {
    return(
        <div className="container">
            <form onSubmit={this.handleSubmit} className="form-group">
            <div className="row">
                <div className="col-md-8"><h2>Order Status</h2></div>
            </div>
            <div className="row">
                <div className="col-md-4"><label>Order Id</label></div>
                <div className="col-md-4"><input type="text" name="id"  
                onChange={this.changeHandle} className="form-control"/></div>
            </div>   
            
            
            <div className="row">
                <div className="col-md-4">
                <input type="submit" value="Check Order" className="btn btn-success"/>
                </div>
                <div className="col-md-3">
                <input type="reset" value="Reset" className="btn btn-info"/> 
                </div>
            </div>
                
            </form>
            <span style={{'color':'red'}}>{this.state.message}</span>
        </div>
    )
}
}

export default OrderStatus;