import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { RESULTS_PER_PAGE } from '../config.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandleClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goTo;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    ); //Math.ceil to round

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'next');
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'prev');
    }

    // Other page
    if (currentPage < numPages) {
      return `${this._generateMarkupButton(
        currentPage,
        'prev'
      )}${this._generateMarkupButton(currentPage, 'next')}`;
    }

    // Page 1, and there are no other pages
    return '';
  }
  _generateMarkupButton(currentPage, type) {
    return `
    <button data-go-to="${
      type === 'next' ? currentPage + 1 : currentPage - 1
    }" class="btn--inline pagination__btn--${type}">
      <span>Page ${type === 'next' ? currentPage + 1 : currentPage - 1}</span>
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
      </svg>
    </button>`;
  }
}

export default new PaginationView();
