import React from 'react'

function HeaderSkeleton() {
    return (
        <header className="w-[92%] mx-auto bg-white border border-emerald-200 shadow-sm rounded-xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 animate-pulse">
            <div className="space-y-2">
                <div className="h-6 w-48 bg-gray-300 rounded"></div> {/* Title */}
                <div className="h-4 w-64 bg-gray-200 rounded"></div> {/* Welcome text */}
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded"></div> {/* Sign out button */}
        </header>
    )
}

export default HeaderSkeleton
