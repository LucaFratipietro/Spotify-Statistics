import '../styling/Modal.css';

export default function Modal({ content, closeModal, theme }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className={`modal-content ${theme}`}>
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <div className="modal-info">
          {content}
        </div>
      </div>
    </div>
  );
}