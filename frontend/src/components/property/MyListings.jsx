import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import PropertySkeleton from '../../utils/PropertySkeleton';

function MyListings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [myProperties, setMyProperties] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(8); // items per page

    const [deleteTarget, setDeleteTarget] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchMyProperties = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:5000/property/my-listings?page=${page}&limit=${limit}`,
                { credentials: "include" }
            );
            const json = await res.json();
            setMyProperties(json.data || []);
            setTotalPages(json.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch my properties", error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchMyProperties();
    }, [user, page]);

    const confirmDelete = (property) => {
        setDeleteTarget(property);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/property/${deleteTarget._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );
            if (!res.ok) throw new Error("Delete failed");

            toast.success("Property deleted successfully");
            setMyProperties((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        } catch (error) {
            console.error("Failed to delete property", error);
        } finally {
            setShowModal(false);
            setDeleteTarget(null);
        }
    };

    const renderPagination = () => (
        <div className="flex gap-2 mt-6 justify-center">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            >
                Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
            >
                Next
            </button>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen w-full flex flex-col p-4">
                <PropertySkeleton />
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Listings</h2>
            {myProperties.length === 0 ? (
                <p>You have no property listings. Start adding some!</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {myProperties.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                type="seller-listings"
                                handleDelete={() => confirmDelete(property)}
                            />
                        ))}
                    </div>
                    {renderPagination()}
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyListings;