import { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export type MenuItemId = 'dashboard' | 'courses' |'teachers' | 'settings'| 'profile' | 'subscription' ; 


export interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selected: MenuItemId;          // current active menu item
  onSelect: (id: MenuItemId) => void; // callback when an item is clicked
}
export interface MainContentProps{
    selectedItem: MenuItemId;
}