import { getAuthHeader } from "./admin";

const apiBaseUrl = "/api/media";

export const getMedia = async () => {
  const response = await fetch(apiBaseUrl, {
    headers: { ...getAuthHeader() },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch media");
  }
  return response.json();
};

export const renameMedia = async (
  oldPath: string,
  newName: string
): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${apiBaseUrl}/rename`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ oldPath, newName }),
  });
  const result = await response.json();
  return { ...result, success: response.ok };
};

export const changeMediaPath = async (
  oldPath: string,
  newPath: string
): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${apiBaseUrl}/change-path`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ oldPath, newPath }),
  });
  const result = await response.json();
  return { ...result, success: response.ok };
};

export const deleteMedia = async (
  path: string
): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${apiBaseUrl}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ path }),
  });
  const result = await response.json();
  return { ...result, success: response.ok };
};