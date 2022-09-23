import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CartService from "../services/cart.service";
import { Link } from "react-router-dom";

const user = JSON.parse(window.sessionStorage.getItem("user"));


const UserCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentItem, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentDesc, setCurrentItem] = useState("");

  useEffect(() => {
    retrieveCartItems();
  }, []);

  const onChangeCurrentItem = e => {
    const currentItem = e.target.value;
    setCurrentItem(currentItem);
  };

  const retrieveCartItems = () => {
    CartService.getCartItems(user.id)//user.id, currentItem.id.toString(),
      .then(response => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const placeOrder = () => {
    CartService.placeOrder(user.id, cartItems)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCartItems();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (item, index) => {
    setCurrentProduct(item);
    setCurrentIndex(index);
    // refreshList();
  };

  const removeFromCart = () => {
    CartService.removeFromCart(user.id, currentItem.cartId.toString(), currentItem.id.toString())
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeAllFromCart = () => {
    CartService.removeAllFromCart(user.id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const emptyList = (e) => {
    if (e !== "User's Cart is Empty")
    {
      return(      cartItems &&
        cartItems.map((item, index) => (
          <li
            className={
              "list-group-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => setActiveProduct(item, index) }
            key={index}
          >
            {item.product.name}
          </li>
)
    ))
   }
    else {
      return(        
      <li
          className={
            "list-group-item " 
            //+ (index === currentIndex ? "active" : "")
          }
          // onClick={() => setActiveProduct(item, index) }
          // key={index}
        >
          {/* {item.product.name} */}
        </li>)
      // cartItems &&
      // cartItems.map((item, index) => (

    }
  }

  const findByDisease = () => {
    CartService.findByDisease(currentDesc)
      .then(response => {
        setCartItems(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
    return (
     <div className="col-md-12">
      {/* <div className="card card-container">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Disease"
            value={currentDesc}
            onChange={onChangeCurrentItem}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDisease}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-6">
        <h4>Cart List</h4>

        <ul className="list-group">
          {
          // cartItems &&
          //   cartItems.map((item, index) => (
          //     <li
          //       className={
          //         "list-group-item " + (index === currentIndex ? "active" : "")
          //       }
          //       onClick={() => setActiveProduct(item, index) }
          //       key={index}
          //     >
          //       {item.product.name}
          //     </li>
          //   ))
          emptyList(cartItems)
            }
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentItem ? (
          <div>
            <h4>Item</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentItem.product.name}
            </div>
            <div>
              <label>
                <strong>Company Name:</strong>
              </label>{" "}
              {currentItem.product.companyName}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentItem.product.price.toString()}
            </div>
            <div>
              <label>
                <strong>Quantity:</strong>
              </label>{" "}
              {currentItem.product.quantity.toString()}
            </div>
            <div>
              <label>
                <strong>Image Url:</strong>
              </label>{" "}
              {currentItem.product.imageUrl}
            </div>
            <div>
              <label>
                <strong>Disease:</strong>
              </label>{" "}
              {currentItem.product.uses}
            </div>
            <div>
              <label>
                <strong>Expire Date:</strong>
              </label>{" "}
              {currentItem.product.expireDate}
            </div>


        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeFromCart}
        >
          Remove Selected From Cart
        </button>

            {/* <Link
              to={"/users/" + currentItem.id}
              className="badge badge-warning"
            >
              Edit
            </Link> */}
          </div>
          
        ) : (
          <div>
            <br />
            <p>Please click on an item for more info...</p>
          </div>
        )}

          <button
          className="m-3 btn btn-sm btn-info"
          onClick={refreshList}
        >
          Refresh Cart
        </button>

        <button
          className="m-3 btn btn-sm btn-info"
          onClick={() => {
              placeOrder()          
          }}
        >
          Place Order
        </button>
        <button
          className="m-3 btn btn-sm btn-info"
          onClick={() => {
            removeAllFromCart()          
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default UserCartItems;

// public int OrderId { get; set; }

// [ForeignKey("UserModel")]
// public long UserId { get; set; }

// public string Item { get; set; }

// public decimal Amount { get; set; }

// public DateTime PlacedOn { get; set; }

// public string OrderStatus { get; set; }