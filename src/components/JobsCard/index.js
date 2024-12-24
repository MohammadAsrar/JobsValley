import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="p-3 mb-4 job-li">
      <Link className="text-decoration-none text-white" to={`/jobs/${id}`}>
        <div className="logo-cont">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
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

        <h1 className="p-0 fw-4 fs-5">Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobsCard
