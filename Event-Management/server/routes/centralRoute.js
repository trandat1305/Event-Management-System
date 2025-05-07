const router = require("express").Router();
const userRouter = require("./userRoutes");

const upload = require("../middlewares/uploadImages");

router.use("/user", userRouter);


// image upload route TESTING ONLY
router.post("/imageupload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json({ message: "File uploaded successfully", file: req.file });
});
module.exports = router;