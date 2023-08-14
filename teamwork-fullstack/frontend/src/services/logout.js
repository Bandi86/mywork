import { readEntry } from "../repositories/crud";
import { logoutEndpoint } from "../repositories/apiEndPoints.js";

export default async function logout() {
  try {
    const response = await readEntry(`${logoutEndpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Logout failed", error);
  }
}
