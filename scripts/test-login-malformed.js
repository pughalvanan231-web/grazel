(async () => {
  const url = 'http://localhost:3001/api/auth/login';
  const cases = [
    {
      name: 'valid-json',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@grazel.com', password: 'admin123' }),
    },
    {
      name: 'invalid-json-bad-syntax',
      headers: { 'Content-Type': 'application/json' },
      // missing quotes around keys -> invalid JSON
      body: "{email: 'admin@grazel.com', password: 'admin123'}",
    },
    {
      name: 'missing-content-type',
      headers: {},
      body: JSON.stringify({ email: 'admin@grazel.com', password: 'admin123' }),
    },
    {
      name: 'form-urlencoded',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'email=admin@grazel.com&password=admin123',
    },
    {
      name: 'empty-body-with-json-header',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    }
  ];

  for (const c of cases) {
    try {
      console.log(`\n---- CASE: ${c.name} ----`);
      const res = await fetch(url, { method: 'POST', headers: c.headers, body: c.body });
      const text = await res.text();
      console.log('STATUS', res.status);
      console.log('BODY', text);
    } catch (err) {
      console.error('Request failed:', err);
    }
  }
})();
