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


const user = JSON.parse(window.sessionStorage.getItem("user"));

class UserFunds extends Component {
constructor(props) {
    super(props);
    this.state= {orderFields:{}}
}


handleSubmit=(event)=> {
    event.preventDefault();
axios.get(API_URL + "/FindAccountFundsById/" + user.id, config).then(result=> {
    if(result.status==200){
        this.setState({message:"Funds: $" + result.data ,orderFields:{}})       
    }
}
).catch(error=> {
    if(error.response.status != 200)
    {
        this.setState({message:"User funds missing or zero. Please contact the business" ,medicineFields:{}}) 
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
                <div className="col-md-8"><h2>Check User Funds</h2></div>
            </div>         
            <div className="row">
                <div className="col-md-4">
                <input type="submit" value="Check Funds" className="btn btn-success"/>
                </div>
            </div>
                
            </form>
            <span style={{'color':'red'}}>{this.state.message}</span>
        </div>
    )
}
}

export default UserFunds;