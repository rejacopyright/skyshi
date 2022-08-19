import { useMemo, useState, forwardRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

export const Select = ({ options, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(defaultValue || options?.[0]?.value)
  const detail = useMemo(() => {
    return options?.find((f) => f.value === selected)
  }, [options, selected])
  return (
    <Dropdown
      drop='down'
      onSelect={(e) => {
        setSelected(e)
        onChange(e)
      }}
    >
      <Dropdown.Toggle
        variant='white'
        className='border border-1 w-100 d-flex align-items-center justify-content-between'
      >
        <div className='d-flex align-items-center'>
          <div className={`same-10px bg-${detail?.color || 'purple'} radius-10 me-2`} />
          <span className='fs-7'>{detail?.label || 'Choose Option'}</span>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className='w-100'>
        {options?.map(({ value, label, color }, index) => (
          <Dropdown.Item key={index} eventKey={value}>
            <div className='d-flex align-items-center'>
              <div className={`same-10px bg-${color || 'purple'} radius-10 me-2`} />
              <span className='fs-7'>{label}</span>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    className='pointer'
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    {children}
  </div>
))
export const Order = ({ options, defaultValue, onChange }) => {
  const [selected, setSelected] = useState(defaultValue || options?.[0]?.value)
  const detail = useMemo(() => {
    return options?.find((f) => f.value === selected)
  }, [options, selected])
  return (
    <Dropdown
      drop='down'
      onSelect={(e) => {
        setSelected(e)
        onChange(options?.find((f) => f.value === e))
      }}
    >
      <Dropdown.Toggle
        variant='white'
        as={CustomToggle}
        className='border border-1 w-100 d-flex align-items-center justify-content-between'
      >
        <div
          className='same-35px d-flex align-items-center justify-content-center border border-primary radius-100'
          data-cy='todo-sort-button'
        >
          <i className={`las la-${detail?.icon || 'sort-amount-down'} text-primary fs-5`} />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className='py-0 overflow-hidden border-0 shadow-lg' data-cy='sort-parent'>
        {options?.map(({ value, label, icon, cypress }, index) => (
          <Dropdown.Item
            key={index}
            eventKey={value}
            className={`${index !== 0 ? 'border-top py-2' : 'py-2'}`}
          >
            <div className={`d-flex align-items-center`} data-cy={cypress}>
              <i className={`las la-${icon || detail?.icon} text-primary me-2`} />
              <span className='fs-7'>{label}</span>
              <div className='ms-auto'>
                <div
                  className={`same-15px d-flex align-items-center justify-content-center bg-${
                    detail?.icon === icon ? 'primary' : 'white'
                  } radius-50 ms-3`}
                >
                  <i className={`las la-check text-white fs-10`} />
                </div>
              </div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
