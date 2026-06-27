import React from "react";

// 安全網：包住任何區塊。如果裡面出錯，只顯示一小塊提示，
// 不會讓整個網站變成「糟糕，發生了一些錯誤」白畫面。
export default class SafeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("SafeBlock caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      // 預設不顯示任何東西（讓該區塊安靜消失）；
      // 若有傳入 fallback 就顯示 fallback。
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}
