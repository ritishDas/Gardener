async function postFetch(path, body) {
  try {
    const data = await fetch(path, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return await data.json();
  }
  catch (err) {
    console.error('error while requesting', err);
  }
}

export async function userlogin(email, password) {
  const result = await postFetch('/login', { email, password });
  console.log(result);
}
