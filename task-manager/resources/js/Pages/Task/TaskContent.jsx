import DateBlock from "@/Components/DateBlock";

export default function TaskContent({ task }) {
    return (
        <>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-4xl">
                            {task.title ? task.title : ""}
                        </h1>

                        <button className="btn">Continue Task</button>
                    </div>

                    <div className="flex flex-col gap-4 items-end">
                        <DateBlock
                            date={task.additional_info.data.start_time}
                            title="Start Time: "
                        />

                        <DateBlock
                            date={task.additional_info.data.end_time}
                            title="End Time:"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
