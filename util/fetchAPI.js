const fetchAPI = async (req, key, params) => {
  params = params || {};
  if (req) {
    // running inside nodejs server, retrieve directly from model
    // (via API middleware)
    const dev = process.env.NODE_ENV !== 'production';
    if (dev) {
      params = JSON.parse(JSON.stringify(params));
    }
    let data = await req.apiFactories[key](req, params);
    if (dev) {
      data = JSON.parse(JSON.stringify(data));
    }
    return data;
  } else {
    // running inside browser, retrieve using AJAX
    const fetchOptions = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(params),
      credentials: 'same-origin',
    };
    const url = `/api/${key}`;
    const res = await fetch(url, fetchOptions);
    if (res.status != 200) {
      throw new Error(`Failed to fetch ${url}: response status ${res.status}`);
    }
    const data = await res.json();
    return data;
  }
};

export default fetchAPI;
