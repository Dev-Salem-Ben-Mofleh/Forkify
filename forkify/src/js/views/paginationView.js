import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _curPage;
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (this._curPage === 1 && numPages > 1) {
      return this._generatMarkupPaginationLeft();
    }

    if (this._curPage === numPages && numPages > 1) {
      return this._generatMarkupPaginationRight();
    }

    if (this._curPage < numPages) {
      return (
        this._generatMarkupPaginationLeft() +
        this._generatMarkupPaginationRight()
      );
    }

    return '';
  }
  _generatMarkupPaginationLeft() {
    return `<button data-goto="${
      this._curPage + 1
    }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  _generatMarkupPaginationRight() {
    return `<button data-goto="${
      this._curPage - 1
    }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._curPage - 1}</span>
          </button>`;
  }
}
export default new PaginationView();
