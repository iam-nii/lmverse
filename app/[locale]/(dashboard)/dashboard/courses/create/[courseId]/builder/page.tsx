"use client"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useSearchParams } from "next/navigation"
import ModuleForm from "./_components/ModuleForm"

export default function CourseContentPage(){
       const searchParams = useSearchParams()
 
       // URL -> `/dashboard?title=my-course-title`
  const course = searchParams.get('course')
 
    return (
    <div>
         <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/courses`} className="text-2xl">Courses</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/dashboard/courses/create`} className="text-2xl">{course}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-2xl">Course content</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <ModuleForm/>
    </div>
    )
    
}