import { useState } from 'react'

const Login = ({ setIsAuthenticated }) => {

    const adminUsername = "Meruuuuooo"
    const adminPassword = "admin123"

    const [username, setUsername] = useState("Meruuuuooo")
    const [password, setPassword] = useState("admin123")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === adminUsername && password === adminPassword) {
			localStorage.setItem("is_authenticated", true);
            setIsLoggedIn(true);
			setIsAuthenticated(true);
        }
    }


    return (
        <>
            <div className="nk-app-root">
				<div className="nk-main">
					<div className="nk-wrap nk-wrap-nosidebar">
						<div className="nk-content">
							<div className="nk-split nk-split-page nk-split-lg">
								<div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white">
									<div className="absolute-top-right d-lg-none p-3 p-sm-5">
										<a
											href="#"
											className="toggle btn-white btn btn-icon btn-light"
											data-target="athPromo"
										>
											<em className="icon ni ni-info"></em>
										</a>
									</div>
									<div className="nk-block nk-block-middle nk-auth-body">
										<div className="brand-logo pb-5">
											<img
												className="logo-dark logo-img logo-img-lg"
												src="./public/mainlogo.png"
												alt="Logo"
												width="200"
												height="100"
											/>
										</div>
										<div className="nk-block-head">
											<div className="nk-block-head-content">
												<h5 className="nk-block-title">Sign-In</h5>
												<div className="nk-block-des">
													<p>
														Mog everyone in LookMaxxing, using your email and
														passcode.
													</p>
												</div>
											</div>
										</div>

										{isLoggedIn && (
											<div className="alert alert-danger">
												<b>Invalid = MOGGED</b>. Please Try Again
											</div>
										)}

										<form onSubmit={handleLogin}>
											<div className="form-group">
												<div className="form-label-group">
													<label className="form-label" htmlFor="email-address">
														Email or Username
													</label>
													<a className="link link-primary link-sm" href="#">
														Need Help?
													</a>
												</div>
												<div className="form-control-wrap">
													<input
														type="text"
														className="form-control form-control-lg"
														required
														id="email-address"
														value={username}
														placeholder="Enter your email address or username"
														onChange={(e) => setUsername(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="form-label-group">
													<label className="form-label" htmlFor="password">
														Passcode
													</label>
													<a
														className="link link-primary link-sm"
														href="html/pages/auths/auth-reset.html"
													>
														Forgot Code?
													</a>
												</div>
												<div className="form-control-wrap">
													<a
														href="#"
														className="form-icon form-icon-right passcode-switch lg"
														data-target="password"
													>
														<em className="passcode-icon icon-show icon ni ni-eye"></em>
														<em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
													</a>
													<input
														type="password"
														className="form-control form-control-lg"
														required
														id="password"
														placeholder="Enter your passcode"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<button className="btn btn-lg btn-primary btn-block">
													Sign in
												</button>
											</div>
										</form>
									</div>
									<div className="nk-block nk-auth-footer">
										<div className="nk-block-between">
											<ul className="nav nav-sm">
												<li className="nav-item">
													<a className="nav-link" href="#">
														Terms & Condition
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="#">
														Privacy Policy
													</a>
												</li>
												<li className="nav-item">
													<a className="nav-link" href="#">
														Help
													</a>
												</li>
												<li className="nav-item dropup">
													<a
														className="dropdown-toggle dropdown-indicator has-indicator nav-link"
														data-bs-toggle="dropdown"
														data-offset="0,10"
													>
														<small>English</small>
													</a>
													<div className="dropdown-menu dropdown-menu-sm dropdown-menu-end">
														<ul className="language-list">
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/english.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">English</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/spanish.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">Español</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/french.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">
																		Français
																	</span>
																</a>
															</li>
															<li>
																<a href="#" className="language-item">
																	<img
																		src="./images/flags/turkey.png"
																		alt=""
																		className="language-flag"
																	/>
																	<span className="language-name">Türkçe</span>
																</a>
															</li>
														</ul>
													</div>
												</li>
											</ul>
										</div>
										<div className="mt-3">
											<p>&copy; 2022 LookMaxxing. All Rights Reserved.</p>
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

export default Login