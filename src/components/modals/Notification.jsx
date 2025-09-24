import '../../styles/Notification.css';

function Notification({isNotification, setIsNotification}){

    if (isNotification) return(
    <div className="modal-list">
        <div className="list-container">
            <div className="list-content">
                <p className="">ASBDAIJSD</p>
            </div>
            <div className="list-content">
                <p className="">ASBDAIJSD</p>
            </div>
            <div className="list-content">
                <p className="">ASBDAIJSD</p>
            </div>
            <div className="list-content">
                <p className="">ASBDAIJSD</p>
            </div>
                <button className="cancel-button"
                onClick={setIsNotification}>Fechar</button>
        </div>
    </div>
    ); return null   
}
export default Notification;