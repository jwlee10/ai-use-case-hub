import {
  Home,
  ThumbsUp,
  Sparkles,
  Trophy,
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
  useSidebar,
} from "@/components/ui/sidebar";

const useCaseItems = [
  { title: "All Use Cases", url: "/", icon: Home },
  { title: "Liked Use Cases", url: "/liked", icon: ThumbsUp },
  { title: "My Use Cases", url: "/my-use-cases", icon: Sparkles },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="pt-2">
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
      </SidebarContent>
    </Sidebar>
  );
}
