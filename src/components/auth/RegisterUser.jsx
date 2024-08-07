import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user"); // default role as "user"
	const navigate = useNavigate();

	const [fullName, setFullName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [nationality, setNationality] = useState("");
	const [useFullNameToDisplay, setUseFullNameToDisplay] = useState(false);
	const [addressLine1, setAddressLine1] = useState("");
	const [addressLine2, setAddressLine2] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [cart, setCart] = useState([]);

	const [agree, setAgree] = useState(false);

	console.log(agree);

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("http://localhost:3000/users", {
				fullName, // Example variable for full name
				displayName, // Example variable for display name
				email, // Example variable for email
				phoneNumber, // Example variable for phone number
				dateOfBirth, // Example variable for date of birth
				nationality, // Example variable for nationality
				useFullNameToDisplay, // Example variable for whether to use full name to display
				address: {
					addressLine1, // Example variable for address line 1
					addressLine2, // Example variable for address line 2
					state, // Example variable for state
					country, // Example variable for country
				},
				username, // Example variable for username
				password, // Example variable for password
				role, // Example variable for role
				cart, // Example variable for cart items
			});

			if (response.status === 201) {
				alert("Registration successful! Please log in.");
				navigate("/login");
			}
		} catch (error) {
			console.error("Error during registration:", error);
			alert("Registration failed. Please try again.");
		}
	};

	return (
		<>
			<div className="nk-app-root">
				<div className="nk-main ">
					<div className="nk-wrap nk-wrap-nosidebar">
						<div className="nk-content ">
							<div className="nk-split nk-split-page nk-split-lg">
								<div className="nk-split-content nk-block-area nk-block-area-column nk-auth-container bg-white w-lg-45">
									<div className="absolute-top-right d-lg-none p-3 p-sm-5">
										<a
											href="#"
											className="toggle btn btn-white btn-icon btn-light"
											data-target="athPromo"
										>
											<em className="icon ni ni-info"></em>
										</a>
									</div>
									<div className="nk-block nk-block-middle nk-auth-body">
										<div className="brand-logo pb-5">
											<a href="html/index.html" className="logo-link">
												<img
													className="logo-light logo-img logo-img-lg"
													src="./images/logo.png"
													srcSet="./images/logo2x.png 2x"
													alt="logo"
												/>
												<img
													className="logo-dark logo-img logo-img-lg"
													src="./images/logo-dark.png"
													srcSet="./images/logo-dark2x.png 2x"
													alt="logo-dark"
												/>
											</a>
										</div>
										<div className="nk-block-head">
											<div className="nk-block-head-content">
												<h5 className="nk-block-title">Register</h5>
												<div className="nk-block-des">
													<p>Create New Account in Mahaw Computer Parts Shop</p>
												</div>
											</div>
										</div>
										<form onSubmit={handleRegister}>
											<div className="form-group">
												<label className="form-label" htmlFor="email">
													Email or Username
												</label>
												<div className="form-control-wrap">
													<input
														type="text"
														className="form-control form-control-lg"
														id="email"
														placeholder="Enter your email address or username"
														value={username}
														onChange={(e) => setUsername(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<label className="form-label" htmlFor="password">
													Passcode
												</label>
												<div className="form-control-wrap">
													<a
														tabIndex="-1"
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
														id="password"
														placeholder="Enter your passcode"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
													/>
												</div>
											</div>
											<div className="form-group">
												<div className="custom-control custom-control-xs custom-checkbox">
													<input
														type="checkbox"
														className="custom-control-input"
														id="checkbox"
														checked={agree}
														onChange={(e) => setAgree(e.target.checked)}
													/>
													<label
														className="custom-control-label"
														htmlFor="checkbox"
													>
														I agree to Mahaw Computer Parts Shop{" "}
														<a tabIndex="-1" href="#">
															Privacy Policy
														</a>{" "}
														&amp;{" "}
														<a tabIndex="-1" href="#">
															{" "}
															Terms.
														</a>
													</label>
												</div>
											</div>
											<div className="form-group">
												<button
													className="btn btn-lg btn-primary btn-block"
													type="submit"
													disabled={!agree}
												>
													Register
												</button>
											</div>
										</form>
										<div className="form-note-s2 pt-4">
											{" "}
											Already have an account ?{" "}
											<a href="/login">
												<strong>Sign in instead</strong>
											</a>
										</div>
										<div className="text-center pt-4 pb-3">
											<h6 className="overline-title overline-title-sap">
												<span>OR</span>
											</h6>
										</div>
										<ul className="nav justify-center gx-8">
											<li className="nav-item">
												<a className="nav-link" href="#">
													Facebook
												</a>
											</li>
											<li className="nav-item">
												<a className="nav-link" href="#">
													Google
												</a>
											</li>
										</ul>
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
											<p>&copy; 2022 Mahaw Computer Parts Shop. All Rights Reserved.</p>
										</div>
									</div>
								</div>
								<div
									className="nk-split-content nk-split-stretch bg-lighter d-flex toggle-break-lg toggle-slide toggle-slide-right"
									data-toggle-body="true"
									data-content="athPromo"
									data-toggle-screen="lg"
									data-toggle-overlay="true"
								>
									<div className="slider-wrap w-100 w-max-550px p-3 p-sm-5 m-auto">
										<div
											className="slider-init"
											data-slick='{"dots":true, "arrows":false}'
										>
											<div className="slider-item">
												<div className="nk-feature nk-feature-center">
													<div className="nk-feature-img">
														<img
															className="round"
															src="/public/images/case/1.jpg"
															srcSet="./images/slides/promo-a2x.png 2x"
															alt=""
														/>
													</div>
													<div className="nk-feature-content py-4 p-sm-5">
														<h4>Case</h4>
														<p>
															You can start to create your products easily with
															its user-friendly design & most completed
															responsive layout.
														</p>
													</div>
												</div>
											</div>
											<div className="slider-item">
												<div className="nk-feature nk-feature-center">
													<div className="nk-feature-img">
														<img
															className="round"
															src="/public/images/monitor/3.jpg"
															srcSet="./images/slides/promo-b2x.png 2x"
															alt=""
														/>
													</div>
													<div className="nk-feature-content py-4 p-sm-5">
														<h4>Monitor</h4>
														<p>
															You can start to create your products easily with
															its user-friendly design & most completed
															responsive layout.
														</p>
													</div>
												</div>
											</div>
											<div className="slider-item">
												<div className="nk-feature nk-feature-center">
													<div className="nk-feature-img">
														<img
															className="round"
															src="/public/images/ethernet-cable/4.jpg"
															srcSet="./images/slides/promo-c2x.png 2x"
															alt=""
														/>
													</div>
													<div className="nk-feature-content py-4 p-sm-5">
														<h4>UTP-Cable</h4>
														<p>
															You can start to create your products easily with
															its user-friendly design & most completed
															responsive layout.
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="slider-dots"></div>
										<div className="slider-arrows"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterUser;
