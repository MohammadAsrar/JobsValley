import {Component} from 'react'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import FailurePage from '../FailurePage'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemObj: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
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
      let jobDetails = resData.job_details
      let similarJobs = resData.similar_jobs

      const updateLife = lifeObj => ({
        description: lifeObj.description,
        imageUrl: lifeObj.image_url,
      })

      const updateSkills = skillList => ({
        imageUrl: skillList.image_url,
        name: skillList.name,
      })

      jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: updateLife(jobDetails.life_at_company),
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(sk => updateSkills(sk)),
        title: jobDetails.title,
      }

      similarJobs = similarJobs.map(smj => ({
        companyLogoUrl: smj.company_logo_url,
        employmentType: smj.employment_type,
        id: smj.id,
        jobDescription: smj.job_description,
        location: smj.location,
        rating: smj.rating,
        title: smj.title,
      }))
      this.setState({
        jobItemObj: {jobDetails, similarJobs},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailsOfJob = () => {
    const {jobItemObj} = this.state
    const {jobDetails, similarJobs} = jobItemObj
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="dtl-card text-white">
          <div className="logo-cont">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="d-flex flex-column justify-content-center">
              <h1 className="m-0 p-0">{title}</h1>
              <div className="d-flex align-items-center">
                <FaStar color="gold" className="rating" />
                <p className="m-0 bg-priary">{rating}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex align-items-center">
            <IoLocationSharp className="loc-type" />
            <p className="location-p">{location}</p>

            <BsFillBriefcaseFill className="loc-type" />
            <p className="m-0">{employmentType}</p>

            <p className="lpa">{packagePerAnnum}</p>
          </div>
          <hr className="job-hr" />

          <div className="d-flex mb-3 align-items-center justify-content-between">
            <h1 className="m-0 p-0 fw-4 fs-5">Description</h1>
            <a className="visit" href={companyWebsiteUrl}>
              Visit <FaExternalLinkAlt />
            </a>
          </div>
          <p className="mt-2 paras-title">{jobDescription}</p>

          <h1 className="m-0 p-0 fw-4 fs-5">Skills</h1>
          <ul className="p-0 d-flex justify-content-start align-items-center skills-ul flex-wrap">
            {skills.map(sk => (
              <li key={sk.name} className="d-flex justify-content-start ">
                <img src={sk.imageUrl} alt={sk.name} />
                <p className="m-0 align-self-center">{sk.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="m-0 p-0 fw-4 fs-5 mb-3">Life at Company</h1>
          <div className="life-comp">
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>

        <SimilarJobs similarJobsList={similarJobs} />
      </>
    )
  }

  renderFailureDetailsOfJob = () => (
    <FailurePage retryClicked={this.getJobItemDetails} />
  )

  renderLoadingView = () => (
    <div className="loader-container loading load-job-d" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  selectTheStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetailsOfJob()
      case apiStatusConstants.failure:
        return this.renderFailureDetailsOfJob()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-dtl-main-cont">{this.selectTheStatus()}</div>
      </>
    )
  }
}

export default JobItemDetails
