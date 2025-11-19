"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Maid } from "@/types/maid";
import { getMaidDisplayId } from "@/lib/utils";
import { deleteMaidAction } from "@/app/actions/maids";
import { logoutAction } from "@/app/actions/auth";
import MaidForm from "./MaidForm";

interface AdminMaidsClientProps {
  initialMaids: Maid[];
}

export default function AdminMaidsClient({ initialMaids }: AdminMaidsClientProps) {
  const [maids, setMaids] = useState<Maid[]>(initialMaids);
  const [editingMaid, setEditingMaid] = useState<Maid | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  // Clear session on page refresh (but not on initial load after login)
  useEffect(() => {
    // Check if this is a refresh by looking at navigation type and referrer
    const checkIfRefresh = () => {
      try {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        const navEntry = navEntries[0];
        const referrer = document.referrer;
        
        // If referrer is the same page (admin/maids), it's likely a refresh
        // If referrer is empty or different, it's likely initial navigation
        const isSamePage = referrer.includes('/admin/maids');
        
        // Only log out if:
        // 1. Navigation type is 'reload' AND
        // 2. Referrer is the same page (indicating refresh, not initial load)
        if (navEntry?.type === 'reload' && isSamePage) {
          // Page was refreshed - clear session and redirect to login
          document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          router.push("/admin");
        }
      } catch (e) {
        // If check fails, don't log out - prevents false logouts
      }
    };
    
    // Wait a bit for performance API and referrer to be available
    const timer = setTimeout(checkIfRefresh, 300);
    return () => clearTimeout(timer);
  }, [router]);

  // Sync state with props when initialMaids changes (after refresh)
  useEffect(() => {
    setMaids(initialMaids);
  }, [initialMaids]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this maid?")) {
      return;
    }

    const result = await deleteMaidAction(id);
    if (result.success) {
      setMaids(maids.filter((m) => m.id !== id));
      showToast("Maid deleted successfully", "success");
      router.refresh();
    } else {
      showToast(result.error || "Failed to delete maid", "error");
    }
  };

  const handleEdit = (maid: Maid) => {
    setEditingMaid(maid);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMaid(null);
    router.refresh();
    showToast(
      editingMaid ? "Maid updated successfully" : "Maid created successfully",
      "success"
    );
  };

  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingMaid(null);
              setShowForm(true);
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Add New Maid
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {toast.message}
        </div>
      )}

      {showForm && (
        <MaidForm
          maid={editingMaid}
          allMaids={maids}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingMaid(null);
          }}
        />
      )}

      {/* Table View */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Maid ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {maids.map((maid) => {
              const maidDisplayId = getMaidDisplayId(maid, maids);
              const handleCopyId = () => {
                navigator.clipboard.writeText(maidDisplayId);
                showToast("Maid ID copied to clipboard", "success");
              };
              
              return (
                <tr key={maid.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    <button
                      onClick={handleCopyId}
                      className="hover:text-primary-600 transition-colors cursor-pointer"
                      title="Click to copy"
                    >
                      {maidDisplayId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-12 w-12">
                      <Image
                        src={maid.photos[0] || "/maids/placeholder.svg"}
                        alt={maid.name}
                        fill
                        className="object-cover rounded"
                      />
                      {/* Maid ID overlay on top of picture */}
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded">
                        <button
                          onClick={handleCopyId}
                          className="text-white font-mono text-xs font-semibold hover:text-primary-300 transition-colors cursor-pointer"
                          title="Click to copy"
                        >
                          {maidDisplayId}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(maid)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(maid.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {maids.map((maid) => {
          const maidDisplayId = getMaidDisplayId(maid, maids);
          const handleCopyId = () => {
            navigator.clipboard.writeText(maidDisplayId);
            showToast("Maid ID copied to clipboard", "success");
          };
          
          return (
            <div key={maid.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={maid.photos[0] || "/maids/placeholder.svg"}
                  alt={maid.name}
                  fill
                  className="object-cover"
                />
                {/* Maid ID overlay on top of picture */}
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 px-3 py-2">
                  <button
                    onClick={handleCopyId}
                    className="text-white font-mono text-sm font-semibold hover:text-primary-300 transition-colors cursor-pointer w-full text-left"
                    title="Click to copy"
                  >
                    {maidDisplayId}
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(maid)}
                    className="flex-1 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(maid.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

