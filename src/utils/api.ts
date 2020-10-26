export async function callApi(method: string, path: string, data?: any) {
    const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/${path}`, {
      method,
      headers: {
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
  }