const url = process.env.REACT_APP_URL;

async function fetchAPI(direction: string, method: string, data: {} | null) {
  let tokenStored: string | any = localStorage.getItem("auth");
  if (localStorage.getItem("auth")) {
    tokenStored = JSON.parse(tokenStored).token;
  }
  const response = await fetch(url + direction, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenStored}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data ? JSON.stringify(data) : null,
  });

  return response.json();
}

export default fetchAPI;
