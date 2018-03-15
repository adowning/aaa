import AuthGuard from "./auth-guard"

export default [
  {
    // Always leave this as last one
    path: "/",
    component: () => import("components/Login"),
  },
  {
    path: "/default",
    component: () => import("components/default"),
    children: [
      {
        path: "/profile",
        component: () => import("components/Profile"),
      },
      {
        path: "/liveview",
        component: () => import("components/LiveView"),
      },
      {
        path: "/directory",
        component: () => import("components/Directory"),
      },
      {
        path: "/hardware",
        component: () => import("components/hardware/Hardware"),
      },
    ],
  },

  {
    // Always leave this as last one
    path: "*",
    component: () => import("components/404"),
  },
]
