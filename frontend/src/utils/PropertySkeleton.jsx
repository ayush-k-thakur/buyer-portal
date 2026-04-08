import React from 'react'

function PropertySkeleton() {
    return (
        <div>
            <div className="mb-4 animate-pulse">
                <div className="h-8 w-64 bg-gray-300 rounded"></div>
            </div>

            {/* Property Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-200 animate-pulse"
                    >
                        {/* Image placeholder */}
                        <div className="w-full h-36 sm:h-42 md:h-46 bg-gray-200"></div>

                        {/* Content placeholder */}
                        <div className="p-5 space-y-2">
                            <div className="h-6 bg-gray-300 rounded w-3/4"></div> {/* Property name */}
                            <div className="h-6 bg-gray-300 rounded w-1/4"></div> {/* Price */}
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div> {/* Location */}
                            <div className="h-4 bg-gray-300 rounded w-full"></div> {/* Description line 1 */}
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* Description line 2 */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PropertySkeleton
