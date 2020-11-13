export default class LoadBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.btn = document.querySelector(selector);
    refs.tag = refs.btn.querySelector('.tag');
    
    return refs;
  }

  enable() {
    this.refs.btn.disabled = false;
    this.refs.tag.textContent = 'Load more';
  }

  disable() {
    this.refs.btn.disabled = true;
    this.refs.tag.textContent = 'Wait...';
    
  }

  show() {
    this.refs.btn.classList.remove('is-hidden');
  }

  hide() {
    this.refs.btn.classList.add('is-hidden');
  }
}