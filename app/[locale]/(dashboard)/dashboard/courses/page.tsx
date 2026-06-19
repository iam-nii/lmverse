import CoursesGrid from "@/app/[locale]/(dashboard)/dashboard/courses/_components/CoursesGrid";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
function CoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        
        <h1 className="font-bold text-2xl">Available courses</h1>
        <Link
          href={`/dashboard/courses/create`}
          className={buttonVariants()}
        >
          Create course
        </Link>
      </div>
      <CoursesGrid />
    </div>
  );
}

export default CoursesPage;
