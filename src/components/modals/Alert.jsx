import { useEffect } from "react";
import "../../styles/Alert.css";

function Alert({ response, text, error, onClose, duration = 2000 }) {
 
   

  useEffect(() => {
    
    const timer = setTimeout(() => {
          onClose?.();
        }, duration)

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="alert-container">
      <div className="alert-content">
        <h1 className="alert-title">{response} {text}</h1>
        <p className="alert-error">{error}</p>
      </div>
    </div>
  );
}

export default Alert;
