import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Dashboard.css';
import { ButtonContainer } from './Button';
import { connect } from 'react-redux';
import axios from "axios";
import ReactGA from 'react-ga';
import styled from "styled-components";

const getInfo = (action) => {
	axios.defaults.withCredentials = true;
	axios.get(`http://18.191.184.143:3001/info`).then((res) => {
		if (res.data.success == "true") {
			action(res.data.user);
		}
	});
};

const deletePost = (m_id) => {
	axios.defaults.withCredentials = true;
	console.log(m_id);

	var body = {
		"m_id": m_id,
	}
	axios.delete("http://18.191.184.143:3001/listings", { "data": body })
		.then(res => {
			console.log(res);
			if (res.data.success === "true") {
				// console.log("Post successfully deleted");
				window.location.reload(false);
			}
		}).catch(err => {
			// console.log("Post not deleted");
		})

}

const Dashboard = () => {

	ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
	ReactGA.pageview(window.location.pathname + window.location.search);

	const [userInfo, setUserInfo] = useState(false);
	const [userListings, setUserListings] = useState(false);
	const [userRequests, setUserRequests] = useState(false);
	const [userPurchases, setUserPurchases] = useState(false);
	const [listingsType, setListingsType] = useState("posts");

	const history = useHistory();

	const getListings = (username, listingsAction, requestsAction) => {
		axios.defaults.withCredentials = true;
		axios.post(`http://18.191.184.143:3001/listings`, {
			username: username
		}).then((res) => {
			if (res.data.success == "true") {
				listingsAction(res.data.results);
				// console.log(res.data.results);
			}
		});

		axios.post('http://18.191.184.143:3001/messagebox')
			.then((res) => {
				if (res.data.success == "true") {
					requestsAction(res.data.results);
					// console.log(res.data.results[0]);
				}
			});

	}

	const upload = () => {
		history.push("upload");
	}

	const acceptRequest = (messageID) => {
		const axios = require('axios');
		console.log(messageID);
		axios.defaults.withCredentials = true;

		axios.post("http://18.191.184.143:3001/approve_request", { "message_id": messageID })
			.then(res => {
				// console.log("approved");
				window.location.reload();
			}).catch(err => {
				console.log("did not send");
			})
	}

	const rejectRequest = (messageID) => {
		const axios = require('axios');
		axios.defaults.withCredentials = true;

		axios.post("http://18.191.184.143:3001/reject_request", { "message_id": messageID })
			.then(res => {
				// console.log("rejected === success");
				history.push("/dashboard");
			}).catch(err => {
				console.log(err);
			})

	}

	const getPurchases = () => {
		const axios = require('axios');
		axios.defaults.withCredentials = true;
		console.log("calling purchases");
		axios.post("http://18.191.184.143:3001/purchases")
			.then(res => {
				setUserPurchases(res.data.results);
				console.log(res.data.results);
			})
	}

	const downloadAccepted = (path) => {
		console.log(path);
			const formData = new FormData();
			formData.append('path', path);
			fetch("http://18.191.184.143:3001/download", {
				method: 'POST',
				body: formData,
				credentials: "include"
			})
			.then(response => response.blob())
			.then(blob => {
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = path.substr(4);
				document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
				a.click();    
				a.remove();  //afterwards we remove the element again         
			}).catch(err => console.log(err))
		}

	if (userInfo == false) {
		getInfo((info) => {
			setUserInfo(info);
			getListings(info.username, (listings) => {
				setUserListings(listings);
			}, (requests) => {
				setUserRequests(requests);
			});
		});
	}

	const showPosts = () => {
		setListingsType("posts");
	}

	const showRequests = () => {
		setListingsType("requests");
	}

	const showPurchases = () => {
		setListingsType("purchases");
		getPurchases();
	}

	var postElements = (
		<>
			<div className="add-post rounded" id="rcorners" onClick={upload}>
				<i className="fas fa-plus fa-2x text-blue "></i>
			</div>
			<div class="container">
				<div class="row d-flex align-items-stretch" margin="10rem">
					{
						userListings.length > 0 ? userListings.map((listing) => {
							return (

								<div class="card col-4 " >
									<img src={"http://18.191.184.143:3001/" + listing.preview_path} class="img-thumbnail card-img-top" />

									<div class="card-body">
										<h5>Title: {listing.title}
										</h5>
										<h5>Price: ${listing.price}</h5>
										<h5>m_id: {listing.m_id}</h5>

									</div>
									<div class="card-footer text-center" id={listing.m_id}>
										<div class="btn btn-danger" onClick={() => deletePost(listing.m_id)}>Delete</div>
									</div>
								</div>

							)
						}) : false
					}
				</div>
			</div>
		</>
	)

	var requestElements = (
		<>
			<div class="container">
				<div class="row d-flex align-items-stretch" margin="10rem">
					{
						<table class="table table-striped table-hover">
							<thead class="thead-dark">
								<tr>
									<th scope="col">From</th>
									<th scope="col">Message</th>
									<th scope="col">Response</th>
								</tr>
							</thead>
							<tbody>
								{userRequests.length > 0 && userRequests != "Your message box is empty" ? userRequests.map((requests) => {
									return (
										<tr>
											<td>{requests.sender}</td>
											<td>{requests.message}</td>
											<td>
												<AcceptButton onChange={() => acceptRequest(requests.message_id)}>
													<i class="fas fa-check"></i>
												</AcceptButton>
												<RejectButton onClick={() => rejectRequest(requests.message_id)}>
													<i class="fas fa-times"></i>
												</RejectButton>
											</td>
										</tr>
									)
								}) : false
								}

							</tbody>
						</table>


					}
				</div>
			</div>
		</>
	)

	var purchaseElements = (
		<>
			<div class="container">
				<div class="row d-flex align-items-stretch" margin="10rem">
					{
						<table class="table table-striped table-hover">
							<thead class="thead-dark">
								<tr>
									{/* <th scope="col">Preview</th> */}
									<th scope="col">Item</th>
									<th scope="col">From</th>
									<th scope="col">Download</th>
								</tr>
							</thead>
							<tbody>
								{userPurchases.length > 0 && userPurchases != "Your request box is empty" ? userPurchases.map((purchases) => {
									return (
										<tr>
											{/* <td><img src={purchases.preview_path}></img></td> */}
											<td>{purchases.title}</td>
											<td>{purchases.author_username}</td>
											<td>{purchases.message}</td>
											<td>
												<AcceptButton onClick={() => downloadAccepted(purchases.raw_path)}>
													<i class="fas fa-download"></i>
												</AcceptButton>

											</td>
										</tr>
									)
								}) : false
								}

							</tbody>
						</table>


					}
				</div>
			</div>
		</>
	)

	return (
		<div class="container user-profile mx-auto">
			<form method="post">
				<div class="row">
					<div class="col-md-4">
						<div class="profile-img">
							<img src={"/" + userInfo.profile_path} alt="" />
							<div class="file btn btn-lg btn-primary">
								Change Photo
								<input type="file" name="file" />
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="profile-head">
							<h5>
								{userInfo.first_name} {userInfo.last_name}
							</h5>
							<h6>Status: Student</h6>
							<br></br>
							<br></br>
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={showPosts}>Posts</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" onClick={showRequests}>Requests</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" onClick={showPurchases}>Purchases</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<div class="profile-info">
							<h5>Username: {userInfo.username} </h5>
							<h5>Full Name: {userInfo.first_name} {userInfo.last_name}</h5>
							<h5>Email: {userInfo.email} </h5>
						</div>
					</div>
					<div class="col-md-8">
						<div class="tab-content profile-tab" id="myTabContent">
							{listingsType == "posts" && postElements}
							{listingsType == "requests" && requestElements}
							{listingsType == "purchases" && purchaseElements}
						</div>
					</div>
				</div>
			</form>
		</div>
	)

}

