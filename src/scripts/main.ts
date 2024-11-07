import Swiper from "swiper";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

const options: SwiperOptions = {
  modules: [Mousewheel, Keyboard, Pagination],
  direction: "horizontal",
  loop: false,
  speed: 500,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  keyboard: {
    enabled: true,
  },
};

// const roomsNav = document.getElementById("rooms-nav");

const swiper = new Swiper(".swiper-root", options);

console.log("hola?");

const _ = new Swiper("#first-room", {
  ...options,
  nested: true
  // pagination: {
  //   el: ".swiper-pagination",
  //   type: "custom",
  //   renderCustom(swiper, current, total) {
  //     if (current === 1) {
  //         return ''
  //     }

  //     return `<span>${current -1 }</span> / <span>${total - 1}</span>`
  //   },
  // },
});

console.log(_);


// swiper.on("slideChange", (s) => {
//   roomsNav?.classList.toggle("opacity-0", s.activeIndex < 3);
// });
