export function convertDate(timestamp) {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } else {
      return "Date was not updated";
    }
  }