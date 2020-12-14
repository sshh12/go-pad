const path = window.location.pathname;
const routes = JSON.parse(localStorage.getItem('go:routes'));
if (!routes) {
  localStorage.setItem('go:routes', '{}');
  window.location.reload();
}
routes['/'] = null;
routes['/edit'] = null;
window.set = (value) => {
  localStorage.setItem(
    'go:routes',
    JSON.stringify({ ...routes, [path]: value })
  );
  window.location.reload();
};
window.del = (key) => {
  delete routes[key];
  localStorage.setItem('go:routes', JSON.stringify(routes));
  window.location.reload();
};
window.push = async (code) => {
  await fetch('/push/' + code, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(routes)
  });
  console.log('pushed.');
};
window.pull = async (code) => {
  let resp = await fetch('/pull/' + code);
  let data = await resp.json();
  console.log(data);
  localStorage.setItem('go:routes', JSON.stringify(data));
  window.location.reload();
};
console.log('set(val)');
console.log('del(key)');
console.log('push(name)');
console.log('pull(name)');
let opts = routes[path] || null;
if (opts) {
  if (typeof opts === 'string') {
    opts = [opts];
  }
  if (Array.isArray(opts)) {
    for (let i = 0; i < opts.length - 1; i++) {
      window.open(opts[i], '_blank');
    }
    window.location = opts[opts.length - 1];
  }
}
window.onload = () => {
  let display = document.getElementById('links');
  let paths = Object.keys(routes);
  paths.sort();
  display.innerHTML = paths
    .map((path) => {
      return `<li><b>${path}</b></li>`;
    })
    .join('');
};
