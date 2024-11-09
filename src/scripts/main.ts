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

const mobileMenu = document.getElementById("mobile-menu");
const rooms = document.querySelectorAll(".swiper-room");
const roomsNav = document.getElementById("rooms-nav");
const root = document.documentElement;
const roomsAnchor = Array.from(document.querySelectorAll(".js-room-anchor"));

const tabs = new Map<string, HTMLButtonElement>();

const swiper = new Swiper(".swiper-root", options);

// Handle room navigation from navbar menu
if (location.hash) {
  console.log();

  const room = location.hash.slice(-1);
  if (!Number.isNaN(room)) {
    // Note this is hacky, but it does the job
    const slide = +room + 2;
    swiper.slideTo(slide);
    closeMenuAfterNavigation()
  }
}

const roomsObserverCallback: IntersectionObserverCallback = (entries) => {
  entries.forEach((entry) => {
    const roomId = (entry.target as HTMLElement).id;
    if (!tabs.has(roomId)) {
      const selector = `[data-room=${roomId}]`;
      tabs.set(roomId, roomsNav?.querySelector(selector) as HTMLButtonElement);
    }
    tabs.get(roomId)?.classList.toggle("font-bold", entry.isIntersecting);
    if (roomId === "room-3") {
      root.classList.toggle("dark", entry.isIntersecting);
    }
    // Handle rooms nav visibility on external navigation
    if (entry.isIntersecting && roomsNav?.className.includes("opacity-0")) {
      roomsNav.classList.remove("opacity-0");
    }
  });
};

const observer = new IntersectionObserver(roomsObserverCallback, {
  threshold: 0.1,
});

rooms.forEach((room) => {
  const swiper = new Swiper(room as HTMLElement, {
    ...options,
    nested: true,
    pagination: {
      el: ".room-pagination",
      type: "custom",
      renderCustom(_, current, total) {
        if (current === 1) {
          return "<span>&nbsp;</span>";
        }
        return `<span>${current - 1}</span> / <span>${total - 1}</span>`;
      },
    },
  });
  const roomHeader = room.querySelector(".js-room-header");
  swiper.on("slideChangeTransitionStart", (s) => {
    roomHeader?.classList.toggle("opacity-0", s.activeIndex < 1);
  });
  observer.observe(room);
  // swipers.set(room.id, swiper)
});

roomsAnchor.forEach((el) => {
  el.addEventListener("click", () => {
    const slide = (el as HTMLElement).dataset.slide as string;
    swiper.slideTo(+slide);
    closeMenuAfterNavigation()
  });
});

swiper.on("slideChange", ({ activeIndex, realIndex }) => {
  roomsNav?.classList.toggle("opacity-0", activeIndex < 3);
});

window.addEventListener('popstate', function (e) {
  closeMenuAfterNavigation()
})

function closeMenuAfterNavigation() {
  if (!mobileMenu?.className.includes("hidden")) {
    mobileMenu?.classList.add("hidden");
  }
}
