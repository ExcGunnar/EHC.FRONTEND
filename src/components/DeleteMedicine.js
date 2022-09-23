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

class DeleteMedicine extends Component {
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
axios.delete(API_URL + "/DeleteMedicineById/" + medicineFields.id, config).then(result=> {
    if(result.status==200){
        this.setState({message:"Medicine Deleted from Database",medicineFields:{}})       
    }
    else if (result.status!=200){
        this.setState({message:"Problem Deleting Medicine to Database"}) }
}
).catch(error=> {
    console.log(error);
})
event.target.reset();
}
render() {
    return(
        <div className="container">
            <form onSubmit={this.handleSubmit} className="form-group">
            <div className="row">
                <div className="col-md-8"><h2>Delete Medicine</h2></div>
            </div>
            <div className="row">
                <div className="col-md-4"><label>Id</label></div>
                <div className="col-md-4"><input type="text" name="id"  
                onChange={this.changeHandle} className="form-control"/></div>
            </div>   
            
            
            <div className="row">
                <div className="col-md-4">
                <input type="submit" value="Delete Medicine" className="btn btn-success"/>
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

export default DeleteMedicine;