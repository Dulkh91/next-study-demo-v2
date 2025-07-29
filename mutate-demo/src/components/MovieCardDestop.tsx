import Image from "next/image";
import DeleteBtn from "./DeleteBtn";
type Props = {
  src: string;
  title: string;
  releaseDate: string;
  overview: string;
  vote_average?: number;
  vote_count?: number;
  movieId?: string;
  deleteBtnId?: number;
};
const MovieCardDestop = ({
  src,
  title,
  releaseDate,
  overview,
  deleteBtnId
}: Props) => {
     return (
    <div className=" shadow max-w-[451px] relative" id="card_desktop">
      <div className=" flex gap-2">
        <div className="shrink-0 relative w-[183px] h-[281] ">
          <Image
            src={src}
            alt={title}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 183px, 183px"
          />
        </div>

        <div className="flex-row-1 m-3">
          <div>
            <h1 className="text-5 font-semibold mr-6">
              {title || "No title available"}
            </h1>
            <p className="text-gray-500 text-xs mb-2">
              {releaseDate || "Unknown date"}{" "}
            </p>

            <p className="text-xs mt-2 text-gray-700 line-clamp-6 text-wrap">
              {overview || "No description provided."}
            </p>

          </div>
        </div>
      </div>
      {/* Delete button for card */}
      <DeleteBtn id={String(deleteBtnId)}/>
    </div>
  );
}
 
export default MovieCardDestop;