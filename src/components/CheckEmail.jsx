import './CheckEmail.css'


const CheckEmail = ({onClose}) =>{
const handleOverlayClick = (e) => {
    if (e.target.className === 'check-email-modal') {
      onClose();
    }
  };
    return(
        <div className='check-email-modal' onClick={handleOverlayClick}>
            <div className='check-email-content'>CHECK YOUR EMAIL TO CONFIRM!</div>
        </div>
    )
}
export default CheckEmail