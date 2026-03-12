import { MenuItemId, SidebaeProps } from "@/types/types";
import { LucideProps, Monitor, Users, Notebook, Settings } from "lucide-react";
import { ComponentType } from "react";

const menuItems: {id: MenuItemId, label: string, icon: ComponentType<LucideProps> }[] = [
    {id: 'Dashboard', label: 'Dashboard',icon: Monitor},
    {id: 'Courses', label: 'Courses', icon: Notebook},
    {id: 'Teachers', label: 'Teachers', icon:Users},
    {id: 'Settings', label: 'Settings', icon: Settings},
];

export const Sidebar = ({
    isOpen, onToggle, selectedItem, onselect
}:SidebaeProps)=>{

    return (
        <aside
        style={{
        width: isOpen ? 240 : 60,
        transition: 'width 0.2s',
        backgroundColor: '#2C2C2C',
        border: '#fff',
        borderWidth: '0.5',
        color: '#fff',
        padding: '1rem 0.5rem',
        overflow: 'hidden',
      }}
        >
            <ul>
                {menuItems.map((item)=>(
                    <li
                    key={item.id}
                    onClick={()=> onselect(item.id)}
                    >
                        {/* <>{item.icon}</> */}
                        {isOpen? item.label: item.label.slice(0,2)}

                    </li>

                ))}
            </ul>

        </aside>
    )
}