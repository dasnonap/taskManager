import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Comment({ comment }) {
    if (!comment) return;

    const [isOpened, setIsOpened] = useState(false);

    const onExpandButtonClick = (event) => {
        event.preventDefault();

        setIsOpened(!isOpened);
    };
    return (
        <div className="bg-gray-200 border rounded-md my-3 px-2 py-4">
            {comment.created ? (
                <div className="flex flex-row">
                    <p className="italic text-sm">
                        {"Created at: " + comment.created}
                    </p>

                    <PrimaryButton
                        onClick={onExpandButtonClick}
                        type="button"
                        className="bg-white"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                    </PrimaryButton>
                </div>
            ) : (
                "Comment"
            )}

            {isOpened ? (
                <div className="bg-white-400">{comment.comment}</div>
            ) : (
                ""
            )}
        </div>
    );
}
