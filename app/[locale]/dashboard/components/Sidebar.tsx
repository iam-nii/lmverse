import { Button } from "@/components/ui/button";
import { MenuItemId, SidebarProps } from "@/types/types";
import { LucideProps, Monitor, Users, Notebook, Settings, User } from "lucide-react";
import { ComponentType } from "react";

const menuItems: {id: MenuItemId, label: string, icon: ComponentType<LucideProps> }[] = [
    {id: 'dashboard', label: 'Dashboard',icon: Monitor},
    {id: 'courses', label: 'Courses', icon: Notebook},
    {id: 'teachers', label: 'Teachers', icon:Users},
    {id: 'settings', label: 'Settings', icon: Settings},
    {id: 'profile', label: 'Profile', icon: User},
];

export const Sidebar = ({
    isOpen, onToggle, selected, onSelect
}:SidebarProps)=>{

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
            <Button
            onClick={onToggle}
            > {isOpen ? <p>close</p>: <p>open</p>}</Button>
            <ul>
                {menuItems.map((item)=>(
                    <li
                    key={item.id}
                    onClick={()=> onSelect(item.id)}
                     style={{
              padding: '0.75rem 1rem',
              margin: '0.25rem 0',
              backgroundColor:
                selected === item.id ? '#3a3a5f' : 'transparent',
              borderRadius: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
                    >
                        <div className="flex">

                        {(()=>{
                            const Icon = item.icon;
                            return <Icon/>
                        })()}
                        {isOpen? item.label: item.label.slice(0,2)}
                        </div>

                    </li>

                ))}
            </ul>

        </aside>
    )
}