import {Component} from 'react'
import EditProfile from './EditProfile';
import OrderStatus from './OrderStatus';
import UserFunds from './UserFunds';
import UserCart from './UserCartListAdd';
import UserCartItems from './UserCartItems';
import UserCartListAdd from './UserCartListAdd';

class Profile extends Component {
constructor(props){
    super(props);
}

    render(){
        console.log()
        return(
            <div className="container">
                <EditProfile />
            <div className="container">
                <OrderStatus />
            </div>
            <div>
                <UserFunds />
            </div>
            <div>
            <UserCartListAdd />
            </div> 
            <div>
                <UserCartItems />
            </div> 
            </div>
        )
    }
}

export default Profile