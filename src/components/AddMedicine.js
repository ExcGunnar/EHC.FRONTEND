import axios from 'axios';
import {Component} from 'react'
import authHeader from "../services/auth.header";
const API_URL = "http://localhost:5000/Ehc/Medicine";

const headerBase = authHeader().authorization
const config = {
    headers:{
      Authorization: `Bearer ${headerBase}`,
    }
  };

class AddMedicine extends Component {
constructor(props) {
    super(props);
    this.state= {medicineFields:{}}
}



changeHandle=(event)=> {
    let medicineFields = this.state.medicineFields;
    medicineFields.id = 0;
    medicineFields[event.target.name]=event.target.value;
    this.setState({medicineFields:medicineFields});
  
}
handleSubmit=(event)=> {
    event.preventDefault();
    let medicineFields = this.state.medicineFields;
axios.post(API_URL + "/AddMedicine", medicineFields, config).then(result=> {
    if(result.status==200){
        this.setState({message:"Medicine Added to Database",medicineFields:{}})       
    }
    else{
        this.setState({message:"Problem Adding Medicine to Database"}) }
}
).catch(error=> {
    console.log(error)
    if(error.response.status == 400)
    {
        this.setState({message:"Problem Adding Medicine to Database - Check that your fields are valid" ,medicineFields:{}}) 
    };
})
event.target.reset();
}
render() {
    return(
        <div className="container">
            <form onSubmit={this.handleSubmit} className="form-group">
            <div className="row">
                <div className="col-md-8"><h2>Add Medicine Details</h2></div>
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
                <input type="submit" value="Add Medicine" className="btn btn-success"/>
                </div>
                <div className="col-md-3">
                <input type="reset" value="Reset" className="btn btn-info"/> 
                </div>
            </div>
                
            </form>
            <span id="returnMessage" style={{'color':'red'}}>{this.state.message}</span>
        </div>
    )
}
}

export default AddMedicine;