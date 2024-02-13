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
                <div className="flex flex-row items-center justify-between">
                    <p className="italic text-sm">
                        {"Posted at: " +
                            comment.created +
                            ", by " +
                            comment.user}
                    </p>

                    <PrimaryButton onClick={onExpandButtonClick} type="button">
                        {isOpened == true ? (
                            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
                        ) : (
                            <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                        )}
                    </PrimaryButton>
                </div>
            ) : (
                "Comment"
            )}

            {isOpened ? (
                <div className="bg-white-400 my-3">{comment.comment}</div>
            ) : (
                ""
            )}
        </div>
    );
}
