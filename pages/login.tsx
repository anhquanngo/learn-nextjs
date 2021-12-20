import { authApi } from "@/api_client/auth-api";
import * as React from "react";

export default function LoginPage() {
  async function handelLoginClick() {
    try {
      await authApi.login({
        username: "test1",
        password: "123456",
      });
    } catch (error) {
      console.log("failed to login", error);
    }
  }
  async function handelGetProfileClick() {
    try {
      await authApi.getProfile();
    } catch (error) {
      console.log("failed to get profile", error);
    }
  }
  async function handelLogoutClick() {
    try {
      await authApi.logout();
    } catch (error) {
      console.log("failed to logout", error);
    }
  }
  return (
    <div>
      <h1>Login page</h1>

      <button onClick={handelLoginClick}>Login</button>
      <button onClick={handelGetProfileClick}>Get Profile</button>
      <button onClick={handelLogoutClick}>Logout</button>
    </div>
  );
}
