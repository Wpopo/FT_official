const Helper = {
  // <768px
  isXsScreen: () => {
    return window.innerWidth < 768;
  },
  // (≥768px)
  isSmScreen: () => {
    return window.innerWidth >= 768;
  },
  // (>=1024px)
  isXlScreen: () => {
    return window.innerWidth >= 1024;
  },
  // for Event 自訂(>=1200px)
  isXXlScreen: () => {
    return window.innerWidth >= 1200;
  },
  // 滾動事件
  scroll: hash => {
    if (hash !== "" || hash !== undefined) {
      const element = document.getElementById(hash);
      if (element === null) return;
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 70,
          behavior: "smooth"
        });
      }, 0);
    }
  },

  // 滾輪致頂
  scrollToTop: () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 0);
  }
};

export default Helper;
