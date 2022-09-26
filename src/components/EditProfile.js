import axios from 'axios';
import {Component} from 'react'
import authHeader from "../services/auth.header";
const API_URL = "http://localhost:5000/Ehc/User";
const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };
class UpdateUser extends Component {
    constructor(props){
        super(props);
        this.state = {updateUser:{}};

    }


    changeHandle=(event)=> {
        let updateUser = this.state.updateUser;
        let user = JSON.parse(window.sessionStorage.getItem("user"));
        updateUser.id = user.id;
        updateUser.isAdmin = false;
        updateUser[event.target.name]=event.target.value;
        this.setState({updateUser:updateUser});
      
    }

    handleSubmit=(event)=> {
        event.preventDefault();
        let updateUser = this.state.updateUser;
        axios.put(API_URL + "/UpdateUser", updateUser, config).then(result=> {
            if(result.status==200){
               this.setState({message:"User Updated in Database", updateUser:{}});
            }
            console.log(result)
        }).catch(error=> {
        console.log(error)
        if(error.response.status == 400)
        {
            this.setState({message:"Problem Updating User Info - Check that your fields are valid" ,updateUser:{}}) 
        };
        })
    }
  
    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="form-group">
                <div className="row">
                    <div className="col-md-8"><h2>Update User Details</h2></div>
                </div>
                <div className="row">
                    <div className="col-md-4"><label>First Name</label></div>
                    <div className="col-md-4"><input type="text" name="firstName"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div>   
                
                <div className="row">
                    <div className="col-md-4"><label>Last Name</label></div>
                    <div className="col-md-4"><input type="text" name="lastName"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Email</label></div>
                    <div className="col-md-4"><input type="text" name="email"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div>

                <div className="row">
                    <div className="col-md-4"><label>Password</label></div>
                    <div className="col-md-4">
                    <input type="text" name="password" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
                
                <div className="row">
                    <div className="col-md-4"><label>DoB</label></div>
                    <div className="col-md-4">
                    <input type="date" name="dateOfBirth" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Phone</label></div>
                    <div className="col-md-4">
                    <input type="tel" name="phone" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Address</label></div>
                    <div className="col-md-4">
                    <input type="text" name="address" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
                 
                <div className="row">
                    <div className="col-md-4">
                    <input type="submit" value="Update User" className="btn btn-success"/>
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

export default UpdateUser;

