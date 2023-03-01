import InprogressDesign from 'generated/pages/inprogress';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import { themeService } from 'theme';
import GviBookCover from 'components/GviBookCover';
import { Book, OpenLibraryService } from 'service';

// const GviBookCoverStyle = themeService.getNativeStyle('.gviBookCover');

export default class Inprogress extends withDismissAndBackButton(InprogressDesign) {
  inprogressbooks: Book[] = [];
  nextupbooks: Book[] = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initBackButton(this.router); //Addes a back button to the page headerbar.
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initInProgress();
    this.initNextUp();
    this.getInProgressData();
    this.getNextUpData();
  }

  initInProgress() {
    this.gvInProgress.itemCount = 4;
    this.gvInProgress.onItemBind = (item: GviBookCover, index: number) => {
      const currentBook = this.inprogressbooks[index] || { coverUrl: '' };
      item.flBookCover1.setImageUrl(currentBook.coverUrl);
    }
    this.gvInProgress.onItemSelected = (item: GviBookCover, index: number) => {
      const currentBook = this.inprogressbooks[index];
      if (currentBook) {
        this.router.push('detail', currentBook)
      }
    }
  }

  initNextUp() {
    this.gvNextUp.itemCount = 4;
    this.gvNextUp.onItemBind = (item: GviBookCover, index: number) => {
      const currentBook = this.nextupbooks[index] || { coverUrl: '' };
      item.flBookCover1.setImageUrl(currentBook.coverUrl);
    }
    this.gvNextUp.onItemSelected = (item: GviBookCover, index: number) => {
      const currentBook = this.nextupbooks[index];
      if (currentBook) {
        this.router.push('detail', currentBook)
      }
    }
  }

  async getInProgressData() {
    const response = await OpenLibraryService.getNextUpBooks();
    this.inprogressbooks = response.docs;
    this.gvInProgress.itemCount = this.inprogressbooks.length;
    this.gvInProgress.refreshData();
  }

  async getNextUpData() {
    const response = await OpenLibraryService.getNextUpBooks('a', 2);
    this.nextupbooks = response.docs;
    this.gvNextUp.itemCount = this.nextupbooks.length;
    this.gvNextUp.refreshData();
  }
}
