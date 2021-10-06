import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import client from "../apollo-client";
import User from '../graphql/user'
import LibCookie from '../lib/LibCookie'
import LibConfig from '../lib/LibConfig'
//
export default class Login extends Component {
  constructor(props: any){
    super(props)
//console.log(key)
  }
  componentDidMount(){
//    console.log(LibConfig.getConfig().COOKIE_KEY_UID);
  }   
  handleClick(){
    this.login()
  } 
  /* Login */
  async login(){
    try {
      const key = LibConfig.getConfig().COOKIE_KEY_UID;
      const email = document.querySelector<HTMLInputElement>('#email');
      const password = document.querySelector<HTMLInputElement>('#password');
      const data = await client.query({
        query: User.get_query_valid(email.value, password.value),
        fetchPolicy: "network-only"
      });
console.log(data.data.userValid);
      if(data.data.userValid !== null){
        const uid = data.data.userValid.id;
console.log("uid=", uid);
        LibCookie.set_cookie(key, uid);
        alert("Success, login");
        location.href = '/';
      }else{
        alert("Error, login");
      }
    } catch (error) {
      console.error(error);
      alert("Error, save item")
    }    
  } 
  render() {
    return (
      <div className="container">
      <hr className="mt-2 mb-2" />
      <h1>Login</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>email:</label>
            <input type="text" className="form-control" name="email" id="email"
              />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>password:</label>
            <input type="password" className="form-control" name="password" id="password"
              />
          </div>
        </div>
      </div>          
      <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>
            Login
          </button>
      </div>                
      <hr />
      <Link to={`/user_create`} >
          <button>[ Register ]</button>
      </Link>       
    </div>      
    )    
  } 
}

