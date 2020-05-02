import React from 'react';
import {connect} from 'react-redux'; // step 1

const UserLogin = ({ isLoggedIn, user}) => { // step 4 pass props into cmponent
  return (
    <div>
      <h2>Successfully Login</h2>
      {isLoggedIn && (
        <div>
          {`Welcome ${user} !`}
        </div>
      )}
    </div>
  );
};
// step 2 create mapping function
const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user,
});
// step 3 connect mapping function to component

export default connect(mapStateToProps)(UserLogin);
