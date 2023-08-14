function createEntry(data, url) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

function uploadEntry(data, url) {
  return fetch(url, {
    method: "POST",
    body: data,
    credentials: "include",
  });
}

function readEntry(url) {
  return fetch(url, {
    credentials: "include",
  });
}

function updateEntry(data, url) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
}

function removeEntry(data) {
  if (!data || !data.url) {
    return null;
  }

  return fetch(data.url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}




export { createEntry, readEntry, updateEntry, removeEntry, uploadEntry };
