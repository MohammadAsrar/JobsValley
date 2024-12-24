import {FaStar} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {IoLocationSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsList} = props

  return (
    <div className="mt-5 text-white">
      <h1 className="fw-bold mb-3 fs-4">Similar Jobs</h1>

      <ul className="d-flex flex-wrap p-0">
        {similarJobsList.map(sj => (
          <li key={sj.id} className="sim-li">
            <div className="logo-cont mb-4">
              <img
                className="company-logo"
                src={sj.companyLogoUrl}
                alt="similar job company logo"
              />
              <div className="d-flex flex-column justify-content-center">
                <h1 className="m-0 p-0 fw-3 fs-6">{sj.title}</h1>
                <div className="d-flex align-items-center">
                  <FaStar color="gold" className="rating" />
                  <p className="m-0 bg-priary">{sj.rating}</p>
                </div>
              </div>
            </div>

            <h1 className="m-0 p-0 fw-4 fs-5">Description</h1>
            <p className="mt-2 mb-3">{sj.jobDescription}</p>

            <div className="sim-btm-cont d-flex align-items-center">
              <IoLocationSharp className="loc-type" />
              <p className="location-p">{sj.location}</p>

              <BsFillBriefcaseFill className="loc-type" />
              <p className="m-0">{sj.employmentType}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobs
