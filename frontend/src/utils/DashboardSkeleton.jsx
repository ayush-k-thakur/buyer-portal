import React from 'react'
import PropertySkeleton from './PropertySkeleton'
import HeaderSkeleton from './HeaderSkeleton'
import TabsSkeleton from './TabsSkeleton'

function DashboardSkeleton() {
    return (
        <div className='min-h-screen w-full bg-gradient-to-br from-emerald-100 via-gray-300 to-emerald-200'>
            <div className="space-y-10">

                {/* Header Skeleton */}
                <HeaderSkeleton />

                {/* Tabs Skeleton */}
                <TabsSkeleton />

                {/* Property Cards Skeleton */}
                <PropertySkeleton />

            </div>
        </div>
    )
}

export default DashboardSkeleton
