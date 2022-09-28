import axios from 'axios';
import {Component} from 'react'
import authHeader from "../services/auth.header";
const API_URL = "http://localhost:30499/Ehc/Medicine";
const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };
class UpdateMedicine extends Component {
    constructor(props){
        super(props);
        this.state = {updateMedicine:{}};
    }

    changeHandle=(event)=> {
        let updateMedicine = this.state.updateMedicine;
        updateMedicine[event.target.name]=event.target.value;
        this.setState({updateMedicine:updateMedicine});
      
    }

    handleSubmit=(event)=> {
        event.preventDefault();
        let updateMedicine = this.state.updateMedicine;
        axios.put(API_URL + "/UpdateMedicine", updateMedicine, config).then(result=> {
            if(result.status==200){
               this.setState({message:"Medicine Updated in Database", updateMedicine:{}});
            }
            console.log(result)
        }).catch(error=> {
        console.log(error)
        if(error.response.status == 400)
        {
            this.setState({message:"Problem Updating Medicine in Database - Check that your fields are valid" ,medicineFields:{}}) 
        };
        })
    }
  
    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} className="form-group">
                <div className="row">
                    <div className="col-md-8"><h2>Update Medicine Details</h2></div>
                </div>

                <div className="row">
                    <div className="col-md-4"><label>Id - Used to Select Medicine</label></div>
                    <div className="col-md-4"><input type="number" name="id"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div> 

                <div className="row">
                    <div className="col-md-4"><label>Name</label></div>
                    <div className="col-md-4"><input type="text" name="name"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div>   
                
                <div className="row">
                    <div className="col-md-4"><label>Company Name</label></div>
                    <div className="col-md-4"><input type="text" name="companyName"  
                    onChange={this.changeHandle} className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Price</label></div>
                    <div className="col-md-4">
                    <input type="number" name="price" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
                
                <div className="row">
                    <div className="col-md-4"><label>Quantity</label></div>
                    <div className="col-md-4">
                    <input type="number" name="quantity" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Image URL</label></div>
                    <div className="col-md-4">
                    <input type="url" name="imageUrl" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Uses</label></div>
                    <div className="col-md-4">
                    <input type="text" name="uses" onChange={this.changeHandle}
                    className="form-control"/></div>
                </div>
    
                <div className="row">
                    <div className="col-md-4"><label>Expire Date</label></div>
                    <div className="col-md-4">
                    <input type="text" name="expireDate" onChange={this.changeHandle}
                    
                    className="form-control"/></div>
                </div>
    
                
                <div className="row">
                    <div className="col-md-4">
                    <input type="submit" value="Update Medicine" className="btn btn-success"/>
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

export default UpdateMedicine;

