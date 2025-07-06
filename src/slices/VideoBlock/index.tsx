import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Boundry } from "@/components/boundry";
import { YouTubePlayer } from "./_components/YT-player";
import clsx from "clsx";
import Image from "next/image";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

const MASK_CLASSES =
  " [mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto] ";
/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Boundry
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Video reels</h2>
      <div className="aspect-video relative ">
        {/* mask */}
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute bg-brand-lime inset-0 ~translate-x-2/3 ~translate-y-2/3"
          )}
        />
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute bg-white inset-0 ~translate-x-1/3 ~translate-y-1/2"
          )}
        />
        <div
          className={clsx(
            MASK_CLASSES,
            "absolute bg-white inset-0 ~translate-x-1/2 ~-translate-y-1/3"
          )}
        />
        {/* video */}
        <div className={clsx(MASK_CLASSES, "relative h-full")}>
          {isFilled.keyText(slice.primary.youtube_video_id) && (
            <YouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          )}
        </div>
        {/* overlay */}
        <Image
          src="/image-texture.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-50"
        />
      </div>
    </Boundry>
  );
};

export default VideoBlock;
