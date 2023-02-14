import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactElement;
};

export function LoggedUserProtactedGuard({ children }: Props): any {
  if (sessionStorage.getItem("Access")) {
    return <Navigate to={"/admin"} />;
  } else {
    return children;
  }
}

export function RouteGuard({ children }: Props): any {
  if (sessionStorage.getItem("Access")) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export function RouteAdminGuard({ children }: Props): any {
  const User: any = sessionStorage.getItem("User");
  if (User) {
    if (JSON.parse(User).role === "SuperAdmin") {
      return children;
    } else return <Navigate to={"/admin"}></Navigate>;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
}

export function RouteSchoolGuard({ children }: Props): any {
  const User: any = sessionStorage.getItem("User");
  if (User) {
    if (
      JSON.parse(User).role === "SuperAdmin" ||
      JSON.parse(User).role === "SchoolAdmin"
    ) {
      return children;
    } else return <Navigate to={"/admin"}></Navigate>;
  } else {
    return <Navigate to={"/"}></Navigate>;
  }
}
