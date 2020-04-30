import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../imgs/gator.png';
import Cookies from 'js-cookie';
import '../styles/Dashboard.css';
import { ButtonContainer } from './Button';

const uploadNewPost = () => {
    return (
        <Link to='/upload'></Link>
    )
}

export default class Dashboard extends Component {
    render() {
        return (
            <div class="container user-profile">
                <form method="post">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src={logo} alt="" />
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                <h5>
                                    FirstName LastName
                                    </h5>
                                <h6>
                                    Status: Student, Faculty, Admin
                                    </h6>
                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Posts</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-info">
                                <p>Gator information here</p>
                                <p>username: Username goes here</p>
                                <p>Full Name: First and Last name go here</p>
                                <p>Email: Email goes here</p>
                                <p>Password: password goes here...psyche</p>
                                <ButtonContainer>Edit Profile</ButtonContainer>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                </div>
                                <p>Users post information will go here.</p>
                                <p>Wow. Such empty.</p>
                                <ButtonContainer onClick={uploadNewPost}>
                                        <i class="fas fa-plus text-blue"></i>
                                </ButtonContainer>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
