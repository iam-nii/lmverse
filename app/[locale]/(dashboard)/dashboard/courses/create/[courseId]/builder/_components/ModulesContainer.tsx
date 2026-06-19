import { useCourseContentStore } from "@/store/courses/CourseContentStore"
import { Reorder } from "framer-motion";
import { useState } from "react";



export default function ModulesContainer(){
    const {modules, setModules} = useCourseContentStore();
    // const [items, setItems] = useState([0, 1, 2, 3])

 
    
    return(
        <div>
            <Reorder.Group axis="y" values={modules} onReorder={setModules}>
                {modules.map((module) => (
                <Reorder.Item key={module.id} value={module}>
                    {module.title}
                </Reorder.Item>
                ))}
            </Reorder.Group>
            {/* <ul>
            {
            modules && modules.map((module, index)=>(
                <li data-swapy-slot={module.id}>
                    <div id={module.id.toString()} data-swapy-item={module.id}>
                        <div>{module.title}</div>
                    </div>
                </li>

                ))
                
            }
            </ul> */}
        </div>
    )
}