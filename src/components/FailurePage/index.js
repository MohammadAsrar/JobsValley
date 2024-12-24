import './index.css'

const FailurePage = props => {
  const {retryClicked} = props

  const onRetry = () => {
    retryClicked()
  }

  return (
    <div className="d-flex flex-column justify-content-content align-items-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="mb-5"
        id="img-failure"
      />
      <h1 id="heading-failure" className="text-white">
        Oops! Something Went Wrong
      </h1>
      <p id="para-failure" className="text-white">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        data-testid="button"
        className="button-retry"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  )
}

export default FailurePage
