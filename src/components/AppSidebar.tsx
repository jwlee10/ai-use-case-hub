import {
  Home,
  ThumbsUp,
  Sparkles,
  Trophy,
  MessageCircleQuestion,
  BookOpen,
  CalendarDays,
  Newspaper,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const useCaseItems = [
  { title: "All Use Cases", url: "/", icon: Home },
  { title: "Liked Use Cases", url: "/liked", icon: ThumbsUp },
  { title: "My Use Cases", url: "/my-use-cases", icon: Sparkles },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

const platformItems = [
  { title: "Office Hour", url: "/office-hour", icon: MessageCircleQuestion },
  { title: "Learning Lab", url: "/learning-lab", icon: BookOpen },
  { title: "Event Calendar", url: "/event-calendar", icon: CalendarDays },
  { title: "Newsletter", url: "/newsletter", icon: Newspaper },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <span className="font-heading text-lg font-bold text-primary">
          AI Hub
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-ui text-[10px] font-semibold tracking-widest text-muted-foreground">
            USE CASE LIBRARY
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {useCaseItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="font-ui text-[10px] font-semibold tracking-widest text-muted-foreground">
            PLATFORM
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
