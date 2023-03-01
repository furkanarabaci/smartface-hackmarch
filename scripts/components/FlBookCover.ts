import Image from '@smartface/native/ui/image';
import FlBookCoverDesign from 'generated/my-components/FlBookCover';

export default class FlBookCover extends FlBookCoverDesign {
  pageName?: string | undefined;
  private placeholder: Image;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
    this.placeholder = this.imgBookCover.image as Image; //Use placeholder as current image
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
        placeholder: this.placeholder,
        fade: false,
        onSuccess: () => {
          this.indicator.style.apply({ visible: false })
        }
      })
    }
  }
}
