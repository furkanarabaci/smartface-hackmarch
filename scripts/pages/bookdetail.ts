import BookdetailDesign from 'generated/pages/bookdetail';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { Book } from 'service';

export default class Bookdetail extends withDismissAndBackButton(BookdetailDesign) {
  book: Book;
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.book = this.route.getState().routeData
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
    this.headerBar.title = this.book.title;
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }
}
