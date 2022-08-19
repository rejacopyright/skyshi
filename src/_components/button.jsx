export const Button = ({
  type = 'button',
  size = 'sm',
  text = 'Button',
  theme = 'white',
  className = '',
  icon = 'check',
  iconClass = '',
  circle = false,
  dir = 'left',
  onClick = () => {},
  disabled = false,
  loading = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn d-flex align-items-center justify-content-center btn-${size} btn-${theme} ${
        circle ? 'radius-50' : ''
      } ${dir !== 'right' ? 'ps-2 pe-3' : 'ps-3 pe-2'} ${className}`}
      onClick={onClick}
    >
      {loading ? (
        <span className='indicator-progress d-block'>
          Please wait...
          <span className='spinner-border spinner-border-sm align-middle ms-2' />
        </span>
      ) : (
        <>
          {dir !== 'right' && <i className={`las la-${icon} ${iconClass} ${icon ? 'me-1' : ''}`} />}
          {text}
          {dir === 'right' && <i className={`las la-${icon} ${iconClass} ${icon ? 'ms-2' : ''}`} />}
        </>
      )}
    </button>
  )
}
