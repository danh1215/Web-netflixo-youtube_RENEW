import toast from "react-hot-toast";
import Axios from "./Axios";

const uploadImageservice = async (file, setLoading) => {
  try {
    setLoading(true);
    const { data } = await Axios.post("/upload", file);
    setLoading(false);
    toast.success("File Uploaded Successfully");
    return data;
  } catch (error) {
    setLoading(false);
    toast.error("Something went wrong");
  }
};
 
export { uploadImageservice };
