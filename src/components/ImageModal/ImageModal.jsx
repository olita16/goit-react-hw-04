
import React from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";


Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, largeImageURL, tags }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <img src={largeImageURL} alt={tags} className={styles.modalImage} />
    </Modal>
  );
};

export default ImageModal;
