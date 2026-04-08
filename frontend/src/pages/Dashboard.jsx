import { useState, useEffect, useMemo } from "react"
import { useAuth } from "../contexts/AuthContext"
import { toast } from "react-toastify"
import Header from "../components/property/Header"
import PropertyCard from "../components/property/PropertyCard"
import AddProperty from "../components/property/AddProperty"
import MyListings from "../components/property/MyListings"
import DashboardSkeleton from "../utils/DashboardSkeleton"
import { buildUrl } from "../utils/api"

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false)

  const [properties, setProperties] = useState([])
  const [propsPage, setPropsPage] = useState(1)
  const [propsTotalPages, setPropsTotalPages] = useState(1)

  const [favourites, setFavourites] = useState([])
  const [favPage, setFavPage] = useState(1)
  const [favTotalPages, setFavTotalPages] = useState(1)

  const limit = 8

  const favIds = useMemo(() => new Set(favourites.map(p => p._id)), [favourites])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          buildUrl(`/property?page=${propsPage}&limit=${limit}`),
          { credentials: "include" }
        )
        const json = await res.json()
        setProperties(json.data || [])
        setPropsTotalPages(json.totalPages || 1)
      } catch (err) {
        console.error("Failed to fetch properties", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [propsPage])

  useEffect(() => {
    if (!user) return
    const fetchFavourites = async () => {
      try {
        const res = await fetch(
          buildUrl(`/property/favourites?page=${favPage}&limit=${limit}`),
          { credentials: "include" }
        )
        const json = await res.json()
        setFavourites(json.data || [])
        setFavTotalPages(json.totalPages || 1)
      } catch (err) {
        console.error("Failed to fetch favourites", err)
      }
    }
    fetchFavourites()
  }, [user, favPage])

  const toggleFavourite = async property => {
    try {
      await fetch(
        buildUrl(`/property/favourites/${property._id}`),
        { method: "PATCH", credentials: "include" }
      )
      const wasFav = favIds.has(property._id)
      if (wasFav) {
        toast.info("Removed from favourites");
        setFavourites(prev => prev.filter(p => p._id !== property._id))
      }
      else {
        toast.success("Added to favourites");
        setFavourites(prev => [property, ...prev])
      }
    } catch (err) {
      console.error("Failed to toggle favourite", err)
    }
  }

  const renderPagination = (page, total, setPage) => (
    <div className="flex gap-2 mt-6 justify-center">
      <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer">Previous</button>
      <span>Page {page} of {total}</span>
      <button onClick={() => setPage(page + 1)} disabled={page >= total} className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer">Next</button>
    </div>
  )

  // Skeleton while loading
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <DashboardSkeleton />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 via-gray-300 to-emerald-200 flex flex-col">
      <div className="flex-1 w-full max-w-7xl m-auto px-4 sm:px-6 lg:px-8 py-4">
        <Header user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* All Properties */}
        {activeTab === "all" && (
          <>
            <h2 className="text-2xl font-bold mb-4">All Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {properties.map(p => (
                <PropertyCard
                  key={p._id}
                  property={p}
                  isFav={favIds.has(p._id)}
                  toggleFavourite={toggleFavourite}
                  type="all-properties"
                />
              ))}
            </div>
            {renderPagination(propsPage, propsTotalPages, setPropsPage)}
          </>
        )}

        {/* Favourites */}
        {activeTab === "favourites" && (
          <>
            <h2 className="text-2xl font-bold mb-4">My Favourites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favourites.map(p => (
                <PropertyCard
                  key={p._id}
                  property={p}
                  isFav={favIds.has(p._id)}
                  toggleFavourite={toggleFavourite}
                  type="all-properties"
                />
              ))}
            </div>
            {favourites.length === 0 && <p className="text-gray-500 mt-6">No favourites yet</p>}
            {renderPagination(favPage, favTotalPages, setFavPage)}
          </>
        )}

        {/* Add Property */}
        {activeTab === "add" && <AddProperty className="w-full max-w-md" />}

        {/* My Listings */}
        {activeTab === "my-listings" && <MyListings />}
      </div>
    </div>
  )
}