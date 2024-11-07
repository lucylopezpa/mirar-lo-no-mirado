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

const observer = new IntersectionObserver((entries, observer) => {
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
  new Swiper(room as HTMLElement, {
    ...options,
    nested: true,
    pagination: {
      el: ".room-pagination",
      type: "custom",
      renderCustom(swiper, current, total) {
        if (current === 1) {
            return ''
        }

        return `<span>${current -1 }</span> / <span>${total - 1}</span>`
      },
    },
  });
  if (room.id === 'third-room') {
    observer.observe(room)
  }
});


swiper.on("slideChange", (s) => {
  roomsNav?.classList.toggle("opacity-0", s.activeIndex < 3);
});
