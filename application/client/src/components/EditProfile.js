import React, { Component } from 'react'
import { connect } from 'react-redux'

export const EditProfile = () => {

    const edit = () => {
        console.log("Edit on Edit Profile Triggered");
    }

    const clearFields = () => {
        dispatch(setPassword(''));
        dispatch(setFirstName(''));
        dispatch(setLastName(''));

        document.getElementById('edit-form').value = '';
    }

    return (
        <div class="container-fluid bg-light py-3">
        <div class="row">
            <div class="col-md-6 mx-auto">
                <div class="card card-body">
                    <h3 class="text-center mb-4">Edit Profile</h3>
                    <fieldset id="edit-form">
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="Username" 
                            name="username" 
                            type="text" 
                            value={username}
                            disabled>
                            </input>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="Password" 
                            name="password" 
                            type="password"
                            value={password}
                            onChange={e => dispatch(setPassword(e.target.value))}>
                            </input>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="Confirm Password" 
                            name="password" type="password"
                            onChange={e => verify(e.target.value)}>
                            </input>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="SFSU e-mail address" 
                            name="email" 
                            type="text"
                            value={email}
                            disabled>
                            </input>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="First Name" 
                            name="firstname" 
                            type="text"
                            value={firstname}
                            onChange={e => dispatch(setFirstName(e.target.value))}>
                            </input>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" 
                            placeholder="Last Name" 
                            name="lasttname" 
                            type="text"
                            value={lastname}
                            onChange={e => dispatch(setLastName(e.target.value))}>
                            </input>
                        </div>

                        <div class="row">
                            <div>                     
                                <ButtonContainer onClick={() => clearFields()}>Cancel</ButtonContainer>
                                <ButtonContainer id="signup" onClick={edit}>Submit</ButtonContainer>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>

    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
