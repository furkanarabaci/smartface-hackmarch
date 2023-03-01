import GviBookCoverDesign from 'generated/my-components/GviBookCover';

export default class GviBookCover extends GviBookCoverDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
