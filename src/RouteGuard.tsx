import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactElement;
};

export function RouteGuard({ children }: Props): any {
  if (sessionStorage.getItem("Access")) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}

export function RouteAdminGuard({ children }: Props): any {
  const User: any = sessionStorage.getItem("User");
  if (JSON.parse(User).role === 0) {
    return children;
  } else return false;
}
