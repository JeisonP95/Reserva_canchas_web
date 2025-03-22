import React from "react";
import CustomForm from "../../layouts/Form/CustomForm";
import CustomInput from "../../components/Input/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";

const ChangePassword: React.FC = () => {
    return(
        <div>
            <CustomForm>
                <CustomInput value="" onChange={alert} editable/>
                <CustomButton onClick={alert} text="Guardar Cambios" variant="primary" />
            </CustomForm>
        </div>
    )
}

export default ChangePassword;