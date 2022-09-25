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
    CartService.getCartItems(user.id)
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
          }
        >
        </li>)


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
      <div className="col-md-6">
        <h4>Cart List</h4>

        <ul className="list-group">
          {
          emptyList(cartItems)
            }
        </ul>

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
