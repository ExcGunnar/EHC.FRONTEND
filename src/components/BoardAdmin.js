
import {Component} from 'react'

import AddMedicine from './AddMedicine';
import UpdateMedicine from './UpdateMedicine';
import DeleteMedicine from './DeleteMedicine';
import ListUsers from './ListUsers';

class Profile extends Component {
constructor(props){
    super(props);
}

    render(){
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
            </div>
        )
    }
}

export default Profile