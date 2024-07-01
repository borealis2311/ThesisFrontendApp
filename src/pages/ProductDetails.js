import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getInfoProduct, getComments, createCommentProduct } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { addItems } from "../redux/cartReducer";
import StarRatings from 'react-star-ratings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const [inputComment, setInputComment] = useState({});
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [avgRating, setAvgRating] = useState(0);
    const changeRating = ( newRating ) => {
        setRating(newRating);
    };
    const [filter, setFilter] = useState({
      page: 1,
    });
    const [paginate, setPaginate] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logged = useSelector(({ Auth }) => Auth.login.logged);
    const currentUser = useSelector(({ Auth }) => Auth.login.currentUser);
    const addCart = ()=>{
        dispatch(addItems({
          _id: id,
          name: product.name,
          image: product.image,
          price: product.price,
          qty: 1,
        }));
        return navigate("/Cart");
    }

    useEffect(() => {
        getInfoProduct(id, {})
            .then(({ data }) => {
                setProduct(data.data.docs);
            });
    }, [id]);

    useEffect(() => {
      getComments(id, filter, {})
          .then(({ data }) => {
              setComments(data.data.docs.comments);
              setAvgRating(data.data.docs.averageRating);
              setPaginate(data.data.pages);
          });
  }, [id, filter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputComment({ ...inputComment, [name]: value });
    };
    
    const handlePage = (newPage) => {
      setFilter({ ...filter, page: newPage });
    };

    const postComment = (e) => {
        e.preventDefault();
        if (!inputComment.content || rating < 1) {
            toast.error('Please enter content and rate at least 1 star.');
            return;
        }        
        const combineData = { ...inputComment, email: currentUser.email, rating: rating };
        createCommentProduct(id, combineData)
            .then(({ data }) => {
                if (data.status === "success") {
                    window.location.reload();
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <section style={{ background: '#f5deb3', paddingTop: 20, minHeight: 800 }}>
            <div className="container">
                <div className="row mt-5">
                <ToastContainer />
                    <div className="col-md-6 col-lg-3">
                        <img className="img-fluid" src={`${product.image}`} alt={product.name} />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}$</p>
                        <StarRatings
                            rating={avgRating}
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="yellow"                                        
                        />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            {logged ? (
                            product.is_stock ? (
                                <button onClick={addCart} className="btn btn-primary">Add to cart</button>
                            ) : (
                                <button className="btn btn-secondary" disabled>Out of stock</button>
                            )
                            ) : (
                            <Link to="/Login" className="btn btn-primary">Login</Link>
                        )}
                    </div>
                </div>
                <div className="row justify-content-start mt-5">
                    <div className="col-md-12">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div> 
                </div>
                <div className="row justify-content-start mt-5">
                    <div className="col-md-12">
                        <h3>Reviews</h3>
                        {comments.map(comment => (
                            <div className="card mt-3" key={comment._id}>
                                <div className="card-body">
                                    <h5 className="card-title">{comment.user_id.first_name} {comment.user_id.last_name} - {moment(comment.createdAt).fromNow()}</h5>
                                    <StarRatings
                                        rating={comment.rating}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        starRatedColor="yellow"                                        
                                    />
                                    <p className="card-text">{comment.content}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <br/>
                <ul className="pagination">
                {
                  paginate.hasPrev && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePage(paginate.currentPage - 1)} disabled={!paginate.hasPrev}>
                        Previous
                      </button>
                    </li>
                  )
                }

                {paginate.totalPages === 1 && (
                      <li className="page-item active">
                        <button className="page-link">1</button>
                      </li>
                    )}

                {paginate.totalPages > 1 && (
                  <li className={`page-item ${paginate.currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePage(1)}>1</button>
                  </li>
                )}

                {paginate.currentPage > 3 && <li className="page-item"><span className="page-link">...</span></li>}
                
                {paginate.currentPage > 2 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePage(paginate.currentPage - 1)}>
                      {paginate.currentPage - 1}
                    </button>
                  </li>
                )}
                
                {paginate.currentPage > 1 && paginate.currentPage < paginate.totalPages && (
                  <li className="page-item active">
                    <button className="page-link">{paginate.currentPage}</button>
                  </li>
                )}
                
                {paginate.currentPage < paginate.totalPages - 1 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePage(paginate.currentPage + 1)}>
                      {paginate.currentPage + 1}
                    </button>
                  </li>
                )}
                
                {paginate.currentPage < paginate.totalPages - 2 && <li className="page-item"><span className="page-link">...</span></li>}

                {paginate.totalPages > 1 && (
                  <li className={`page-item ${paginate.currentPage === paginate.totalPages ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePage(paginate.totalPages)}>{paginate.totalPages}</button>
                  </li>
                )}

                {
                  paginate.hasNext && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePage(paginate.currentPage + 1)} disabled={!paginate.hasNext}>
                        Next
                      </button>
                    </li>
                  )
                }
              </ul>
                <div className="row justify-content-start mt-5">
                    {logged ? (
                        <div className="col-md-12">
                            <h3 className="text-center">Your comments</h3>
                            <form>
                                <div className="form-group">
                                    <textarea className="form-control" name="content" onChange={handleChange} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                                    <StarRatings
                                    rating={rating}
                                    starRatedColor="yellow"
                                    starHoverColor="yellow"
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                />
                                </div>
                                <button onClick={postComment} className="btn btn-primary" type="submit" style={{ marginBottom: 20, marginTop: 20 }}>Submit</button>
                            </form>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
