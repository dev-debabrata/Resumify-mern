import React, { useEffect, useState } from "react";
import { getLightColorFromImage } from "../../utils/helper";

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {

    const [bgColor, setBgColor] = useState("#ffffff");

    useEffect(() => {
        if (imgUrl) {
            getLightColorFromImage(imgUrl)
                .then((color) => {
                    setBgColor(color);
                })
                .catch(() => {
                    setBgColor("#ffffff");
                });
        }
    }, [imgUrl]);

    return (
        <div
            onClick={onSelect}
            className="h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer transition"
        >
            {/* Image Section */}
            <div className="p-4 w-full">
                {imgUrl ? (
                    <img
                        src={imgUrl}
                        alt={title}
                        className="w-full h-[200px] rounded object-cover"
                        style={{ backgroundColor: bgColor }}
                    />
                ) : (
                    <div className="w-full h-[200px] rounded bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        No Preview
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="w-full bg-white px-4 py-3 border-t">
                <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
                    {title}
                </h5>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                    Last Updated: {lastUpdated}
                </p>
            </div>
        </div>
    );
};

export default ResumeSummaryCard;
