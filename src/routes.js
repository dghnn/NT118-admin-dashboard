// routes/index.js
import Dashboard from "layouts/dashboard";
import MovieManager from "layouts/movie-manager";
import Customer from "layouts/user-manager";
import Ticket from "layouts/ticket-manager";
import SignIn from "layouts/sign-in";
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    icon: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    private: true,
  },
  {
    type: "collapse",
    name: "Movies",
    icon: "theaters",
    route: "/movie-manager",
    component: <MovieManager />,
    private: true,
  },
  {
    type: "collapse",
    name: "Customer",
    icon: "groups",
    route: "/user-loyalty",
    component: <Customer />,
    private: true,
  },
  {
    type: "collapse",
    name: "Tickets",
    icon: "confirmation_number",
    route: "/ticket-manager",
    component: <Ticket />,
    private: true,
  },
  {
    type: "collapse",
    name: "Log Out",
    icon: "logout",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
