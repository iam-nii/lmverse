import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";
import LocaleSwitcher from "../LocaleSwitcher";
import ThemeSwitch from "../ThemeSwitch";

function NavMenu() {
  const locale = useLocale();
  const tNav = useTranslations("navMenu");
  const tCourses = useTranslations("courses");
  const tButtons = useTranslations("buttons");

  const engCourses = [
    {
      title: tCourses("genEng.label"),
      href: tCourses("genEng.href"),
      description: tCourses("genEng.description"),
    },
    {
      title: tCourses("businessEng.label"),
      href: tCourses("businessEng.href"),
      description: tCourses("businessEng.description"),
    },
    {
      title: tCourses("techEng.label"),
      href: tCourses("techEng.href"),
      description: tCourses("techEng.description"),
    },
    {
      title: tCourses("intExams.label"),
      href: tCourses("intExams.href"),
      description: tCourses("intExams.description"),
    },
    {
      title: tCourses("rusExam.label"),
      href: tCourses("rusExam.href"),
      description: tCourses("rusExam.description"),
    },
  ];
  return (
    <nav className="hidden md:flex font-medium">
      <NavigationMenu>
        <NavigationMenuList className="">
          {/* Home */}
          <NavigationMenuItem className="">
            <NavigationMenuLink asChild className="">
              <Link href={`/${locale}${tNav("home.href")}`} className="">
                <p className="text-lg text-secondary">{tNav("home.label")}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* Courses */}
          <NavigationMenuItem className="font-semibold">
            <NavigationMenuTrigger className="bg-transparent">
              <p className="text-lg font-medium">{tNav("courses.label")}</p>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {engCourses.map((course) => (
                  <ListItem
                    key={course.title}
                    title={course.title}
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
              <Link href={`/${locale}${tNav("dashboard.href")}`}>
                <p className="text-lg">{tNav("dashboard.label")}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Blogs */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${locale}${tNav("work.href")}`}>
                <p className="text-lg">{tNav("work.label")}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Contact us */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href={`/${locale}${tNav("contactUs.href")}`}>
                <p className="text-lg ">{tNav("contactUs.label")}</p>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-2">
        <ThemeSwitch />
        <LocaleSwitcher />
        <Link href={`/${locale}/login`}>
          <Button className="bg-primary hover:bg-primary/90 transition-colors rounded-full cursor-pointer">
            <p>{tButtons("signIn")}</p>
          </Button>
        </Link>
        <Link href={`/${locale}/signup`}>
          <Button className="bg-blue-500 cursor-pointer hover:bg-blue-400 border-border border  rounded-full">
            {tButtons("register")}
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
