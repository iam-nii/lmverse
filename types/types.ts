import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export type MenuItemId = 'Dashboard' | 'Courses' |'Teachers' | 'Settings' ; 


export interface SidebaeProps{
    isOpen: boolean;
    onToggle: ()=> void;
    selectedItem: MenuItemId;
    onselect: (id: MenuItemId)=>void;
} 