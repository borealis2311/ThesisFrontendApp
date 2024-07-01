import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { order } from "../services/api";
import { updateQty, deleteItems } from "../redux/cartReducer";

const Cart = () => {
  const items = useSelector(({ Cart }) => Cart.items);
  const dispatch = useDispatch();
  const currentUser = useSelector(({ Auth }) => Auth.login.currentUser);
  const user_id = useSelector(({Auth})=>Auth.login.currentUser._id);
  const changeQty = (e, id)=>{
    const {value} = e.target;
    return dispatch(updateQty({
      _id: id,
      qty: Number(value)
    }));
  }

  const newItems = items.map((item)=>({
    name: item.name,
    price: item.price,
    qty: item.qty,
  }));

  const payment = (e) => {
    e.preventDefault();
        order({
            user_id,
            email: currentUser.email,
            items: newItems,
        }).then((response) => {
            if(response.data.url){
              window.location.href = response.data.url
            }
        })
        .catch((error) => {
            console.log(error);
        });
  };

  const deleteItem = (e, id, name)=>{
    e.preventDefault();
    const isConfirm = window.confirm(`Do you want to remove ${name} from the cart?`);
    if (isConfirm) {
      dispatch(deleteItems({ _id: id }));
    }
  }

  return (
    <section id="cart" style={{ background: '#f5deb3', paddingTop: 20, minHeight: 800 }}>
      <div className="container mt-5">
        <h1 className="mb-4">Your cart</h1>
        <form method="post">
          <div className="row">
          {items.length === 0 ? (
              <div className="col-md-12 text-center">
                <p>Your cart is empty. <Link to="/Menu">Continue shopping</Link></p>
              </div>
            ) : (
              <>
            <div className="col-md-8 cart-items">
              {
                items.map((item) => {
                  return (
                    <div className="card mb-3" key={item._id}>
                      <div className="row g-0">
                        <div className="col-md-4"><img className="img-fluid rounded-start" src={`${item.image}`} alt="Product 1" style={{ width: '160px', height: '160px' }} /></div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text"> Quantity:
                              <input onChange={(e)=>changeQty(e, item._id)} className="form-control d-inline form-control form-control w-25" type="number" min={1} value={item.qty} />
                            </p>
                            <p className="card-text"><small className="text-muted">Price: ${item.price}/1</small></p>
                            <button onClick={(e)=>deleteItem(e, item._id, item.name)} className="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Summary</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center"><span> Total Price</span>
                      <strong>${items.reduce((total, item) => total + item.qty * item.price, 0)}</strong>
                    </li>
                  </ul>
                </div>
              </div>
              <button onClick={payment} className="btn btn-primary btn-lg btn-block" type="submit">Payment</button>

            </div>
            </>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Cart;
