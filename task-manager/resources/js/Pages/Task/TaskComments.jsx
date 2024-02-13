import React from "react";
import CommentForm from "@/Components/CommentForm";
import Comments from "@/Components/Comments";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TaskComments({}) {
    const handleInsertComment = () => {
        queryClient.invalidateQueries("comments");
    };
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <QueryClientProvider client={queryClient}>
                <Comments />

                <CommentForm onCreateComment={handleInsertComment} />
            </QueryClientProvider>
        </div>
    );
}
