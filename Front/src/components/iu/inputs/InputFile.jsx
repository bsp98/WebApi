import { useRef } from "react";
import './inputs.css'


export const InputFile = ({ name, label }) => {
    const inputFileRef = useRef(null);

    const handleClick = () => {
        inputFileRef.current.click();
    };

    return (
        <div className="form_group">

            <label>{label}</label>

            <button type="button" onClick={handleClick} className="input_form btn_input_file" style={{ cursor: "pointer" }}>
                <span>Cargar imagen</span>
                <i className="icon_file fa-solid fa-arrow-up-from-bracket" ></i>
            </button>

            <input type="file" name={name} accept="image/*" ref={inputFileRef} style={{ display: "none" }}/>
        </div>
    );
}
