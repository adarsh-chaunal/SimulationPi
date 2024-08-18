function HomeTopicList() {
  return (
      <>
          <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                  <div className="carousel-item active">
                      <div className="card d-block" style={{ width: '18rem' }} >
                          <img src="..." className="card-img-top" alt="..." />
                              <div className="card-body">
                                  <h5 className="card-title">Card title 1</h5>
                                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                  <a href="#" className="btn btn-primary">Go somewhere</a>
                              </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <div className="card d-block" style={{ width: '18rem' }} >
                          <img src="..." className="card-img-top" alt="..." />
                              <div className="card-body">
                                  <h5 className="card-title">Card title 2</h5>
                                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                  <a href="#" className="btn btn-primary">Go somewhere</a>
                              </div>
                      </div>
                  </div>
                  <div className="carousel-item">
                      <div className="card d-block" style={{ width: '18rem' }} >
                          <img src="..." className="card-img-top" alt="..." />
                              <div className="card-body">
                                  <h5 className="card-title">Card title 3</h5>
                                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                  <a href="#" className="btn btn-primary">Go somewhere</a>
                              </div>
                      </div>
                  </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>
      </>
  );
}

export default HomeTopicList;