import axios from "axios";

const BASE_URL = "https://transguideapi.runasp.net/api/Authorization";

/**
 * Get All Roles (Dashboard Data)
 */
export async function fetchAllRoles(token: string) {
  const response = await axios.get(`${BASE_URL}/GetAllRoles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

/**
 * Get Role By ID
 */
export async function fetchRoleById(roleId: string, token: string) {
  const response = await axios.get(`${BASE_URL}/GetRole`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { id: roleId },
  });
  return response.data;
}

/**
 * Add New Role
 */
export async function addRole(roleName: string, token: string) {
  const response = await axios.post(
    `${BASE_URL}/AddRole`,
    { roleName },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

/**
 * Edit Existing Role
 */
export async function editRole(id: number, name: string, token: string) {
  const response = await axios.put(
    `${BASE_URL}/EditRole`,
    { id, name },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

/**
 * Delete Role
 */
export async function deleteRole(roleId: number, token: string) {
  const response = await axios.delete(`${BASE_URL}/DeleteRole`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { id: roleId },
  });
  return response.data;
}

/**
 * Get All users (Dashboard Data)
 */
export async function fetchAllUsers(token: string) {
  const response = await axios.get(`${BASE_URL}/GetAllUsres`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
/**
 * Update User Roles
 */
export async function updateUserRoles(
  userId: number,
  roles: string[],
  token: string
) {
  const response = await axios.put(
    `${BASE_URL}/UpdateUserRoles`,
    { userId, roles },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}