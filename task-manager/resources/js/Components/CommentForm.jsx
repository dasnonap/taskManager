import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import TextArea from "./TextArea";
import { TaskContext } from "@/Contexts/TaskContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function CommentForm({}) {
    const task = useContext(TaskContext);
    const [formErrors, setFormErrors] = useState();
    const { data, setData, post, processing, errors, reset } = useForm({
        task_id: task.id,
        comment: "",
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const onHandleCommentSubmit = (event) => {
        event.preventDefault();
        axios
            .post(route("comments.create"), data)
            .then(function (response) {
                reset("comment");
                // update comments
            })
            .catch(function (error) {
                setFormErrors(error.response.data.message);
            });
    };
    return (
        <div>
            <form onSubmit={onHandleCommentSubmit}>
                {formErrors ? (
                    <div className="text-red-500">{formErrors}</div>
                ) : (
                    ""
                )}
                <div className="grid gap-x-2 gap-y-4 grid-cols-12 grid-rows-2 auto-rows-fr">
                    <div className="col-span-full">
                        <TextArea
                            required={true}
                            name="comment"
                            id="comment"
                            className="w-full"
                            data={data.comment}
                            placeholder=""
                            rows="4"
                            cols="4"
                            handleChange={onHandleChange}
                        />
                    </div>

                    <div className="col-start-11 col-end-13">
                        <PrimaryButton
                            processing={processing}
                            className="w-full"
                        >
                            Add New
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    );
}
