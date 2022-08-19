import { useState } from 'react'
import { Modal as MODAL } from 'react-bootstrap'
import { Button } from './button'

const Modal = ({
  show,
  setShow,
  title = '',
  body = 'Content',
  bodyClass = 'd-flex align-items-center justify-content-center',
  children = '',
  buttonText = 'Save',
  buttonIcon = 'check-double',
  buttonSave = true,
  loading = false,
  disabled = false,
  onSubmit,
  footer = true,
  size = 'md',
  onHide,
  backdrop = true, // boolean or string 'static'
  scrollable = true,
}) => {
  const [fullscreen, setFullscreen] = useState(false)

  const onClose = () => {
    setShow(false)
    onHide && onHide()
    setTimeout(() => {
      setFullscreen(false)
    }, 1000)
  }

  return (
    <MODAL
      dialogClassName={`modal-${size}`}
      centered
      fullscreen={fullscreen}
      backdrop={backdrop}
      show={show}
      onHide={onClose}
      scrollable={scrollable}
    >
      <MODAL.Header className='py-3 bg-lights'>
        <div className='row m-0 w-100 align-items-center'>
          {title && <div className='col fw-bolder text-primary text-uppercase ps-0'>{title}</div>}
          <div className='col-auto ms-auto pe-0'>
            <div
              className='btn btn-light-danger border-0 d-flex align-items-center justify-content-center btn-light-primary w-30px h-30px radius-50'
              onClick={onClose}
            >
              <i className='las la-times text-danger' />
            </div>
          </div>
        </div>
      </MODAL.Header>
      <MODAL.Body className={bodyClass}>{children || body}</MODAL.Body>
      {footer && (
        <MODAL.Footer className='p-3'>
          <Button
            text='Cancel'
            theme='light'
            className='text-dark ps-3'
            icon={false}
            dir='left'
            disabled={loading}
            onClick={onClose}
          />
          {buttonSave && (
            <Button
              text={buttonText}
              theme='primary'
              className='text-white'
              icon={buttonIcon}
              iconClass='fs-5'
              dir='left'
              loading={loading}
              disabled={disabled}
              onClick={onSubmit}
            />
          )}
        </MODAL.Footer>
      )}
    </MODAL>
  )
}

export { Modal }
