import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onFindJobsClick = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-frame">
      <Header />

      <div>
        <div className="home-content-cont">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities potential.
          </p>
          <Link to="/jobs" className="text-decoration-none">
            <button type="button" onClick={onFindJobsClick}>
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
