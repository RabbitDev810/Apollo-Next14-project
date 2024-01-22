const AccessDenied = ({header, message, className}) => {
    return (
        <div className={className ? className : "w-full h-full flex"}>
            <div className="m-auto bg-[#0A0B12] rounded-lg p-5 shadow-xl w-96">
                <p className="text-2xl font-bold text-center mb-5">{header}</p>
                <p className="text-sm">{message}</p>
                <img className="w-20 h-20 mx-auto mt-10" src="/paywall.png"></img>
            </div>
        </div>
    )
}

export default AccessDenied