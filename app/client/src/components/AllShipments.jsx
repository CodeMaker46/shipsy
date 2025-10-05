import React, { useState, useMemo, useEffect } from "react";
import { Package, Search, X, ChevronDown } from "lucide-react";
import ShipmentsTable from "./ShipmentTable";
import Pagination from "./Pagination";
import { BACKEND_URL } from "../config/config";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditShipmentModal from "./EditShipmentModal";

const STATUS_OPTIONS = ["NEW", "IN_TRANSIT", "DELIVERED", "CANCELLED"];


const SkeletonRow = () => (
    <tr className="border-b border-gray-200">
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
        </td>
        <td className="px-6 py-4">
            <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </td>
        <td className="px-6 py-4">
            <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
        </td>
    </tr>
);

const LoadingSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
                        </th>
                        <th className="px-6 py-4 text-left">
                            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(3)].map((_, index) => (
                        <SkeletonRow key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default function AllShipments() {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedEditShipment, setSelectedEditShipment] = useState(null);

    const handleEditShipment = (id) => {
        const toEdit = shipments.find(s => s.id === id) || null;
        setSelectedEditShipment(toEdit);
        setIsEditOpen(true);
    };

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);

    const handleDeletePrompt = (id) => {
        setSelectedDeleteId(id);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedDeleteId) return;
        try {
            const token = localStorage.getItem("token");
            const resp = await fetch(`${BACKEND_URL}/shipment/${selectedDeleteId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
                },
            });
            if (!resp.ok) {
                throw new Error(`Failed with status ${resp.status}`);
            }
            setShipments((prev) => prev.filter((s) => s.id !== selectedDeleteId));
        } catch (e) {
            console.error("Delete failed", e);
        } finally {
            setIsDeleteOpen(false);
            setSelectedDeleteId(null);
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedStatus("");
    };

    const filteredShipments = useMemo(() => {
        return shipments.filter((shipment) => {
            const matchesSearch =
                searchTerm === "" ||
                shipment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shipment.status.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                selectedStatus === "" || shipment.status === selectedStatus;

            return matchesSearch && matchesStatus;
        });
    }, [shipments, searchTerm, selectedStatus]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedShipments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredShipments.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredShipments, currentPage]);

    const totalPages = Math.ceil(filteredShipments.length / itemsPerPage);
    const [username] = useState("Alex Chen");
    const [activeTab, setActiveTab] = useState("MyShipments");

    const hasActiveFilters = searchTerm !== "" || selectedStatus !== "";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${BACKEND_URL}/shipment/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token,
                    },
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                const normalized = (result.data || []).map(s => ({
                    id: s._id,
                    title: s.title || (s._id ? `Shipment ${String(s._id).slice(-6)}` : "Untitled"),
                    createdBy: s.createdBy?.username || "Unknown",
                    fragile: s.fragile,
                    status: typeof s.status === 'string' ? s.status.replace('-', '_') : s.status,
                    weight: s.weightKg,
                    distance: s.distanceKm,
                    basePrice: s.baseRate,
                    cost: s.cost,
                    createdAt: s.createdAt,
                })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setShipments(normalized);
            } catch (error) {
                console.error("Error fetching data:", error);
                setShipments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl">
                            <Package className="w-7 h-7 text-white" />
                        </div>
                        All Shipments
                    </h2>
                </div>

                {/* Filter Bar - Disabled during loading */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={loading ? "Loading..." : "Search by title, creator, ID, or status..."}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={loading}
                                className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 text-sm w-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    !loading && setIsStatusDropdownOpen(!isStatusDropdownOpen)
                                }
                                disabled={loading}
                                className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 cursor-pointer border border-gray-200 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium text-gray-700 min-w-[160px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {selectedStatus || "All Statuses"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${isStatusDropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {isStatusDropdownOpen && !loading && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                                    <button
                                        onClick={() => {
                                            setSelectedStatus("");
                                            setIsStatusDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-xl"
                                    >
                                        All Statuses
                                    </button>
                                    {STATUS_OPTIONS.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setIsStatusDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-gray-50 last:rounded-b-xl ${selectedStatus === status
                                                ? "bg-blue-50 text-blue-700 font-medium"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        
                        {hasActiveFilters && !loading && (
                            <button
                                onClick={clearFilters}
                                className="flex cursor-pointer items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Content Area */}
                {loading ? (
                    <LoadingSkeleton />
                ) : filteredShipments.length > 0 ? (
                    <>
                        <ShipmentsTable
                            shipments={paginatedShipments}
                            onEdit={handleEditShipment}
                            onDelete={handleDeletePrompt}
                            myshipment={false}
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No shipments found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {hasActiveFilters
                                ? "Try adjusting your search terms or filters."
                                : "Create your first shipment to get started."}
                        </p>
                    </div>
                )}
        </div>
        <DeleteConfirmationModal
            isOpen={isDeleteOpen}
            onCancel={() => { setIsDeleteOpen(false); setSelectedDeleteId(null); }}
            onConfirm={confirmDelete}
        />
        <EditShipmentModal
            isOpen={isEditOpen}
            shipment={selectedEditShipment}
            onClose={() => { setIsEditOpen(false); setSelectedEditShipment(null); }}
            onSave={(updated) => {
                setShipments(prev => prev.map(s => s.id === updated._id ? {
                    id: updated._id,
                    title: updated.title,
                    createdBy: updated.createdBy?.username || "Unknown",
                    fragile: updated.fragile,
                    status: typeof updated.status === 'string' ? updated.status.replace('-', '_') : updated.status,
                    weight: updated.weightKg,
                    distance: updated.distanceKm,
                    basePrice: updated.baseRate,
                    cost: updated.cost,
                    createdAt: updated.createdAt,
                } : s));
            }}
        />
        </>
    );
}