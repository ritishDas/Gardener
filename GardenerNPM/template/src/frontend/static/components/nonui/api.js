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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res
  }
  catch (err) {
    console.error('Fetch Error:', err);
    
    // Import and display error using gardenerError
    import('../gardener/errorBox.js')
      .then(({ gardenerError }) => {
        gardenerError(err.message || 'Network request failed');
      })
      .catch(() => {
        console.error('Error component not available:', err.message);
      });
    
    throw err;
  }
}
