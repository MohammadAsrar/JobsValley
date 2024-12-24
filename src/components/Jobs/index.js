import {Component} from 'react'

import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import FilterGroups from '../FilterGroups'
import JobsCard from '../JobsCard'
import FailurePage from '../FailurePage'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    currentTypeEmp: '',
    currentRange: '',
    searchType: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {currentTypeEmp, currentRange, searchType} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${currentTypeEmp}&minimum_package=${currentRange}&search=${searchType}`
    const jwt = Cookie.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const resData = await response.json()
        const {jobs} = resData
        const jobsList = jobs.map(jb => ({
          companyLogoUrl: jb.company_logo_url,
          employmentType: jb.employment_type,
          id: jb.id,
          jobDescription: jb.job_description,
          location: jb.location,
          packagePerAnnum: jb.package_per_annum,
          rating: jb.rating,
          title: jb.title,
        }))
        this.setState({jobsList, apiStatus: apiStatusConstants.success})
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  applyEmpType = checkList => {
    const checkStr = checkList.join(',')
    this.setState({currentTypeEmp: checkStr}, this.getJobsDetails)
  }

  applySalaryRange = id => {
    this.setState({currentRange: id}, this.getJobsDetails)
  }

  userSearchInput = event => {
    this.setState({searchType: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  renderSuccessJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container d-flex flex-column align-items-center">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h1 id="heading-no-jobs" className="no-jobs-heading m-3">
            No Jobs Found
          </h1>
          <p id="para-no-jobs" className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    // Render jobs list if not empty
    return (
      <ul className="jobs-list p-0">
        {jobsList.map(job => (
          <JobsCard key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  selectTheStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobsList()
      case apiStatusConstants.failure:
        return <FailurePage retryClicked={this.getJobsDetails} />
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-frame">
        <Header />

        <div className="w-100 jobs-inner-cont">
          <FilterGroups
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            applyEmpType={this.applyEmpType}
            applySalaryRange={this.applySalaryRange}
          />

          <div className="w-75 jobs-part">
            <div className="search-cont">
              <input
                type="search"
                placeholder="Search"
                onChange={this.userSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={() => this.getJobsDetails()}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <div className="job-item-cont">{this.selectTheStatus()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
