async function fetchLogin(email: any, pass: any) {
  const fetchData: any = {
    method: "POST",
    mode: "cors",
    cache: "default",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  };

  return await fetch(`${process.env.REACT_APP_LOCAL_URL}/login`, fetchData)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

export default fetchLogin;
