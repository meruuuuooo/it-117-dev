

const Dashboard = () => {
    
    return (
        <>
            <div className="nk-content ">
        <div className="container-fluid">
          <div className="nk-content-inner">
            <div className="nk-content-body">
              <div className="nk-block-head nk-block-head-sm">
                <div className="nk-block-between">
                  <div className="nk-block-head-content">
                    <h4 className="nk-block-title page-title">Dashboard</h4>
                  </div>
                </div>
              </div>
              <div className="nk-block">
                <div className="row g-gs">
                  <div className="col-xxl-4 col-md-6">
                    <div className="card is-dark h-100">
                      <div className="nk-ecwg nk-ecwg1">
                        <div className="card-inner">
                          <div className="card-title-group">
                            <div className="card-title">
                              <h6 className="title">Total Sales</h6>
                            </div>
                            <div className="card-tools">
                              <a href="#" className="link">
                                View Report
                              </a>
                            </div>
                          </div>
                          <div className="data">
                            <div className="amount">$74,958.49</div>
                            <div className="info">
                              <strong>$7,395.37</strong> in last month
                            </div>
                          </div>
                          <div className="data">
                            <h6 className="sub-title">This week so far</h6>
                            <div className="data-group">
                              <div className="amount">$1,338.72</div>
                              <div className="info text-end">
                                <span className="change up text-danger">
                                  <em className="icon ni ni-arrow-long-up"></em>
                                  4.63%
                                </span>
                                <br />
                                <span>vs. last week</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nk-ecwg1-ck">
                          <canvas
                            className="ecommerce-line-chart-s1"
                            id="totalSales"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-md-6">
                    <div className="card h-100">
                      <div className="nk-ecwg nk-ecwg2">
                        <div className="card-inner">
                          <div className="card-title-group mt-n1">
                            <div className="card-title">
                              <h6 className="title">Averarge order</h6>
                            </div>
                            <div className="card-tools me-n1">
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="dropdown-toggle btn btn-icon btn-trigger"
                                  data-bs-toggle="dropdown"
                                >
                                  <em className="icon ni ni-more-h"></em>
                                </a>
                                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                  <ul className="link-list-opt no-bdr">
                                    <li>
                                      <a href="#" className="active">
                                        <span>15 Days</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <span>30 Days</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <span>3 Months</span>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="data">
                            <div className="data-group">
                              <div className="amount">$463.35</div>
                              <div className="info text-end">
                                <span className="change up text-danger">
                                  <em className="icon ni ni-arrow-long-up"></em>
                                  4.63%
                                </span>
                                <br />
                                <span>vs. last week</span>
                              </div>
                            </div>
                          </div>
                          <h6 className="sub-title">Orders over time</h6>
                        </div>
                        <div className="nk-ecwg2-ck">
                          <canvas
                            className="ecommerce-bar-chart-s1"
                            id="averargeOrder"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4">
                    <div className="row g-gs">
                      <div className="col-xxl-12 col-md-6">
                        <div className="card">
                          <div className="nk-ecwg nk-ecwg3">
                            <div className="card-inner pb-0">
                              <div className="card-title-group">
                                <div className="card-title">
                                  <h6 className="title">Orders</h6>
                                </div>
                              </div>
                              <div className="data">
                                <div className="data-group">
                                  <div className="amount">329</div>
                                  <div className="info text-end">
                                    <span className="change up text-danger">
                                      <em className="icon ni ni-arrow-long-up"></em>
                                      4.63%
                                    </span>
                                    <br />
                                    <span>vs. last week</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="nk-ecwg3-ck">
                              <canvas
                                className="ecommerce-line-chart-s1"
                                id="totalOrders"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xxl-12 col-md-6">
                        <div className="card">
                          <div className="nk-ecwg nk-ecwg3">
                            <div className="card-inner pb-0">
                              <div className="card-title-group">
                                <div className="card-title">
                                  <h6 className="title">Customers</h6>
                                </div>
                              </div>
                              <div className="data">
                                <div className="data-group">
                                  <div className="amount">194</div>
                                  <div className="info text-end">
                                    <span className="change up text-danger">
                                      <em className="icon ni ni-arrow-long-up"></em>
                                      4.63%
                                    </span>
                                    <br />
                                    <span>vs. last week</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="nk-ecwg3-ck">
                              <canvas
                                className="ecommerce-line-chart-s1"
                                id="totalCustomers"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-8">
                    <div className="card card-full">
                      <div className="card-inner">
                        <div className="card-title-group">
                          <div className="card-title">
                            <h6 className="title">Recent Orders</h6>
                          </div>
                        </div>
                      </div>
                      <div className="nk-tb-list mt-n2">
                        <div className="nk-tb-item nk-tb-head">
                          <div className="nk-tb-col">
                            <span>Order No.</span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <span>Customer</span>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span>Date</span>
                          </div>
                          <div className="nk-tb-col">
                            <span>Amount</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="d-none d-sm-inline">Status</span>
                          </div>
                        </div>
                        <div className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">
                              <a href="#">#95954</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-avatar sm bg-purple-dim">
                                <span>AB</span>
                              </div>
                              <div className="user-name">
                                <span className="tb-lead">
                                  Abu Bin Ishtiyak
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">02/11/2020</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              4,596.75 <span>USD</span>
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="badge badge-dot badge-dot-xs bg-success">
                              Paid
                            </span>
                          </div>
                        </div>
                        <div className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">
                              <a href="#">#95850</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-avatar sm bg-azure-dim">
                                <span>DE</span>
                              </div>
                              <div className="user-name">
                                <span className="tb-lead">Desiree Edwards</span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">02/02/2020</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              596.75 <span>USD</span>
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="badge badge-dot badge-dot-xs bg-danger">
                              Canceled
                            </span>
                          </div>
                        </div>
                        <div className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">
                              <a href="#">#95812</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-avatar sm bg-warning-dim">
                                <img src="./images/avatar/b-sm.jpg" alt="" />
                              </div>
                              <div className="user-name">
                                <span className="tb-lead">Blanca Schultz</span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">02/01/2020</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              199.99 <span>USD</span>
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="badge badge-dot badge-dot-xs bg-success">
                              Paid
                            </span>
                          </div>
                        </div>
                        <div className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">
                              <a href="#">#95256</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-avatar sm bg-purple-dim">
                                <span>NL</span>
                              </div>
                              <div className="user-name">
                                <span className="tb-lead">Naomi Lawrence</span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">01/29/2020</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              1099.99 <span>USD</span>
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="badge badge-dot badge-dot-xs bg-success">
                              Paid
                            </span>
                          </div>
                        </div>
                        <div className="nk-tb-item">
                          <div className="nk-tb-col">
                            <span className="tb-lead">
                              <a href="#">#95135</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-avatar sm bg-success-dim">
                                <span>CH</span>
                              </div>
                              <div className="user-name">
                                <span className="tb-lead">Cassandra Hogan</span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">01/29/2020</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              1099.99 <span>USD</span>
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="badge badge-dot badge-dot-xs bg-warning">
                              Due
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-md-6">
                    <div className="card h-100">
                      <div className="card-inner">
                        <div className="card-title-group mb-2">
                          <div className="card-title">
                            <h6 className="title">Top products</h6>
                          </div>
                          <div className="card-tools">
                            <div className="dropdown">
                              <a
                                href="#"
                                className="dropdown-toggle link link-light link-sm dropdown-indicator"
                                data-bs-toggle="dropdown"
                              >
                                Weekly
                              </a>
                              <div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <a href="#">
                                      <span>Daily</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#" className="active">
                                      <span>Weekly</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span>Monthly</span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="nk-top-products">
                          <li className="item">
                            <div className="thumb">
                              <img src="./images/product/a.png" alt="" />
                            </div>
                            <div className="info">
                              <div className="title">Pink Fitness Tracker</div>
                              <div className="price">$99.00</div>
                            </div>
                            <div className="total">
                              <div className="amount">$990.00</div>
                              <div className="count">10 Sold</div>
                            </div>
                          </li>
                          <li className="item">
                            <div className="thumb">
                              <img src="./images/product/b.png" alt="" />
                            </div>
                            <div className="info">
                              <div className="title">Purple Smartwatch</div>
                              <div className="price">$99.00</div>
                            </div>
                            <div className="total">
                              <div className="amount">$990.00</div>
                              <div className="count">10 Sold</div>
                            </div>
                          </li>
                          <li className="item">
                            <div className="thumb">
                              <img src="./images/product/c.png" alt="" />
                            </div>
                            <div className="info">
                              <div className="title">
                                Black Mi Band Smartwatch
                              </div>
                              <div className="price">$99.00</div>
                            </div>
                            <div className="total">
                              <div className="amount">$990.00</div>
                              <div className="count">10 Sold</div>
                            </div>
                          </li>
                          <li className="item">
                            <div className="thumb">
                              <img src="./images/product/d.png" alt="" />
                            </div>
                            <div className="info">
                              <div className="title">Black Headphones</div>
                              <div className="price">$99.00</div>
                            </div>
                            <div className="total">
                              <div className="amount">$990.00</div>
                              <div className="count">10 Sold</div>
                            </div>
                          </li>
                          <li className="item">
                            <div className="thumb">
                              <img src="./images/product/e.png" alt="" />
                            </div>
                            <div className="info">
                              <div className="title">iPhone 7 Headphones</div>
                              <div className="price">$99.00</div>
                            </div>
                            <div className="total">
                              <div className="amount">$990.00</div>
                              <div className="count">10 Sold</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div className="card h-100">
                      <div className="card-inner">
                        <div className="card-title-group mb-2">
                          <div className="card-title">
                            <h6 className="title">Store Statistics</h6>
                          </div>
                        </div>
                        <ul className="nk-store-statistics">
                          <li className="item">
                            <div className="info">
                              <div className="title">Orders</div>
                              <div className="count">1,795</div>
                            </div>
                            <em className="icon bg-primary-dim ni ni-bag"></em>
                          </li>
                          <li className="item">
                            <div className="info">
                              <div className="title">Customers</div>
                              <div className="count">2,327</div>
                            </div>
                            <em className="icon bg-info-dim ni ni-users"></em>
                          </li>
                          <li className="item">
                            <div className="info">
                              <div className="title">Products</div>
                              <div className="count">674</div>
                            </div>
                            <em className="icon bg-pink-dim ni ni-box"></em>
                          </li>
                          <li className="item">
                            <div className="info">
                              <div className="title">Categories</div>
                              <div className="count">68</div>
                            </div>
                            <em className="icon bg-purple-dim ni ni-server"></em>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Dashboard;