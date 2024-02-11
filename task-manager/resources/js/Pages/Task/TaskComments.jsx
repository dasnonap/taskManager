import React from "react";
import CommentForm from "@/Components/CommentForm";
import Comments from "@/Components/Comments";

export default function TaskComments({}) {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CommentForm />

            <Comments />
        </div>
    );
}
