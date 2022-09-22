import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface NotificationMessageProps {
  show: boolean;
  bg: string;
  message: string;
  onClose: (b: boolean)=>void
}
/**
 * Notification component, it is used to notify the user about important events
 *
 * @param {NotificationMessageProps} props
 * @returns
 */
function NotificationMessage(props: NotificationMessageProps) {
  const { show, bg, message, onClose } = props;

  return (
    <ToastContainer
      position={'top-end'}
    >
      <Toast
        show={ show}
        autohide={true}
        bg={bg}
        onClose={()=>onClose(false)}
        delay={3000}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
          <small className="text-muted"></small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default NotificationMessage;