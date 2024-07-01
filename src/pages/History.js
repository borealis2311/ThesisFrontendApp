import React, { useState, useEffect } from "react";
import { history, historyComment } from "../services/api";
import { Link } from "react-router-dom";

const History = () => {
  const [historyItem, setHistoryItem] = useState([]);
  const [historyComments, setHistoryComments] = useState([]);
  const [filterComment, setFilterComment] = useState({
    commentDate: "",
    commentProduct: "",
    commentPage: 1
  });
  const [filterOrder, setFilterOrder] = useState({
    orderDate: "",
    orderPage: 1
  });
  const [paginateComment, setPaginateComment] = useState({});
  const [paginateOrder, setPaginateOrder] = useState({});
  const handleFilterComment = (e) => {
    const { name, value } = e.target;
    const updatedFilter = ({ ...filterComment, [name]: value });
    if(name !== "page"){
      updatedFilter.commentPage = 1
    }
    setFilterComment(updatedFilter);
  }
  const handleFilterOrder = (e) => {
    const { name, value } = e.target;
    const updatedFilter = ({ ...filterOrder, [name]: value });
    if(name !== "page"){
      updatedFilter.orderPage = 1
    }
    setFilterOrder(updatedFilter);
  }

  const handlePageComment = (newPage) => {
    setFilterComment({ ...filterComment, page: newPage });
  };

  const handlePageOrder = (newPage) => {
    setFilterOrder({ ...filterOrder, page: newPage });
  };



  useEffect(() => {
    history(filterOrder)
        .then(({ data }) => {
          setHistoryItem(data.data.docs);
          setPaginateOrder(data.data.pages);
        });
      },[filterOrder]);

  useEffect(() => {
      historyComment(filterComment)
      .then(({ data }) => {
        setHistoryComments(data.data.docs);
        setPaginateComment(data.data.pages);
      });
  },[filterComment]);
  return (
    <>
    <section style={{background: '#f5deb3', paddingTop: '50px', minHeight: '750px'}}>
      <div className="container mt-5">
        <div className="p-3 mb-2 bg-light text-dark">
          <h1>History Order</h1>
          <form>
            <div className="row">
              <div className="col">
                <input onChange={handleFilterOrder} name="orderDate" type="date" className="form-control" placeholder="Select date" />
              </div>
            </div>
          </form>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date purchased</th>
                <th scope="col">Total Price</th>
                <th scope="col">Status</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
            {historyItem.map((items, index) => (
              <>
              <tr>
                <td>{new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC' }).format(new Date(items.createdAt))}</td>
                <td>{items.totalPrice}$</td>
                <td>{items.status}</td>
                <td><Link className="btn btn-primary" role="button" to={`/CartInfor-${items._id}`}>Details</Link></td>
              </tr>
              </>
              ))}
            </tbody>
          </table>
          <nav>
              <ul className="pagination">
                {
                  paginateOrder.hasPrev && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageOrder(paginateOrder.currentPage - 1)} disabled={!paginateOrder.hasPrev}>
                        Previous
                      </button>
                    </li>
                  )
                }

                {paginateOrder.totalPages === 1 && (
                      <li className="page-item active">
                        <button className="page-link">1</button>
                      </li>
                    )}

                {paginateOrder.totalPages > 1 && (
                  <li className={`page-item ${paginateOrder.currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageOrder(1)}>1</button>
                  </li>
                )}

                {paginateOrder.currentPage > 3 && <li className="page-item"><span className="page-link">...</span></li>}
                
                {paginateOrder.currentPage > 2 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePageOrder(paginateOrder.currentPage - 1)}>
                      {paginateOrder.currentPage - 1}
                    </button>
                  </li>
                )}
                
                {paginateOrder.currentPage > 1 && paginateOrder.currentPage < paginateOrder.totalPages && (
                  <li className="page-item active">
                    <button className="page-link">{paginateOrder.currentPage}</button>
                  </li>
                )}
                
                {paginateOrder.currentPage < paginateOrder.totalPages - 1 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePageOrder(paginateOrder.currentPage + 1)}>
                      {paginateOrder.currentPage + 1}
                    </button>
                  </li>
                )}
                
                {paginateOrder.currentPage < paginateOrder.totalPages - 2 && <li className="page-item"><span className="page-link">...</span></li>}

                {paginateOrder.totalPages > 1 && (
                  <li className={`page-item ${paginateOrder.currentPage === paginateOrder.totalPages ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageOrder(paginateOrder.totalPages)}>{paginateOrder.totalPages}</button>
                  </li>
                )}

                {
                  paginateOrder.hasNext && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageOrder(paginateOrder.currentPage + 1)} disabled={!paginateOrder.hasNext}>
                        Next
                      </button>
                    </li>
                  )
                }
              </ul>
            </nav>
        </div>
      </div>
      <div className="container mt-5">
        <div className="p-3 mb-2 bg-light text-dark">
          <h1>History Comments</h1>
          <form>
            <div className="row">
              <div className="col">
                <input onChange={handleFilterComment} name="commentDate" type="date" className="form-control" placeholder="Select date" />
              </div>
              <div className="col">
                <input onChange={handleFilterComment} name="commentProduct" type="text" className="form-control" placeholder="Search product" />
              </div>
            </div>
          </form>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" style={{width: '20%'}}>Product name</th>
                <th scope="col" style={{width: '20%'}}>Rating</th>
                <th scope="col" style={{width: '60%'}}>Content</th>
                <th scope="col" style={{width: '20%'}}>Date Created</th>                
              </tr>
            </thead>
            <tbody>
            {historyComments.map((comment, index) => (
              <>
              <tr>
                <td>{comment.product_id.name}</td>
                <td>{comment.rating}</td>
                <td>{comment.content}</td>
                <td>{new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC' }).format(new Date(comment.createdAt))}</td>      
              </tr>
              </>
              ))}
            </tbody>
          </table>
          <nav>
              <ul className="pagination">
                {
                  paginateComment.hasPrev && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageComment(paginateComment.currentPage - 1)} disabled={!paginateComment.hasPrev}>
                        Previous
                      </button>
                    </li>
                  )
                }

                {paginateComment.totalPages === 1 && (
                      <li className="page-item active">
                        <button className="page-link">1</button>
                      </li>
                    )}

                {paginateComment.totalPages > 1 && (
                  <li className={`page-item ${paginateComment.currentPage === 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageComment(1)}>1</button>
                  </li>
                )}

                {paginateComment.currentPage > 3 && <li className="page-item"><span className="page-link">...</span></li>}
                
                {paginateComment.currentPage > 2 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePageComment(paginateComment.currentPage - 1)}>
                      {paginateComment.currentPage - 1}
                    </button>
                  </li>
                )}
                
                {paginateComment.currentPage > 1 && paginateComment.currentPage < paginateComment.totalPages && (
                  <li className="page-item active">
                    <button className="page-link">{paginateComment.currentPage}</button>
                  </li>
                )}
                
                {paginateComment.currentPage < paginateComment.totalPages - 1 && (
                  <li className="page-item">
                    <button className="page-link" onClick={() => handlePageComment(paginateComment.currentPage + 1)}>
                      {paginateComment.currentPage + 1}
                    </button>
                  </li>
                )}
                
                {paginateComment.currentPage < paginateComment.totalPages - 2 && <li className="page-item"><span className="page-link">...</span></li>}

                {paginateComment.totalPages > 1 && (
                  <li className={`page-item ${paginateComment.currentPage === paginateComment.totalPages ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageComment(paginateComment.totalPages)}>{paginateComment.totalPages}</button>
                  </li>
                )}

                {
                  paginateComment.hasNext && (
                    <li className="page-item">
                      <button className="page-link" onClick={() => handlePageComment(paginateComment.currentPage + 1)} disabled={!paginateComment.hasNext}>
                        Next
                      </button>
                    </li>
                  )
                }
              </ul>
            </nav>
        </div>
      </div>
    </section>
    </>
  );
};

export default History;


