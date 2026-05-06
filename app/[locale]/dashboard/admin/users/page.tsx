"use client";
import { useAuthStore } from "@/store/AuthStore";
import { useStudentStore } from "@/store/StudentStore";
import { useTutorStore } from "@/store/TutorStore";
import Link from "next/link";
import { useEffect } from "react";

function UsersPage() {
  const { user } = useAuthStore();
  const { fetchStudents } = useStudentStore();
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Registered users</h1>
      </div>
      <div>
        {/* {students.students.map((student) => (
          <p key={student.id}>student</p>
        ))} */}
      </div>
    </>
  );
}

export default UsersPage;
