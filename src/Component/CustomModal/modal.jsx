import "./modal.css"

//accept the Required properties to view in modal

const Modal = ({ show, setShow, item, }) => {

    const onOutSideClick = () => {
        setShow(false)
    }
    return (
        <div onClickCapture={onOutSideClick} className="modalContainer">
            <div
                onClickCapture={() => setShow(show)}
                className={show ? "customModal positionTwo " : "cutomModal"}
            >
                <div className="">Product Details On Modal</div>
            </div>
        </div>
    );
}
export default Modal;
