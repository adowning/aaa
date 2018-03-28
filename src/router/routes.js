import AuthGuard from "./auth-guard";

export default [
  {
    // Always leave this as last one
    path: "/",
    component: () => import("components/Login")
  },
  {
    // Always leave this as last one
    path: "/logout",
    component: () => import("components/Logout")
  },
  {
    path: "/default",
    component: () => import("components/default"),
    children: [
      {
        path: "/profile",
        component: () => import("components/Profile")
      },
      {
        path: "/liveview",
        component: () => import("components/liveview/LiveView")
      },
      {
        path: "/schedule",
        component: () => import("components/Schedule")
      },

      {
        path: "/directory",
        component: () => import("components/Directory")
      },
      {
        path: "/hardware",
        component: () => import("components/hardware/Hardware")
      },
      {
        path: "/consumables",
        component: () => import("components/Consumables")
      },
      {
        path: "/logs",
        component: () => import("components/Logs")
      }
    ]
  },

  {
    // Always leave this as last one
    path: "*",
    component: () => import("components/404")
  }
];
