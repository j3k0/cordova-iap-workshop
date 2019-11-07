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
    const content = () => {
      if (!state.ready) {
        return '<p>Please wait...<p>';
      }
      const store = window.store;
      const subscriptions = store.products.filter(p => p.type === store.PAID_SUBSCRIPTION);
      const owned = subscriptions.find(p => p.state === store.OWNED);
      const approved = subscriptions.find(p => p.state === store.APPROVED);
      if (!owned && !approved) {
        return '<p>You are not a subscriber. Please visit the Store screen.</p>';
      }
      if (!owned && approved) {
        return '<p>Please wait... Updating the status of your subscription.</p>';
      }
      const purchaseDate = owned.purchaseDate &&
        `<p>Since:<br/>${owned.purchaseDate.toLocaleString()}`;
      const expiryDate = owned.expiryDate &&
        `<p>Expires:<br/>${owned.expiryDate.toLocaleString()}`;
      const lastRenewalDate = owned.lastRenewalDate &&
        `<p>Renewed:<br/>${owned.lastRenewalDate.toLocaleString()}`;
      const lapse = owned.renewalIntent === 'Lapse' &&
        '<p>WARNING:<br/>Your subscription will not auto-renew!</p>';
      const renew = owned.renewalIntent === 'Renew' &&
        '<p>INFO:<br/>Your subscription will auto-renew at the end of the period.</p>';
      return `
        <div class="container">
          <div class="row">
            <p>You are subscribed to "${owned.title || owned.id}".</p>
            ${purchaseDate || ''}
            ${expiryDate || ''}
            ${lastRenewalDate || ''}
            ${lapse || renew || ''}
          </div>
        </div>`;
    };
    const restorePurchase = () => `
      <div class="container">
        <div class="row">
        ` + button('Restore Purchases', 'store.refresh()') + `
        </div>
      </div>`;
    return layout('Account', content() + restorePurchase() + button('Back to Home', "openPage('home')"));
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
        const tags = () => {
          if (product.owned) return '<p>OWNED</p>';
          return '';
        };
        const purchaseButton = () => {
          if (!product.canPurchase) return '';
          return button(product.price, `order('${product.id}')`);
        };
        return `
          <div class="row">
            <h3>${product.title}</h3>
            ${tags()}
            <p>${product.description}</p>
            <p>${purchaseButton()}</p>
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
  store.validator = "https://validator.fovea.cc/v1/validate?appName=ccfoveapurchasedemo&apiKey=ac2c0661-7871-49a9-b7b2-4bdc3c93a2eb";
  store.register(products);
  store.when()
    .updated(render)
    .approved(p => p.verify())
    .verified(p => p.finish());
  store.ready(() => setState({ ready: true }));
  store.refresh();
  window.order = (productId) => {
    store.order(productId);
  };
});
