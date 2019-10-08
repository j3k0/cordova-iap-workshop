const state = {
  page: null
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

const pages = {
  home: () => {
    return layout('Home', '<button class="button" onclick="openPage(\'account\')">Account</button>');
  },
  account: () => {
    return layout('Account', '<button class="button" onclick="openPage(\'home\')">Back to Home</button>');
  }
};

const openPage = (page) => setState({ page });

openPage('home');

document.addEventListener('deviceready', () => {
});
