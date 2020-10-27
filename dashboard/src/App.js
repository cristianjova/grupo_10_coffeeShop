import React, { Component } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import KeyMetric from './components/KeyMetric';
import Detail from './components/Detail'
import Table from './components/Table';
import Categories from './components/Categories';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      products: [],
      totalProducts: 0,
      totalUsers: 0,
      detailUser: "",
      lastItem: "",
      categories : ""
    };
  }

  apiCall(url, callback) {
    axios
      .get(url)
      .then(response => callback(response))
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.apiCall(`http://localhost:3000/api/products`, (response) => {
      this.setState({
        products: response.data.products,
        categories: response.data.meta.categories,
        totalProducts: response.data.meta.count
      })
    });
    this.apiCall(`http://localhost:3000/api/users`, (response) => {
      this.setState({
        users: response.data.users,
        totalUsers: response.data.meta.count,
        lastItem: response.data.users[response.data.users.length - 1].detail
      });

      this.apiCall(this.state.lastItem, (response) => {
        this.setState({
          detailUser: response.data
        })
      });

    });


    
  }
  render() {
    const metrics = [
      {
        color: "primary",
        title: "Cantidad de Usuarios",
        value: this.state.totalUsers,
        iconClass: "fa-clipboard-list",
      },
      {
        color: "success",
        title: "Total de productos",
        value: this.state.totalProducts,
        iconClass: "fa-dollar-sign",
      },
      {
        color: "warning",
        title: "Monto total de productos en $",
        value: this.state.products.reduce((total, product) => total += product.price, 0), 
        iconClass: "fa-user-check",
      },
    ];

    console.log(this.state.categories)


    
    return (
      <div id="wrapper">

        <Sidebar />
        
        <div id="content-wrapper" className="d-flex flex-column">

          <div id="content">

            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>

              <ul className="navbar-nav ml-auto">

                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="/" id="alertsDropdown">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">+1</span>
                  </a>
                </li>

                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="/" id="messagesDropdown">
                    <i className="fas fa-envelope fa-fw"></i>
                    <span className="badge badge-danger badge-counter">1</span>
                  </a>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="/" id="userDropdown">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">User</span>
                    <img className="img-profile rounded-circle" src="/images/dummy-avatar.jpg" alt="Imagen de perfil" width="60" />
                  </a>
                </li>

              </ul>

            </nav>

            <div className="container-fluid">

              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Aplicacion de back office de Coffee Shop</h1>
              </div>
              <div className="row">
                { metrics.map(metric =>
                  <KeyMetric 
                    color= { metric.color }
                    title= { metric.title }
                    value= { metric.value }
                    iconClass= { metric.iconClass }
                  />
                )}
              </div>

              <div className="row">
                <Detail
                  item = {this.state.detailUser}
                />

                {/*Box de categorias*/}
                <Categories
                  categories = {this.state.categories}
                />

              </div>


              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Todos los productos</h1>
                  </div>

              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="card shadow mb-4">
                    <div className="card-body">
                      <Table 
                        products = {this.state.products}
                      />
                    </div>
                  </div>				
                </div>
              </div>

            </div>
          </div>


          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; CoffeeShop 2020</span>
              </div>
            </div>
          </footer>

        </div>

      </div>
    );
  }
}

export default App;
