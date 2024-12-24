import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isErrorOccured: false,
    errMessage: '',
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  userNameInput = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={this.changeUsername}
        />
      </>
    )
  }

  passwordInput = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.changePassword}
        />
      </>
    )
  }

  loginSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFail(data.error_msg)
    }
  }

  onLoginSuccess = jwt => {
    const {history} = this.props

    Cookies.set('jwt_token', jwt, {expires: 30, path: '/'})
    history.replace('/')
  }

  onLoginFail = err => {
    this.setState({isErrorOccured: true, errMessage: err})
  }

  render() {
    const {isErrorOccured, errMessage} = this.state
    const jwt = Cookies.get('jwt_token')

    if (jwt !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <form className="login-form" onSubmit={this.loginSubmit}>
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-cont">{this.userNameInput()}</div>
          <div className="input-cont">{this.passwordInput()}</div>
          <div className="login-btn-cont">
            <button className="login-btn" type="submit">
              Login
            </button>
            {isErrorOccured && <p className="errMessage">*{errMessage}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
