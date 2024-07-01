import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from "../services/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({
      params:{
        featured: true,
      }
    }).then(({ data }) =>{ return setProducts(data.data.docs)});
  }, []);
  return (
<> 
    <section id="carousel">
      <div className="carousel slide" data-bs-ride="carousel" id="move">
        <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            className="w-100 d-block" 
            src="https://i.pinimg.com/originals/09/d8/01/09d801f666bfacd3cbb8be437396db18.gif" 
            alt="Slide Image 1"
            style={{height: '760px'}}
          />
          <div className="carousel-caption">
            <h3>Walking into Fantastic Coffee, you will immediately be attracted by the warm and unique space of this place. With an elegant design and subtle colors, the cafe offers customers not only a place to enjoy coffee but also an ideal destination to relax and work.</h3>
          </div>
        </div>
        <div className="carousel-item">
          <img 
            className="w-100 d-block" 
            src="https://i.pinimg.com/originals/68/e1/79/68e1793efd5bbdf9946dec447d8a2dbe.gif" 
            alt="Slide Image 2"
            style={{height: '760px'}}
          />
          <div className="carousel-caption">
            <h3>Fantastic Coffee is not only a place to enjoy coffee but also a destination to experience special flavors, from carefully selected and roasted coffee beans on the spot. With a quiet space and friendly service, this cafe will be an ideal place for you and your family and friends to meet and enjoy memorable moments.</h3>
          </div>
        </div>
        <div className="carousel-item">
          <img 
            className="w-100 d-block"
            src="https://i.pinimg.com/originals/31/ca/2b/31ca2bcf105003bf97be1aaf9e564df6.jpg"
            alt="Slide Image 3"
            style={{height: '760px'}}
          />
          <div className="carousel-caption">
            <h3>Fantastic Coffee attracts customers not only by its delicious cups of coffee but also by its unique and comfortable space. With a modern design and attention to detail, this cafe is an ideal place for you to enjoy relaxing moments and recharge your batteries for a busy working day.</h3>
          </div>
        </div>
        </div>
        <div>
          <button className="carousel-control-prev" type="button" data-bs-target="#move" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span><span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#move" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span><span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#move" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#move" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#move" data-bs-slide-to="2"></button>
        </div>
      </div>
    </section>

      <section id="about" className="odd-section">
        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>About Us</h2>
            </div>
          </div>
          <section className="py-4 py-xl-5">
            <div className="container">
              <div className="bg-dark border rounded border-0 border-dark overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="text-white text-center p-4 p-md-5">
                      <h2 className="fw-bold text-white mb-3">Fantastic Coffee</h2>
                      <p className="mb-4">Welcome to Fantastic Coffee, which brings you premium coffee experiences from the finest coffee beans. With a commitment to using 100% organic coffee beans carefully selected from sustainable farms, we are proud to bring cups of coffee rich in flavor and nutrients. More than just a coffee shop, Fantastic Coffee is also an ideal destination for those who love the art of mixing and exploring global coffee culture. Coming to us, you will enjoy quality products, dedicated service and a comfortable, relaxing space. Let Fantastic Coffee enrich your daily life with every perfect cup of coffee.</p>
                    </div>
                  </div>
                  <div className="col-md-6 order-first order-md-last">
                    <img className="w-100 h-100 fit-cover" src="https://img.freepik.com/free-photo/contemporary-coffee-shop-with-modern-elegance-design-generative-ai_188544-12379.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1718496000&semt=ais_user" style={{height: '800px', weight:'1400px'}} alt="Fantastic Coffee" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section id="featured">
        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>Featured Products</h2>
              <p className="w-lg-50" />
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
          {products.slice(0, 3).map(product => (
              <div className="col">
                  <div className="card">
                      <img className="card-img-top w-100 d-block fit-cover" src={`${product.image}`} style={{ width: '256px', height: '176px' }} alt="{product.image}" />
                      <div className="card-body p-4">
                          <h3 className="card-title text-center">{product.name}</h3>
                      </div>
                  </div>
              </div>
          ))}
          </div>
          <div className="col-xl-12 text-center" style={{paddingTop: 20}}><Link to="/Menu" className="btn btn-primary" >Watch more</Link></div>
        </div>
      </section>
      <div>
      <section id="policies" className="odd-section">
    <div className="container py-4 py-xl-5">
      <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
          <h2>Store Policies</h2>
          <p className="w-lg-50" />
        </div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-md-5 feature-box"><i className="policy-icon fas fa-shopping-cart" style={{color: 'rgb(5,129,254)'}} />
          <h4>Sales</h4>
          <p>All of our coffee products are strictly quality tested and guaranteed to be of clear origin, from sustainable coffee farms.</p>
        </div>
        <div className="col-md-5 feature-box"><i className="policy-icon fas fa-user" style={{color: '#f20707'}} />
          <h4>Membership</h4>
          <p>Customers can register for free membership at the store or on the website to receive special offers.</p>
        </div>
        <div className="col-md-5 feature-box"><i className="policy-icon fas fa-table" style={{color: 'rgb(248,248,1)'}} />
          <h4>Evaluate</h4>
          <p>Customers can rate products, to help Fantastic Coffee have the opportunity to create new dishes</p>
        </div>
        <div className="col-md-5 feature-box"><i className="policy-icon fas fa-credit-card" style={{color: 'rgb(0,255,64)'}} />
          <h4>Payment</h4>
          <p>Accept many payment methods including cash, credit cards, debit cards and bank transfers</p>
        </div>
      </div>
    </div>
  </section>

</div>
  </>
  )
}

export default Home
