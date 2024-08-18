//import { Link } from "react-router-dom";

//function NavBar() {
//    return (
//        <nav>
//            <Link className="nav-link" to="/">Home</Link>
//            {/*<Link className="nav-link" to="/showPlot">Show Plot</Link>*/}
//        </nav>
//    );
//}

//export default NavBar;
import { Link } from "react-router-dom";

function NavBar() {
  return (
      <>
          <nav className="navbar navbar-dark navbar-expand-lg">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">SimulationPi</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <Link className="nav-link" to="/">Home</Link>
                              {/*<a className="nav-link active" aria-current="page" href="/">Home</a>*/}
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link" to="/showPlot">Show Plot</Link>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#">Topics</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Simulations</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      </>
  );
}

export default NavBar;