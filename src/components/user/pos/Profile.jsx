import { useEffect, useState } from "react";

import Swal from "sweetalert2";

const Profile = () => {
	const [isTrue, setIsTrue] = useState(false);

	const [fullName, setFullName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [nationality, setNationality] = useState("");

	const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");

	const [info, setInfo] = useState([]);

    useEffect(() => {
        const userString = JSON.stringify(info);
        localStorage.setItem("info", userString);
    }, [info]);
    

	useEffect(() => {
		const fetchInfo = async () => {
			const username = localStorage.getItem("username");

			if (username) {
				try {
					const response = await fetch(
						`http://localhost:3000/users?username=${username}`
					);
					const data = await response.json();

					setInfo(data);

					if (data.length > 0) {
						const userInfo = data[0];

						setFullName(userInfo.fullName || "");
						setDisplayName(userInfo.displayName || "");
						setEmail(userInfo.email || "");
						setPhoneNumber(userInfo.phoneNumber || "");
						setDateOfBirth(userInfo.dateOfBirth || "");
						setNationality(userInfo.nationality || "");
                        setAddressLine1(userInfo.address.addressLine1 || "");
                        setAddressLine2(userInfo.address.addressLine2 || "");
						setState(userInfo.address.state || "");
						setCountry(userInfo.address.country || "");
					}
				} catch (error) {
					console.error("Error fetching user info:", error);
				}
			} else {
				console.error("No username found in localStorage");
			}
		};

		fetchInfo();
	}, []);

	// Handle profile update
	const handleProfileUpdate = async () => {
    
        try {
            const username = localStorage.getItem("username");
    
            if (!username) {
                throw new Error("No username found in localStorage.");
            }
    
            const updatedProfile = {
                fullName,
                displayName,
                email,
                phoneNumber,
                dateOfBirth,
                nationality,
            };
    
            const userId = info[0]?.id;
    
            if (!userId) {
                throw new Error("User ID not found.");
            }
    
            const response = await fetch(
                `http://localhost:3000/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProfile),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }
    
            const responseData = await response.json();
            console.log("Profile Update Response Data:", responseData);
            
            window.location.href = "/profile";

            Swal.fire({
                icon: "success",
                title: "Profile updated successfully!",
                text: "Your profile information has been updated.",
                confirmButtonText: "OK",
            });
    
            const closeButton = document.querySelector("#profile-edit .close");
            if (closeButton) {
                closeButton.click();
            } else {
                console.error("Close button not found");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
    
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "There was an error updating your profile. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };
    
    const handleAddressUpdate = async () => {
       
    
        try {
            const username = localStorage.getItem("username");
    
            if (!username) {
                throw new Error("No username found in localStorage.");
            }
    
            const updatedAddress = {
                address: {
                    addressLine1,
                    addressLine2,
                    state,
                    country,
                },
            };
    
            const userId = info[0]?.id;
    
            if (!userId) {
                throw new Error("User ID not found.");
            }
    
            const response = await fetch(
                `http://localhost:3000/users/${userId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedAddress),
                }
            );
    
            if (!response.ok) {
                throw new Error("Failed to update address");
            }
    
            const responseData = await response.json();
            console.log("Address Update Response Data:", responseData);
            
            window.location.href = "/profile";

            Swal.fire({
                icon: "success",
                title: "Address updated successfully!",
                text: "Your address information has been updated.",
                confirmButtonText: "OK",
            });
    
            const closeButton = document.querySelector("#address-edit .close");
            if (closeButton) {
                closeButton.click();
            } else {
                console.error("Close button not found");
            }
        } catch (error) {
            console.error("Error updating address:", error);
    
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "There was an error updating your address. Please try again.",
                confirmButtonText: "OK",
            });
        }
    };    

	const handlePernonalInfoClick = () => {
		setIsTrue(true);
	};

	const handleSecurityClick = () => {
		setIsTrue(false);
	};

	return (
		<>
			<div className="nk-content ">
				<div className="container-fluid">
					<div className="nk-content-inner">
						<div className="nk-content-body">
							<div className="nk-block">
								<div className="card">
									<div className="card-aside-wrap">
										{isTrue ? (
											<div className="card-inner card-inner-lg">
												<div className="nk-block-head">
													<div className="nk-block-between d-flex justify-content-between">
														<div className="nk-block-head-content">
															<h4 className="nk-block-title">
																Personal Information
															</h4>
															<div className="nk-block-des">
																<p>
																	Basic info, like your name and address, that
																	you use on Nio Platform.
																</p>
															</div>
														</div>
														<div className="d-flex align-center">
															<div className="nk-tab-actions me-n1">
																<a
																	className="btn btn-icon btn-trigger"
																	data-bs-toggle="modal"
																	href="#profile-edit"
																>
																	<em className="icon ni ni-edit"></em>
																</a>
															</div>
															<div className="nk-block-head-content align-self-start d-lg-none">
																<a
																	href="#"
																	className="toggle btn btn-icon btn-trigger"
																	data-target="userAside"
																>
																	<em className="icon ni ni-menu-alt-r"></em>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div className="nk-block">
													<div className="nk-data data-list">
														<div className="data-head">
															<h6 className="overline-title">Basics</h6>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">Full Name</span>
																<span className="data-value">
																	{info[0]?.fullName}
																</span>
															</div>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">Display Name</span>
																<span className="data-value">{info[0]?.displayName}</span>
															</div>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">Email</span>
																<span className="data-value">
																	{info[0]?.email}
																</span>
															</div>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">Phone Number</span>
																<span className="data-value text-soft">
																	{info[0]?.phoneNumber}
																</span>
															</div>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">
																	Date of Birth
																</span>
																<span className="data-value">{info[0]?.dateOfBirth}</span>
															</div>
														</div>
														<div className="data-item">
															<div className="data-col">
																<span className="data-label">Nationality</span>
																<span className="data-value">{info[0]?.nationality}</span>
															</div>
														</div>
														<div
															className="data-item"
															data-tab-target="#address"
														>
															<div className="data-col">
																<span className="data-label">Address</span>
																<span className="data-value">
																	{info[0]?.address.addressLine1}
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										) : (
											<div className="nk-block">
												<div className="card border border-light">
													<div className="card-inner-group">
														<div className="card-inner">
															<div className="between-center flex-wrap flex-md-nowrap g-3">
																<div className="nk-block-text">
																	<h6>Save my Activity Logs</h6>
																	<p>
																		You can save your all activity logs
																		including unusual activity detected.
																	</p>
																</div>
																<div className="nk-block-actions">
																	<ul className="align-center gx-3">
																		<li className="order-md-last">
																			<div className="custom-control custom-switch me-n2">
																				<input
																					type="checkbox"
																					className="custom-control-input"
																					checked=""
																					id="activity-log"
																				/>
																				<label
																					className="custom-control-label"
																					htmlFor="activity-log"
																				></label>
																			</div>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
														<div className="card-inner">
															<div className="between-center flex-wrap g-3">
																<div className="nk-block-text">
																	<h6>Change Password</h6>
																	<p>
																		Set a unique password to protect your
																		account.
																	</p>
																</div>
																<div className="nk-block-actions flex-shrink-sm-0">
																	<ul className="align-center flex-wrap flex-sm-nowrap gx-3 gy-2">
																		<li className="order-md-last">
																			<a href="#" className="btn btn-primary">
																				Change Password
																			</a>
																		</li>
                                                                        <input type="text" placeholder="Change Password..."
                                                                        />
																		<li>
																			<em className="text-soft text-date fs-12px">
																				Last changed: <span>Oct 2, 2019</span>
																			</em>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
														{/* <div className="card-inner">
															<div className="between-center flex-wrap flex-md-nowrap g-3">
																<div className="nk-block-text">
																	<h6>
																		2 Factor Auth &nbsp;{" "}
																		<span className="badge bg-success ms-0">
																			Enabled
																		</span>
																	</h6>
																	<p>
																		Secure your account with 2FA security. When
																		it is activated you will need to enter not
																		only your password, but also a special code
																		using app. You can receive this code by in
																		mobile app.{" "}
																	</p>
																</div>
																<div className="nk-block-actions">
																	<a href="#" className="btn btn-primary">
																		Disable
																	</a>
																</div>
															</div>
														</div> */}
													</div>
												</div>
											</div>
										)}

										<div
											className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"
											data-content="userAside"
											data-toggle-screen="lg"
											data-toggle-overlay="true"
										>
											<div className="card-inner-group" data-simplebar>
												<div className="card-inner">
													<div className="user-card">
														<div className="user-avatar bg-primary">
															<span>{info[0]?.fullName[0]}</span>
														</div>
														<div className="user-info">
															<span className="lead-text">
																{info[0]?.fullName}
															</span>
															<span className="sub-text">{info[0]?.email}</span>
														</div>
														<div className="user-action">
															<div className="dropdown">
																<a
																	className="btn btn-icon btn-trigger me-n2"
																	data-bs-toggle="dropdown"
																	href="#"
																>
																	<em className="icon ni ni-more-v"></em>
																</a>
																<div className="dropdown-menu dropdown-menu-end">
																	<ul className="link-list-opt no-bdr">
																		<li>
																			<a href="#">
																				<em className="icon ni ni-camera-fill"></em>
																				<span>Change Photo</span>
																			</a>
																		</li>
																		<li>
																			<a href="#">
																				<em className="icon ni ni-edit-fill"></em>
																				<span>Update Profile</span>
																			</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="card-inner">
													<div className="user-account-info py-0">
														<h6 className="overline-title-alt">
															Account Balance
														</h6>
														<div className="user-balance">
															12.395769{" "}
															<small className="currency currency-btc">
																USD
															</small>
														</div>
														<div className="user-balance-sub">
															Pending{" "}
															<span>
																0.344939{" "}
																<span className="currency currency-btc">
																	USD
																</span>
															</span>
														</div>
													</div>
												</div>
												<div className="card-inner p-0">
													<ul className="link-list-menu">
														<li onClick={handlePernonalInfoClick}>
															<a className="active" href="#">
																<em className="icon ni ni-user-fill-c"></em>
																<span>Personal Infomation</span>
															</a>
														</li>
														<li onClick={handleSecurityClick}>
															<a href="#" className="active">
																<em className="icon ni ni-lock-alt-fill"></em>
																<span>Security Settings</span>
															</a>
														</li>
													</ul>
												</div>
												<div className="card-inner">
													<div className="user-account-info py-0">
														<h6 className="overline-title-alt">Last Login</h6>
														<p>06-29-2020 02:39pm</p>
														<h6 className="overline-title-alt">Login IP</h6>
														<p>192.129.243.28</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* profile modal */}
			<div className="modal fade" role="dialog" id="profile-edit">
				<div className="modal-dialog modal-lg" role="document">
					<div className="modal-content">
						<a href="#" className="close" data-bs-dismiss="modal">
							<em className="icon ni ni-cross-sm"></em>
						</a>
						<div className="modal-body modal-body-md">
							<h5 className="title">Update Profile</h5>
							<ul className="nk-nav nav nav-tabs">
								<li className="nav-item">
									<a
										className="nav-link active"
										data-bs-toggle="tab"
										href="#personal"
									>
										Personal
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" data-bs-toggle="tab" href="#address">
										Address
									</a>
								</li>
							</ul>
							<div className="tab-content">
								<form onSubmit={handleProfileUpdate}>
									<div className="tab-pane active" id="personal">
										<div className="row gy-4">
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="full-name">
														Full Name
													</label>
													<input
														type="text"
														className="form-control"
														id="full-name"
														placeholder="Enter full name"
														value={fullName}
														onChange={(e) => setFullName(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="display-name">
														Display Name
													</label>
													<input
														type="text"
														className="form-control"
														id="display-name"
														placeholder="Enter display name"
														value={displayName}
														onChange={(e) => setDisplayName(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="personal-email"
													>
														Email
													</label>
													<input
														type="email"
														className="form-control"
														id="personal-email"
														placeholder="Enter email"
														value={email}
														onChange={(e) => setEmail(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="phone-no">
														Phone Number
													</label>
													<input
														type="text"
														className="form-control"
														id="phone-no"
														placeholder="Enter phone number"
														value={phoneNumber}
														onChange={(e) => setPhoneNumber(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="birth-day">
														Date of Birth
													</label>
													<input
														type="date"
														className="form-control date-picker"
														id="birth-day"
														placeholder="02/24/2021"
														value={dateOfBirth}
														onChange={(e) => setDateOfBirth(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="nationality">
														Nationality
													</label>
													<input
														type="text"
														className="form-control date-picker"
														id="nationality"
														value={nationality}
														onChange={(e) => setNationality(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-12">
												<div className="custom-control custom-switch">
													<input
														type="checkbox"
														className="custom-control-input"
														id="latest-sale"
													/>
													<label
														className="custom-control-label"
														htmlFor="latest-sale"
													>
														Use full name to display{" "}
													</label>
												</div>
											</div>
											<div className="col-12">
												<ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
													<li>
														<button
															href="#"
															data-bs-dismiss="modal"
															className="btn btn-primary"
															type="submit"
														>
															Update Profile
														</button>
													</li>
													<li>
														<a
															href="#"
															data-bs-dismiss="modal"
															className="link link-light"
														>
															Cancel
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</form>
								<div className="tab-pane" id="address">
									<form onSubmit={handleAddressUpdate}>
										<div className="row gy-4">
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="address-l1">
														Address Line 1
													</label>
													<input
														type="text"
														className="form-control"
														id="address-l1"
														value={addressLine1}
														onChange={(e) => setAddressLine1(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="address-l2">
														Address Line 2
													</label>
													<input
														type="text"
														className="form-control"
														id="address-l2"
                                                        value={addressLine2}
                                                        onChange={(e) => setAddressLine2(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="address-st">
														State
													</label>
													<input
														type="text"
														className="form-control"
														id="address-st"
														value={state}
														onChange={(e) => setState(e.target.value)}
													/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label
														className="form-label"
														htmlFor="address-county"
													>
														Country
													</label>
													<select
														className="form-select js-select2"
														id="address-county"
														value={country}
														onChange={(e) => setCountry(e.target.value)}
													>
														<option>Canada</option>
														<option>United State</option>
														<option>United Kindom</option>
														<option>Australia</option>
														<option>India</option>
														<option>Bangladesh</option>
													</select>
												</div>
											</div>
											<div className="col-12">
												<ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
													<li>
														<button
															href="#"
															data-bs-dismiss="modal"
															className="btn btn-primary"
                                                            type="submit"
														>
															Update Address
														</button>
													</li>
													<li>
														<a
															href="#"
															data-bs-dismiss="modal"
															className="link link-light"
														>
															Cancel
														</a>
													</li>
												</ul>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Profile;
