import Dashboard from "layouts/dashboard";
import MovieManager from "layouts/movie-manager";
import Showtimes from "layouts/showtimes";
import CinemaManager from "layouts/cinemas";
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
    key: "dashboard",
  },
  {
    type: "collapse",
    name: "Movies",
    icon: "theaters",
    route: "/movie-manager",
    component: <MovieManager />,
    private: true,
    key: "movie-manager",
  },
  {
    type: "collapse",
    name: "Showtimes",
    icon: "event",
    route: "/showtimes",
    component: <Showtimes />,
    private: true,
    key: "showtimes",
  },
  {
    type: "collapse",
    name: "Cinemas",
    key: "cinema-manager",
    icon: <Icon fontSize="small">theaters</Icon>,
    route: "/cinemas",
    component: <CinemaManager />,
  },
  {
    type: "collapse",
    name: "Customers",
    icon: "groups",
    route: "/user-loyalty",
    component: <Customer />,
    private: true,
    key: "customer",
  },
  {
    type: "collapse",
    name: "Tickets",
    icon: "confirmation_number",
    route: "/ticket-manager",
    component: <Ticket />,
    private: true,
    key: "ticket-manager",
  },

  {
    type: "logout",
    name: "Logout",
    icon: "logout",
    key: "logout",
  },

  // Trang login
  {
    route: "/sign-in",
    component: <SignIn />,
    key: "sign-in",
  },
];

export default routes;
