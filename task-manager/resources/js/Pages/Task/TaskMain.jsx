export default function TaskMain({ task }) {
    return (
        <>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
                {task.description ? task.description : ""}
            </div>
        </>
    );
}
