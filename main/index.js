async function UserSignIn(email, password) {
  if (email.length === 0 || password.length === 0) {
    return null;
  }

  try {
    const url = `http://localhost:7000/passwords/${email}/${password}`;
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const res = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await res.json();

    if (data.successfullyLoggedIn === true) {
      window.open("/home.html");
    } else {
      return window.alert("Password is wrong or email");
    }
  } catch (e) {
    window.alert("Network Error");
    throw new Error(e);
  }
}
