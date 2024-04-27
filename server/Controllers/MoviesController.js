import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// ************ PUBLIC CONTROLLERS ************
// @desc    import movies
// @route   POST /api/movies/import
// @access  Public
 
const importMovies = asyncHandler(async (req, res) => {
  // trước tiên, đảm bảo bảng Phim trống bằng cách xóa tất cả tài liệu
  await Movie.deleteMany({});
  // sau đó chèn tất cả phim từ MoviesData
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

// @desc    get all movies
// @route   GET /api/movies
// @access  Public

const getMovies = asyncHandler(async (req, res) => {
  try {
    // lọc phim theo thể loại, thời gian, ngôn ngữ, tỷ lệ, năm và tìm kiếm
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    //tải thêm chức năng phim
    const page = Number(req.query.pageNumber) || 1; // nếu pageNumber không được cung cấp trong truy vấn,đặt nó thành 1
    const limit = 10; //Giới hạn 10 phim mỗi trang
    const skip = (page - 1) * limit; // bỏ qua 2 phim mỗi trang

    // tìm phim theo truy vấn, bỏ qua và giới hạn
    const movies = await Movie.find(query)
      // .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // lấy tổng số phim
    const count = await Movie.countDocuments(query);

    // gửi phản hồi kèm theo phim và tổng số phim
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), // tổng số trang
      totalMovies: count, //tổng số phim
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    get movie by id
// @route   GET /api/movies/:id
// @access  Public

const getMovieById = asyncHandler(async (req, res) => {
  try {
    // tìm phim theo id trong cơ sở dữ liệu
    const movie = await Movie.findById(req.params.id);
    // nếu tìm thấy phim hãy gửi nó cho client
    if (movie) {
      res.json(movie);
    }
    // nếu không tìm thấy phim gửi lỗi 404
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get top rated movies
// @route   GET /api/movies/rated/top
// @access  Public

const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // tìm phim được đánh giá cao nhất
    const movies = await Movie.find({}).sort({ rate: -1 });
    // gửi những bộ phim được đánh giá cao nhất cho client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get random movies
// @route GET /api/movies/random/all
// @access Public

const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // tìm phim ngẫu nhiên
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // gửi phim ngẫu nhiên tới client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  ************ PRIVATE CONTROLLERS ************

// @desc    Create movie review
// @route   POST /api/movies/:id/reviews
// @access  Private

const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // tìm phim theo id trongdatabase
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // kiểm tra xem người dùng đã xem lại phim này chưa
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // nếu người dùng đã xem lại phim này sẽ gửi lỗi 400
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
      // nếu không hãy tạo một đánh giá mới
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };
      // đẩy đánh giá mới vào mảng đánh giá
      movie.reviews.push(review);
      // tăng số lượng đánh giá
      movie.numberOfReviews = movie.reviews.length;

      // tính toán tỷ lệ mới
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // Lưu phim trong database
      await movie.save();
      // Gửi movie mới đến client
      res.status(201).json({
        message: "Review added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ ADMIN CONTROLLERS ************

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin

const updateMovie = asyncHandler(async (req, res) => {
  try {
    // lấy dữ liệu từ cơ thể yêu cầu
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // tìm phim theo id trong cơ sở dữ liệu
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save the movie in database

      const updatedMovie = await movie.save();
      // gửi phim cập nhật tới client
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // tìm phim theo id trong cơ sở dữ liệu
    const movie = await Movie.findById(req.params.id);
    // nếu tìm thấy phim hãy xóa nó đi
    if (movie) {
      await movie.remove();
      res.json({ message: "Movie removed" });
    }
    // không tìm thấy phim gửi lỗi 404
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete all movies
// @route   DELETE /api/movies
// @access  Private/Admin

const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.json({ message: "All movies removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Create movie
// @route   POST /api/movies
// @access  Private/Admin

const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create a new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });

    // save the movie in database
    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
