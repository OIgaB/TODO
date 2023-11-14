import  { React, useEffect } from "react";
import { createPortal } from "react-dom";
import sprite from '../../images/sprite.svg';


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ isOpen, onClose, children }) => {

   useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                onClose();
                document.body.style.overflow = 'visible'; 
            };
        };
      
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);

   }, [onClose]);
 
   const handleBackdropClick = e => {
      if (e.currentTarget === e.target) {
         onClose();
         document.body.style.overflow = 'visible'; 
      };
   };

   document.body.style.overflow = 'hidden'; 

   return (
        createPortal(
            <div className='overlay' onClick={handleBackdropClick}>
                <div className='modal' style={{opacity: isOpen ? 1 : 0}}>
                    <div className='closebtn' onClick={onClose}>
                        <svg className='icon' width="18" height="18">
                            <use className='icon' href={sprite + '#icon-close'}></use>
                        </svg>
                    </div>
                    {children}
                </div>
            </div>, modalRoot
        )
   )
};