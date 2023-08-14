import { updateEntry } from "../repositories/crud";

export default async function submitEdit(
  data,
  url,
  successMessage,
  failureMessage,
  adminRefresh,
  setAdminRefresh,
  toast
) {
  try {
    const response = await updateEntry(data, url);
    const responseData = await response.json();
    setAdminRefresh(!adminRefresh);

    if (responseData.success) {
      toast.success(successMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(failureMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return responseData;
  } catch (error) {
    toast.error("Failed to submit:", {
      position: toast.POSITION.TOP_RIGHT,
    });
    throw error;
  }
}
