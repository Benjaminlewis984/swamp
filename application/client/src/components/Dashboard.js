import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Dashboard.css';
import { ButtonContainer } from './Button';
import { connect } from 'react-redux';
import axios from "axios";
import ReactGA from 'react-ga';



const getInfo = (action) => {
	axios.defaults.withCredentials = true;
	axios.get(`/info`).then((res) => {
		if (res.data.success == "true") {
			action(res.data.user);
		}
	});
};
function refreshPage() {
    window.location.reload(false);
  };

const deletePost = (m_id) => {
	axios.defaults.withCredentials = true;
	console.log(m_id);

	var body = {
		"m_id": m_id,
	}
	axios.delete("/listings", {"data": body})
	.then(res => {
		console.log(res);
		if(res.data.success ==="true") {
			console.log("Post successfully deleted");
			refreshPage();
		}
	}).catch(err => {
		console.log("Post not deleted");
	})

}

const Dashboard = () => {

	ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
	ReactGA.pageview(window.location.pathname + window.location.search);

	const [userInfo, setUserInfo] = useState(false);
	const [userListings, setUserListings] = useState(false);
	const [userRequests, setUserRequests] = useState(false);
	const [listingsType, setListingsType] = useState("posts");

	const history = useHistory();

	const getListings = (username, listingsAction, requestsAction) => {
		axios.defaults.withCredentials = true;
		axios.post(`/listings`, {
			username: username
		}).then((res) => {
			if (res.data.success == "true") {
				listingsAction(res.data.results);
				console.log(res.data.results);
			}
		});

		axios.post('/messagebox')
		.then((res) => {
			if (res.data.success == "true") {
				requestsAction(res.data.results);
				console.log(res.data.results);
			}
		});

	}

	const upload = () => {
		history.push("upload");
	}

	const editProfile = () => {
		history.push("editProfile")
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

	var postElements = (
		<>
			<div className="add-post rounded" id="rcorners" onClick={upload}>
				<i className="fas fa-plus fa-2x text-blue "></i>
			</div>
			<label>Current Posts</label>
			<div class="container">
				<div class="row d-flex align-items-stretch" margin="10rem">
					{
						userListings && userListings.map((listing) => {
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
						})
					}
				</div>
			</div>
			</>
	)

	var requestElements = (
		<>
		<label>Current Requests</label>
		<div class="container">
				<div class="row d-flex align-items-stretch" margin="10rem">
					{
						<table class="table table-striped table-hover">
						<thead class="thead-dark">
						  <tr>
							<th scope="col">From</th>
							<th scope="col">Message</th>
							<th scope="col">Option</th>
						  </tr>
						</thead>
						<tbody>
							{ userRequests && userRequests.map((requests) => {
								return (
						  <tr>
							<td>{requests.sender}</td>
							<td>{requests.message}</td>
							<td><button>Accept</button><button>Reject</button></td>
						  </tr>
								)
							})
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
							<h6>Marketplace for Gators. By Gators.</h6>
							<ul class="nav nav-tabs" id="myTab" role="tablist">
								<li class="nav-item">
									<a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" onClick={showPosts}>Posts</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" onClick={showRequests}>Requests</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-4">
						<div class="profile-info">
							<h5>username: {userInfo.username} </h5>
							<h5>Full Name: {userInfo.first_name} {userInfo.last_name}</h5>
							<h5>Email: {userInfo.email} </h5>
							<div class="">
								<a href="#" class="btn btn-danger text-white text-center mx-auto">
									<i className="fas fa-edit fa-2x"></i>
									Edit
								</a>
							</div>
						</div>
					</div>
					<div class="col-md-8">
						<div class="tab-content profile-tab" id="myTabContent">
							{listingsType == "posts" && postElements}
							{listingsType == "requests" && requestElements}
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