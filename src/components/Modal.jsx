//
// MODAL
// =====
// This is a React component that is able to wrap one or more
// components and make them display modal. It illustrates how
// a component can make the components it wraps around operate
// with a special React characteristic called "children". This
// is a reserved property. It refers to all the content between
// the opening and the closing tags the component wraps around.
//
// Revision History
// ================
// 03.12.2024 BRD Original version
//
import classes from './Modal.module.css';

function Modal({children, onClose}) {
   return (
      <div>
         <div className={classes.backdrop} onClick={onClose} />
            <dialog open className={classes.modal}>
               {children}
            </dialog>
      </div>
   );
}
export default Modal;
