import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { useCourseContentStore } from "@/store/courses/CourseContentStore"
import { Reorder } from "framer-motion";



export default function ModulesContainer(){
    const {modules,lessons, setModules} = useCourseContentStore();

 
    
    return(
        <div className="mt-8 md:max-w-[45vw]">
            <Reorder.Group axis="y" values={modules} onReorder={setModules}>
                {modules.map((module) => (
                <Reorder.Item key={module.id} value={module}>
                    <Accordion type="single" collapsible defaultValue="item-1">
                        <AccordionItem value={module.id.toString()} className="border-b px-4 last:border-b-0">
                            <AccordionTrigger>{module.title}</AccordionTrigger>
                            <AccordionContent className="flex flex-col">
                            Yes. It adheres to the WAI-ARIA design pattern.
                           
                            <Button onClick={()=>{console.log("inner button working")}}> Add Lesson</Button>
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                </Reorder.Item>
                ))}
            </Reorder.Group>
            
        </div>
    )
}