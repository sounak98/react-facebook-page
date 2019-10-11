import React, { Component } from "react";
import "./App.css";

import graph from "fbgraph";
import FacebookLogin from "react-facebook-login";

class App extends Component {
  state = {
    name: null,
    accessToken: null,
    comments: null
  };

  onFacebookLogin = response => {
    if (!response.error) {
      const { name, accessToken } = response;
      this.setState({ name, accessToken });
    } else {
      console.error(response.error);
    }
  };

  fetchComments = id => {
    graph.get(`${id}/posts/?fields=comments,message`, (err, response) => {
      if (!err) {
        this.setState({ comments: response.data }, () => {
          console.log(this.state.comments);
        });
      } else {
        console.error(err);
      }
    });
  };

  fetchPosts = () => {
    graph.setAccessToken(this.state.accessToken);
    graph.get("me/accounts", (err, response) => {
      if (!err) {
        const { name, id } = response.data[0];
        console.log(name, id);
        this.fetchComments(id);
      } else {
        console.error(err);
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.accessToken ? (
          <div>
            <p>Name: {this.state.name}</p>
            <p>Access Token: {this.state.accessToken}</p>
            <button onClick={this.fetchPosts}>Fetch Posts</button>
            {this.state.comments && (
              <ul>
                {this.state.comments.map((post, idx) => (
                  <li key={idx}>
                    {post.message}
                    <ol>
                      {post.comments.data.map((comment, idx) => (
                        <li key={idx}>{comment.message}</li>
                      ))}
                    </ol>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <FacebookLogin
            appId="389126295360521"
            autoLoad={true}
            fields="name"
            scope="manage_pages"
            callback={this.onFacebookLogin}
          />
        )}
      </div>
    );
  }
}

export default App;
