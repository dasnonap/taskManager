import React from "react";

export default function Row({ title, tasks }) {
    return (
        <div className="border-2 w-1/3 border-gray-700 rounded-sm">
            <h3 className="text-lg font-bold text-center text-white bg-gray-700">
                {title}
            </h3>

            <div className="flex flex-col gap-4 px-4 py-8">
                <div className="border-2 rounded-sm p-2 bg-white ">
                    <div className="text-sm mb-4 ">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="text-xs p-0.5 px-0
                            transition ease-in-out delay-100
                            border-b-2 border-transparent
                            hover:border-gray-700"
                        >
                            Review Notes
                        </button>

                        <div className="text-xs">Urgent</div>
                    </div>
                </div>

                <div className="border-2 rounded-sm p-2 bg-white ">
                    <div className="text-sm mb-4 ">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="text-xs p-0.5 px-0
                            transition ease-in-out delay-100
                            border-b-2 border-transparent
                            hover:border-gray-700"
                        >
                            Review Notes
                        </button>

                        <div className="text-xs">Urgent</div>
                    </div>
                </div>

                <div className="border-2 rounded-sm p-2 bg-white ">
                    <div className="text-sm mb-4 ">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="text-xs p-0.5 px-0
                            transition ease-in-out delay-100
                            border-b-2 border-transparent
                            hover:border-gray-700"
                        >
                            Review Notes
                        </button>

                        <div className="text-xs">Urgent</div>
                    </div>
                </div>

                <div className="border-2 rounded-sm p-2 bg-white ">
                    <div className="text-sm mb-4 ">
                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            className="text-xs p-0.5 px-0
                            transition ease-in-out delay-100
                            border-b-2 border-transparent
                            hover:border-gray-700"
                        >
                            Review Notes
                        </button>

                        <div className="text-xs">Urgent</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
