const state = {
  page: null,
  ready: false,
  products: []
};

const setState = (attributes) => {
  Object.assign(state, attributes);
  render();
};

const render = () => {
  const html = pages[state.page]();
  const body = document.getElementsByTagName('body')[0];
  body.innerHTML = html;
};

const layout = (title, content) => {
  return `
    <div class="container" style="padding-top: 30px">
      <div class="row"><h1>${title}</h1></div>
      <div class="row">${content}</div>
    </div>`;
};

const button = (label, onclick) => `
  <button class="button" onclick="${onclick}">${label}</button>
`;

const pages = {
  home: () => {
    return layout('Home', `
      ${button('Account', "openPage('account')")}
      <br/>
      ${button('Store', "openPage('store')")}
    `);
  },
  account: () => {
    return layout('Account', button('Back to Home', "openPage('home')"));
  },
  store: () => {
    const content = () => {
      if (!state.ready) {
        return '<p>Please wait...<p>';
      }
      const html = state.products.map(({ id }) => {
        const product = window.store.get(id);
        if (!product) {
          return '<div class="row">...</div>';
        }
        return `
          <div class="row">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${button(product.price, '')}</p>
          </div>
        `;
      }).join('');
      return `<div class="container">${html}</div>`;
    };
    return layout('Store', content() + button('Back to Home', "openPage('home')"));
  }
};

const openPage = (page) => setState({ page });

openPage('home');

document.addEventListener('deviceready', () => {
  const store = window.store;
  const products = [{
    id: 'cc.fovea.purchase.subscription1',
    type: store.PAID_SUBSCRIPTION
  }, {
    id: 'cc.fovea.purchase.subscription2',
    type: store.PAID_SUBSCRIPTION
  }];
  setState({ products });
  store.verbosity = store.DEBUG;
  store.register(products);
  store.when().updated(render);
  store.ready(() => setState({ ready: true }));
  store.refresh();
});
