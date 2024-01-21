export default function DateBlock({ date, title, className }) {
    if (!date) return;

    let dateObject = new Date(date);
    let formattedDate =
        dateObject.getDate() +
        " " +
        (dateObject.getMonth() + 1) +
        " " +
        dateObject.getFullYear();

    return (
        <div className={className ? className : "flex flex-row gap-5"}>
            {title ? <p>{title}</p> : ""}

            <p className="font-bold">{formattedDate ? formattedDate : ""}</p>
        </div>
    );
}
