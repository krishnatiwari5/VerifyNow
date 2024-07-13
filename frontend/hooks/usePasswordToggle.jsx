import React, { useState } from "react";

const usePasswordToggle = () => {
    const [visible, setVisiblity] = useState(false);

    const Icon = (
<>
            icon={visible ? "FaEyeSlash" : "FaEye"}
            onClick={() => setVisiblity(visiblity => !visiblity)}
            </>
    );

    const InputType = visible ? "text" : "password";

    return [InputType, Icon];
};

export default usePasswordToggle;