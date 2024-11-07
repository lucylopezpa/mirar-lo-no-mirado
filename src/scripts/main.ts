import Swiper from "swiper";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

const rooms = document.querySelectorAll(".swiper-room");
const roomsNav = document.getElementById("rooms-nav");
const root = document.documentElement;

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

const swiper = new Swiper(".swiper-root", options);

const observer = new IntersectionObserver((entries) => {
  const [entry] = entries
  if (entry.isIntersecting) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }

}, {
  threshold: 0.1
})

rooms.forEach((room) => {
  const swiper = new Swiper(room as HTMLElement, {
    ...options,
    nested: true,
    pagination: {
      el: ".room-pagination",
      type: "custom",
      renderCustom(_, current, total) {
        if (current === 1) {
          return '<span>&nbsp;</span>'
        }
        return `<span>${current - 1}</span> / <span>${total - 1}</span>`
      },
    },
  });
  const roomHeader = room.querySelector('.js-room-header')
  swiper.on('slideChangeTransitionStart', (s) => {
    roomHeader?.classList.toggle("opacity-0", s.activeIndex < 1);
  })
  if (room.id === 'third-room') {
    observer.observe(room)
  }
});


swiper.on("slideChange", (s) => {
  roomsNav?.classList.toggle("opacity-0", s.activeIndex < 3);
});
