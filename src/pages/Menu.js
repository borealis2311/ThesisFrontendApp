import React, { useEffect, useState } from 'react';
import { getCategories, getProducts } from "../services/api";
import { Link } from "react-router-dom";

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    search: "",
    page: 1,
  });
  const [paginate, setPaginate] = useState({});

  const handleFilter = (e) => {
    const { name, value } = e.target;
    const updatedFilter = ({ ...filter, [name]: value });
    if(name !== "page"){
      updatedFilter.page = 1
    }
    setFilter(updatedFilter);
  }

  const handlePage = (newPage) => {
    setFilter({ ...filter, page: newPage });
  };


  useEffect(() => {
    getCategories().then(({ data }) => { setCategories(data.data.docs) });
  }, []);

  useEffect(() => {
    getProducts(filter).then(({ data }) => { 
      setProducts(data.data.docs); 
      setPaginate(data.data.pages);
    });
  }, [filter]);

  return (
    <section style={{ background: '#f5deb3', paddingTop: 20, minHeight: 800 }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header"><span>Filter</span></div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="category">Category</label>
                    <select onChange={handleFilter} name="category" className="form-select form-select" id="category">
                      <option value="">All</option>
                      {categories.map((category) => (
                        <option value={`${category._id}`} key={category._id}>{category.title}</option>
                      ))}
                    </select></div>
                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="minPrice">Min</label>
                      <input onChange={handleFilter} name="minPrice" className="form-control form-control" type="number" min="0" id="minPrice" placeholder="Minimum price" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="maxPrice">Max</label>
                      <input onChange={handleFilter} name="maxPrice" className="form-control form-control" type="number" min="0" id="maxPrice" placeholder="Maximum price" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="search">Search</label>
                    <input onChange={handleFilter} name="search" className="form-control form-control" type="text" id="search" placeholder="Search" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {products.map(product => {                    
                    return (
                      <div className="col-md-4 mb-3" key={product._id}>
                        <div className="card">
                          <Link to={`/ProductDetails-${product._id}`}>
                            <img
                              className="card-img-top w-100 d-block card-img-top"
                              src={`${product.image}`}
                              alt={product.name}
                              style={{ width: '256px', height: '176px' }}
                            />
                          </Link>
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">
                                <span className="col-md-4 mb-3">{product.price}$</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <br/>
            <nav>
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
            </nav>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu;
