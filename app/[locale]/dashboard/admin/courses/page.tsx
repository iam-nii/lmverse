"use client";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/store/AuthStore";
import Link from "next/link";

function CoursesPage() {
  const { user } = useAuthStore();
  const userRole = user?.user_metadata.role;
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Available courses</h1>
        <Link
          href={`/dashboard/${userRole}/courses/create`}
          className={buttonVariants()}
        >
          Create course
        </Link>
      </div>
      <div></div>
    </>
  );
}

export default CoursesPage;
