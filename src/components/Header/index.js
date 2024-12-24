import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoMdExit} from 'react-icons/io'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <ul className="sm-nav-ul w-100 ">
        <li>
          <Link className="sm-nav-li" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="sm-logo "
            />
          </Link>
        </li>

        <div className="d-flex align-items-center sm-icons">
          <li>
            <Link className="sm-nav-li" to="/">
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link className="sm-nav-li" to="/jobs">
              <BsBriefcaseFill />
            </Link>
          </li>

          <Link className="sm-nav-li" to="/login">
            <IoMdExit />
          </Link>
        </div>
      </ul>

      <ul className="nav-ul w-100 align-items-center">
        <li>
          <Link className="nav-li" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <div className="d-flex align-items-center">
          <li>
            <Link className="nav-li" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="nav-li" to="/jobs">
              Jobs
            </Link>
          </li>
        </div>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
