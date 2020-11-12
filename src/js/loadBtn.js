export default class LoadBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.tag = refs.btn.querySelector('.tag');
    // refs.spinner = refs.btn.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.btn.disabled = false;
    this.refs.tag.textContent = 'Load more';
    // this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.btn.disabled = true;
    this.refs.tag.textContent = 'Wait...';
    // this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.btn.classList.remove('is-hidden');
  }

  hide() {
    this.refs.btn.classList.add('is-hidden');
  }
}