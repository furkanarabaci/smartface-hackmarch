import Image from '@smartface/native/ui/image';
import FlBookCoverDesign from 'generated/my-components/FlBookCover';

export default class FlBookCover extends FlBookCoverDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
    this.indicator.visible = false; //This is fine since we don't have context here
  }

  setImageUrl(url: string) {
    if(url === '') {
      this.indicator.style.apply({visible: true });
    }
    else {
      this.indicator.style.apply({visible: true });
      this.imgBookCover.loadFromUrl({
        url,
        fade: false,
        onSuccess: () => {
          this.indicator.style.apply({ visible: false })
        }
      })
    }
  }
}
