"use client";


import { ChevronRight} from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import CreateForm from "./CreateForm";



function CourseCreationPage() {

  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-3xl">Создать курс</h1>
      </div>

        <CreateForm/>
      
    </>
  );
}

export default CourseCreationPage;
