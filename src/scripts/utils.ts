import type Swiper from "swiper";

type SlideRoomConfig = {
  room: string;
  slideIndices: number[];
};

export interface Slider extends HTMLElement {
  swiper: Swiper;
}

export const roomConfigs: SlideRoomConfig[] = [
  { room: "room-1", slideIndices: [0, 0, 0] },
  { room: "room-2", slideIndices: [-1, 0, 0] },
  { room: "room-3", slideIndices: [-1, -1, 0] },
];

export const getSlideIndex = (slider: Slider, index: number): number => {
  if (index === -1) {
    return slider.swiper.slides.length;
  }
  return index;
};
