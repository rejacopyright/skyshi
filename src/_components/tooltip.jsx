import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tip from 'react-bootstrap/Tooltip'
import './style.scss'

export const Tooltip = ({
  children = '',
  placement = 'auto', // 'auto-start' | 'auto' | 'auto-end' | 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-end' | 'bottom' | 'bottom-start' | 'left-end' | 'left' | 'left-start'
  title = 'Title',
  trigger = ['hover', 'focus'], // 'hover' | 'click' |'focus' | ['hover', 'click', 'focus']
  active = true,
}) => {
  const renderTooltip = (props) => <Tip {...props}>{title}</Tip>
  return (
    <OverlayTrigger
      overlay={renderTooltip}
      placement={placement}
      trigger={trigger}
      show={active ? undefined : false}
    >
      {children}
    </OverlayTrigger>
  )
}
