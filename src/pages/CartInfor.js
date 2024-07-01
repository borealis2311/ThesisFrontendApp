import React, { useState, useEffect } from "react";
import { detailsCart } from "../services/api"; 
import { useParams } from "react-router-dom";

const CartInfor = () => {
    const [details, setDetails] = useState([]);
    const { id } = useParams(); 

    useEffect(() => {
        detailsCart(id, {})
            .then(({ data }) => {
                setDetails(data.data.docs.items);
            })
    }, [id]);

    return (
        <section style={{ background: '#f5deb3', paddingTop: 20, minHeight: 750 }}>
            <div className="container mt-5">
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((item, index) => (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.price}$</td>
                                    <td>{item.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default CartInfor;
