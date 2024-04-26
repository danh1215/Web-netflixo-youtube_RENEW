import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import { IoMdCloudDownload } from "react-icons/io";
import Axios from "../Redux/APIs/Axios";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id);
};
 
// like movie functionalty
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favorites")
    : dispatch(
        likeMovieAction({
          movieId: movie._id,
        })
      );
};

// download video url functionalty
const DownloadVideo = async (videoUrl, setProgress) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgress(percent);
      if (percent > 0 && percent < 100) {
        toast.loading(`Downloading... ${percent}%`, {
          id: "download",
          duration: 100000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#fff",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};

export { IfMovieLiked, LikeMovie, DownloadVideo };
