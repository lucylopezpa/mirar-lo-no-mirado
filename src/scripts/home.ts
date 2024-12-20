import queryString from "query-string";
import Swiper from "swiper";
import { Mousewheel, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { getSlideIndex, roomConfigs, type Slider } from "./utils";

const root = document.documentElement;
const swiperRoot = document.querySelector<HTMLDivElement>(".swiper-root")!;
const navbar = document.getElementById("navbar")!;
const rooms = document.querySelectorAll<HTMLElement>(".swiper-room");
const roomsNav = document.getElementById("rooms-nav")!;
const next = document.querySelectorAll("button.next");
const roomsAnchor = Array.from(document.querySelectorAll(".js-room-anchor"));

const tabs = new Map<string, HTMLButtonElement>();

const swiperRootHeight =
  root.offsetHeight - navbar?.offsetHeight - roomsNav.offsetHeight;

swiperRoot.style.height = swiperRootHeight + 'px';

const options: SwiperOptions = {
  modules: [Mousewheel, Pagination],
  direction: "horizontal",
  loop: false,
  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },
  height: swiperRootHeight,
  autoHeight: false,
  // cssMode: true,
};

const swiper = new Swiper(".swiper-root", options);

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
  const roomHeader = room.querySelector(".js-room-header");
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

  swiper.on("slideChange", (s) => {
    roomHeader?.classList.toggle("opacity-0", s.activeIndex < 1);
  });

  observer.observe(room);
});

const handleRoomNavigation = (room: string, slide: number) => {
  const config = roomConfigs.find((config) => config.room === room);

  swiper.slideTo(slide, 0);

  if (config) {
    config.slideIndices.forEach((index, idx) => {
      const slider = rooms[idx] as Slider;
      slider.swiper.slideTo(getSlideIndex(slider, index), 0);
    });
  }
};

roomsAnchor.forEach((el) => {
  el.addEventListener("click", () => {
    const slide = (el as HTMLElement).dataset.slide as string;
    const room = (el as HTMLElement).dataset.room as string;
    handleRoomNavigation(room, +slide);
  });
});

swiper.on("slideChange", ({ activeIndex }) => {
  roomsNav?.classList.toggle("opacity-0", activeIndex < 3);
});

next.forEach((button) => {
  button.addEventListener("click", () => {
    swiper.slideNext(0);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const search = queryString.parse(location.search);

  // Handle room navigation from navbar menu
  if (search.room) {
    const room = `room-${search.room}`;
    // Note this is hacky, but it does the job
    const slide = +search.room + 2;
    handleRoomNavigation(room, slide);
  }
});