const mapStateToProps = state => {
	// this map react props to redux state
	return {
		username: state.loginReducer.username,
		password: state.loginReducer.password,
		email: state.loginReducer.email,
		firstname: state.loginReducer.firstname,
		lastname: state.loginReducer.lastname,
		acc_id: state.loginReducer.acc_id,
		isLoggedIn: state.loginReducer.isLoggedIn,
		loginLoadingState: state.loginReducer.loginLoadingState,
		authenticated: state.loginReducer.authenticated,
	};
};

export default connect(mapStateToProps)(Dashboard);

const AcceptButton = styled.nav`
display: block;
width: 2.1rem;
background: transparent;
border: 0.05rem solid var(--lightBlue);
border-color: var(--mainBlue);
color: var(--mainPurple);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition: all 0.5s ease-in-out;

&: hover {
    background: var(--acceptButton);
    color: var(--mainWhite);
    border-color: var(--mainWhite);
}

&: focus {
    outline: none;
}`


const RejectButton = styled.nav`
display: block;

width: 2.1rem;
background: transparent;
border: 0.05rem solid var(--lightBlue);
border-color: var(--mainBlue);
color: var(--mainPurple);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition: all 0.5s ease-in-out;

&: hover {
    background: var(--rejectButton);
    color: var(--mainWhite);
    border-color: var(--mainWhite);
}

&: focus {
    outline: none;
}`