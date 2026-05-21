// components/UserCard.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import { AppRole, IUser } from "@/types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { toast } from "sonner";
import { useAuthStore } from "@/store/AuthStore";
import { LoadingSpinner } from "../ui/loading-spinner";

interface UserCardProps {
  user: IUser;
  onRoleChange: (userId: string, newRole: AppRole) => Promise<void>;
  isUpdating?: boolean;
}

const roleOptions: { value: AppRole; label: string; color: string }[] = [
  {
    value: "admin",
    label: "Administrator",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "tutor", label: "Tutor", color: "bg-blue-100 text-blue-800" },
  { value: "student", label: "Student", color: "bg-green-100 text-green-800" },
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
];

const statusColors = {
  active: "bg-green-100 text-green-800",
  blocked: "bg-red-100 text-red-800",
  deleted: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-blue-100 text-blue-800",
};

export default function UserCard({
  user,
  onRoleChange,
  isUpdating = false,
}: UserCardProps) {
  const [selectedRole, setSelectedRole] = useState<AppRole>(user.role);
  const [isChanging, setIsChanging] = useState(false);
  const {user: authUser} = useAuthStore();

  const handleRoleChange = async (newRole: AppRole) => {
    setIsChanging(true);
    try {
      await onRoleChange(user.id, newRole);
      setSelectedRole(newRole);
    } finally {
      setIsChanging(false);
    }
  };

  const currentRoleStyle =
    roleOptions.find((r) => r.value === user.role)?.color || "bg-gray-100";

  return (
    <div className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-none bg-card">
      {/* Header with avatar */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt={user.full_name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">
              {user.full_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <span
            className={`inline-flex mr-2 items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[user.status]
            }`}
          >
            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${currentRoleStyle}`}
          >
            {roleOptions.find((r) => r.value === user.role)?.label || user.role}
          </span>
        </div>

        {/* User info */}
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-muted-background">Phone:</span>
            <span className="text-muted-background">
              {user.phone_number || "Not provided"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-background">Member since:</span>
            <span className="text-muted-background">
              {user.created_at.toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Role selector */}
        <div>
          <div className="border-t-[0.5px] border-gray-500 pt-4 flex items-center">
          <label className="block min-w-24 text-sm font-medium text-muted-background mb-2">
            User Role
          </label>
          <Select          
          onValueChange={(e) => handleRoleChange(e as AppRole)}
            value={selectedRole}
            // onChange={(e) => handleRoleChange(e.target.value as AppRole)}
            disabled={isChanging || isUpdating || authUser?.email === user.email}
            // className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SelectTrigger className="w-full ">
              <SelectValue placeholder="Role"/>
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}              
            </SelectContent>
            
          </Select>
          {isChanging && (
            <LoadingSpinner size={25}/>
            // <p className="text-xs text-blue-600 mt-1">Updating role...</p>
          )}
        </div>
        </div>
        
      </div>

      
    </div>
  );
}
