const baseName = '';

export async function Fetch(
  path,
  body,
  method = 'POST'
) {

  try {

    const headers = {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": 'true'
      // "Authorization": 'Bearer ' + auth
    }
    let res;
    if (method === 'GET' || method === 'DELETE')
      res = await fetch(baseName + path, {
        credentials: "include",
        headers: headers,
        method,
      });

    else
      res = await fetch(baseName + path, {
        credentials: "include",
        headers: headers,
        method,
        body: JSON.stringify(body),
      });



    return res
  }
  catch (err) {
    console.log(err)
  }
}
