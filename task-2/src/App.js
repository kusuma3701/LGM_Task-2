import React from "react";
import Detail from "./Card";
import "./style.css";
import { trackPromise } from "react-promise-tracker";

class App extends React.Component {
  constructor() {
    super();
    this.state = { content: "" };
  }

  loadData = (url) => {
    trackPromise(
      fetch(url)
        .then(function (response) {
          if (response.ok) {
            return response.text();
          }
          throw new Error("Error message.");
        })
        .then(
          function (userData) {
            userData = JSON.parse(userData);
            
            this.setState({ content: userData });
          }
          .bind(this)
        )
        .catch(function (err) {
          console.log("ERR: Failed to Load ", url, err.message);
        })
    );
  };
  render() {
    let a = "";
    if (this.state.content) {
      a = <Detail data={this.state.content.data} />;
    }
    return (
      
      <div className="wholeContainer">
        <div className="buttonContainer">
          
          <p className='title'>&nbsp;<b>USERS</b></p>
            <button
              onClick={this.loadData.bind(
                this,
                "https://reqres.in/api/users?page=1"
              )}
            >
             <b> Get Users</b>
            </button>
          
        </div>
        {a}
        <div className='col-6  col-sm-8 instruction'>
               <h2><b>Click on "Get Users" button to view User Details</b></h2>
              </div>
      </div>
    
    );
  }
}

export default App;