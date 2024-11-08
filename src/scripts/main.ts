import Swiper from "swiper";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

const rooms = document.querySelectorAll(".swiper-room");
const roomsNav = document.getElementById("rooms-nav");
const root = document.documentElement;

const tabs = new Map<string, HTMLButtonElement>()

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
  entries.forEach(entry => {
    const room = (entry.target as HTMLElement).dataset.room as string
    if (!tabs.has(room)) {
      tabs.set(room, document.getElementById(room) as HTMLButtonElement)
    }
    tabs.get(room)?.classList.toggle("font-bold", entry.isIntersecting)
    if (room === "room-3") {
      root.classList.toggle("dark", entry.isIntersecting)
    }
  })
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
  observer.observe(room)
});
swiper.on("slideChange", ({ activeIndex }) => {
  roomsNav?.classList.toggle("opacity-0", activeIndex < 3);
});
