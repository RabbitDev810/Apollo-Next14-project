export const ReactSelectStyle = {
    control: (baseStyles, state) => ({
        ...baseStyles,
        border: "1px solid white",
        borderRadius: 42,
        backgroundColor: "transparent",
        height: "3rem",
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: "white",
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        color: "white",
        caretColor: "white",
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        color: "#7E8492",
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#131527",
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isFocused ? "black" : state.isSelected ? "white" : "#7E8492",
    }),

    menuPortal: provided => ({ ...provided, zIndex: 9999, backgroundColor: "#131527" }),
    //menu: provided => ({ ...provided, zIndex: 9999, backgroundColor: "#131527" })
};

export const ReactSelectStyleSm = {
    ...ReactSelectStyle,
    control: (baseStyles, state) => ({
        ...baseStyles,
        borderColor: "transparent",
        backgroundColor: "transparent",
    }),
};