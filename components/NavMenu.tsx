import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIntlayer, useLocale } from "next-intlayer";
import Link from "next/link";
import { Button } from "./ui/button";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitch from "./ThemeSwitch";

function NavMenu() {
  const { locale } = useLocale();
  const navMenu = useIntlayer("navMenu");

  const courses = useIntlayer("courses");

  const buttons = useIntlayer("buttons");

  const engCourses = [
    {
      title: courses.genEng.label,
      href: courses.genEng.href.value,
      description: courses.genEng.description.value,
    },
    {
      title: courses.businessEng.label,
      href: courses.businessEng.href.value,
      description: courses.businessEng.description.value,
    },
    {
      title: courses.techEng.label,
      href: courses.techEng.href.value,
      description: courses.techEng.description.value,
    },
    {
      title: courses.intExams.label,
      href: courses.intExams.href.value,
      description: courses.intExams.description.value,
    },
    {
      title: courses.rusExam.label,
      href: courses.rusExam.href.value,
      description: courses.rusExam.description.value,
    },
  ];
  return (
    <nav className="hidden md:flex font-medium">
      <NavigationMenu>
        <NavigationMenuList className="">
          {/* Home */}
          <NavigationMenuItem className="">
            <NavigationMenuLink asChild className="">
              <Link href={`/${locale}${navMenu.home.href.value}`} className="">
                <p className="text-lg text-secondary">{navMenu.home.label}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* Courses */}
          <NavigationMenuItem className="font-semibold">
            <NavigationMenuTrigger className="bg-transparent">
              <p className="text-lg font-medium">{navMenu.courses.label}</p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {engCourses.map((course) => (
                  <ListItem
                    key={course.title.value}
                    title={course.title.value}
                    href={`/${locale}${course.href}`}
                  >
                    {course.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Dashboard */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${locale}${navMenu.dashboard.href.value}`}>
                <p className="text-lg">{navMenu.dashboard.label}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Blogs */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${locale}${navMenu.work.href.value}`}>
                <p className="text-lg">{navMenu.work.label}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Contact us */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${locale}${navMenu.contactUs.href.value}`}>
                <p className="text-lg ">{navMenu.contactUs.label}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-2">
        <ThemeSwitch />
        <LocaleSwitcher />
        <Link href={`/${locale}/login`}>
          <Button className="bg-primary hover:bg-primary/90 transition-colors text-white rounded-full">
            <p>{buttons.signIn}</p>
          </Button>
        </Link>
        <Link href={`/${locale}/signup`}>
          <Button className="bg-secondary hover:bg-secondary/90 transition-colors text-white rounded-full">
            {buttons.register}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props} className="list-none">
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
export default NavMenu;
