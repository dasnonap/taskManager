import { TaskContext } from "@/Contexts/TaskContext";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Comment from "./Comment";
import axios from "axios";

export default function Comments({}) {
    const queryClient = useQueryClient();
    const task = useContext(TaskContext);

    const loadTaskComments = () => {
        return axios.get(route("comments.index"), {
            params: { task: task.id },
        });
    };

    const { isLoading, isError, data, error } = useQuery({
        queryFn: loadTaskComments,
        queryKey: ["comments"],
        refetchOnWindowFocus: false,
    });

    return (
        <div>
            {isLoading ? (
                "Loading Task Comments...."
            ) : (
                <div className="flex flex-col">
                    {data.data.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                key={Math.random().toString()}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
