import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroups extends Component {
  state = {
    currentProfile: {},
    apiStatus: apiStatusConstants.initial,
    checkedList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwt = Cookie.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const resData = await response.json()
      const profileDetails = resData.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        currentProfile: updatedProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {currentProfile} = this.state
    const {name, profileImageUrl, shortBio} = currentProfile

    return (
      <div className="profile-cont">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <button
      data-testid="button"
      type="button"
      className="button-retry"
      onClick={this.getProfileDetails}
    >
      Retry
    </button>
  )

  selectTheStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onTypeEmpChange = event => {
    const {id} = event.target
    let {checkedList} = this.state
    const {applyEmpType} = this.props

    if (checkedList.includes(id)) {
      checkedList = checkedList.filter(checkId => checkId !== id)
    } else {
      checkedList.push(id)
    }

    this.setState({checkedList})

    applyEmpType(checkedList)
  }

  handleSalaryChange = event => {
    const {id} = event.target
    const {applySalaryRange} = this.props

    applySalaryRange(id)
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {checkedList} = this.state

    return (
      <div className="group-main-cont">
        <div className="group-inner-cont">{this.selectTheStatus()}</div>
        <hr className="hr" />

        <h1 className="p-0 fw-2 fs-5 text-white">Type of Employment</h1>
        <ul className="p-0 text-white">
          {employmentTypesList.map(emp => (
            <li key={emp.employmentTypeId} className="emp-li mb-2">
              <input
                id={emp.employmentTypeId}
                type="checkbox"
                onChange={this.onTypeEmpChange}
                checked={checkedList.includes(emp.employmentTypeId)}
              />
              <label htmlFor={emp.employmentTypeId}>{emp.label}</label>
            </li>
          ))}
        </ul>

        <hr className="hr" />

        <h1 className="p-0 fw-2 fs-5 text-white">Salary Range</h1>
        <ul className="p-0 text-white">
          {salaryRangesList.map(sal => (
            <li key={sal.salaryRangeId} className="emp-li">
              <label className="mb-2" htmlFor={sal.salaryRangeId}>
                <input
                  id={sal.salaryRangeId}
                  type="radio"
                  name="salary"
                  value={sal.label}
                  className="inp-radio"
                  onChange={this.handleSalaryChange}
                />
                {sal.label}
              </label>
              <br />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FilterGroups
