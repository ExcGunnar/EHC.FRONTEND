
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CartService from "../services/cart.service";
import { Link } from "react-router-dom";

const user = JSON.parse(window.sessionStorage.getItem("user"));


const UserCartListAdd = () => {
  const [items, setProducts] = useState([]);
  const [currentItem, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentDesc, setCurrentItem] = useState("");

  useEffect(() => {
    retrieveProducts();
  }, []);

  const onChangeCurrentItem = e => {
    const currentItem = e.target.value;
    setCurrentItem(currentItem);
  };

  const retrieveProducts = () => {
    CartService.getAllProducts()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveProducts();
    setCurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveProduct = (item, index) => {
    setCurrentProduct(item);
    setCurrentIndex(index);
  };

  const addToCart = () => {
    CartService.addToCart(currentItem.id.toString(), user.id)
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByDisease = () => {
    CartService.findByDisease(currentDesc)
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
    return (
     <div className="col-md-12">
      <div className="card card-container">
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
      </div>
      <div className="col-md-6">
        <h4>Item List - Click on Item for Details</h4>

        <ul className="list-group">
          {items &&
            items.map((item, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(item, index)}
                key={index}
              >
                {item.name}
              </li>
            ))}
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
              {currentItem.name}
            </div>
            <div>
              <label>
                <strong>Company Name:</strong>
              </label>{" "}
              {currentItem.companyName}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentItem.price.toString()}
            </div>
            <div>
              <label>
                <strong>Quantity:</strong>
              </label>{" "}
              {currentItem.quantity.toString()}
            </div>
            <div>
              <label>
                <strong>Image Url:</strong>
              </label>{" "}
              {currentItem.imageUrl}
            </div>
            <div>
              <label>
                <strong>Disease:</strong>
              </label>{" "}
              {currentItem.uses}
            </div>
            <div>
              <label>
                <strong>Expire Date:</strong>
              </label>{" "}
              {currentItem.expireDate}
            </div>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={addToCart}
        >
          Add Selected To Cart
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
      </div>
    </div>
  );
};

export default UserCartListAdd;