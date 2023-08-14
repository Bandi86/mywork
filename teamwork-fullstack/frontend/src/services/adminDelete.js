export default async function handleDelete(removeEntry, endpoint, id, adminRefresh, setAdminRefresh) {
  try {
    const response = await removeEntry({
      url: `${endpoint}/${id}`,
    });

    if (response) {
      const data = await response.json();
      if (data.success) {
        console.log("Element deleted successfully!");
      } else {
        console.error("Failed to delete element:", data.error);
      }
    } else {
      console.error("Failed to delete element. Server returned null or undefined response.");
    }
    setAdminRefresh(!adminRefresh)
  } catch (error) {
    console.error("An error occurred during the delete request:", error);
  }
}