import { MenuType, RouteInfo } from './header.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '',         title: 'Angular2 Bootstrap4 Navbar',  menuType: MenuType.BRAND },
  { path: 'about',    title: 'About Us',                    menuType: MenuType.RIGHT },
  { path: 'contact',  title: 'Contact',                     menuType: MenuType.RIGHT }
];
