import React from 'react'

function TabsSkeleton() {
    return (
        <div className="flex justify-center">
        <div className="flex gap-2 bg-gray-100 p-2 rounded-xl shadow-inner min-w-max overflow-x-auto">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
        </div>
        </div>
    )
}

export default TabsSkeleton
