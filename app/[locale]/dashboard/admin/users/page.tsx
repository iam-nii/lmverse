"use client";
import UserCard from "@/components/admin/UserCard";
import { useAuthStore } from "@/store/AuthStore";
import { useStudentStore } from "@/store/StudentStore";
import { useTutorStore } from "@/store/TutorStore";
import { useUserStore } from "@/store/UsersStore";
import { AppRole } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function UsersPage() {
  const { users, loading, error, fetchUsers, updateUserRole, getUsersByRole } =
    useUserStore();
  const [filterRole, setFilerRole] = useState<AppRole | "all">("all");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    setUpdatingUserId(userId);
    const updatedUserName = users.users.filter((user) => user.id === userId)[0]
      .full_name;
    try {
      await updateUserRole(userId, newRole);
      toast.success(`${updatedUserName}'s role has been successfully updated!`);
    } catch (error) {
      console.error(`Failed to update ${updatedUserName}'s role`, error);
      toast.error(`Failed to update ${updatedUserName}'s role`);
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Filtering users based on role
  const filteredUsers =
    filterRole === "all" ? users.users : getUsersByRole(filterRole);

  if (loading && users.users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => fetchUsers()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User management</h1>
          <p className="mt-2">Manage user roles and permissions</p>
        </div>
      </div>
      {/* Filters */}
      <div>
        <div>
          <label htmlFor="">Filter by Role</label>
          <select
            name="userRolesSelect"
            id="userRolesSelect"
            value={filterRole}
            onChange={(e) => setFilerRole(e.target.value as AppRole | "all")}
            className="px-3 py-2 rounded-lg focus:ring-2"
          >
            <option value="all">All users</option>
            <option value="admin">Administrators</option>
            <option value="tutor">Tutors</option>
            <option value="student">Students</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex items-end">
          <div className="text-sm">
            Total: <span className="font-semibold">{filteredUsers.length}</span>{" "}
            users
          </div>
        </div>
      </div>

      {/* Users Grid */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-12 rounded-lg shadow">
          <p className="text-gray-600">
            No users found with the selected role.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isUpdating={updatingUserId === user.id}
              onRoleChange={handleRoleChange}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default UsersPage;
