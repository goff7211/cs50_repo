type Props =
  | { type: "youtube"; youtubeId: string }
  | { type: "file"; src: string };

export default function VideoPlayer(props: Props) {
  if (props.type === "youtube") {
    const url = `https://www.youtube-nocookie.com/embed/${props.youtubeId}`;
    return (
      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={url}
          title="Lesson video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video className="w-full rounded-lg" controls>
      <source src={props.src} />
      Your browser does not support the video tag.
    </video>
  );
}