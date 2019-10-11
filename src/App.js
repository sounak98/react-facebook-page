import React, { Component } from "react";
import "./App.css";

import FacebookLoginButton from "./components/FacebookLogin";

class App extends Component {
  state = {
    username: null
  };

  // componentDidMount() {
  //   window.FB.getLoginStatus(response => {
  //     console.log(response);
  //   })
  // }

  onFacebookLogin = (loginStatus, resultObject) => {
    console.log(loginStatus, resultObject);
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name
      });
    } else {
      alert("Login err");
    }
  };

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <div className="App-intro">
          {!username && (
            <div>
              <p>Click on one of any button below to login</p>
              <FacebookLoginButton onLogin={this.onFacebookLogin}>
                <button>Facebook</button>
              </FacebookLoginButton>
            </div>
          )}
          {username && <p>Welcome back, {username}</p>}
        </div>
      </div>
    );
  }
}

export default App;
