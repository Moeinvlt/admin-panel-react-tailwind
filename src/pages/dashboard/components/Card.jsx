const Card = ({title, info, number, icon, weekNum, monthNum, numberColor, iconColor}) => {
    return(
        <div className="flex flex-col gap-3 w-full">
            <div className="customBox flex gap-4 p-4">
                <i className={`w-10 h-10 text-[1.5rem] text-white rounded-md flex justify-center items-center ${iconColor}`}> {icon} </i>

                <div>
                    <p className="text-[13px] defaultText"> {title} </p>

                    <div className={`text-[1.375rem] ${numberColor}`}> {number} </div>

                    <p className="text-[11px] mutedText"> {info} </p>
                </div>
            </div>

            <div className="customBox p-2.5">
                <p className="text-[13px] mutedText"> <span className="font-bold text-green-400">{weekNum}</span> در هفته گذشته </p>
                <p className="text-[13px] mutedText"> <span className="font-bold text-green-400">{monthNum}</span> در ماه گذشته </p>
            </div>
        </div>
    )
}

export default Card;