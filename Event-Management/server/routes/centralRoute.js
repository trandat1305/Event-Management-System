const router = require("express").Router();
const userRouter = require("./userRoutes");
const adminRouter = require("./adminRoutes");
const eventRouter = require("./eventRoutes");
const notificationRouter = require("./notificationRoutes");
const participantRouter = require("./participantRoutes");

const upload = require("../middlewares/uploadImages");
 

router.use("/user", userRouter);

router.use("/admin", adminRouter);

router.use("/events", eventRouter);

router.use('/notifications', notificationRouter);

router.use('/participants', participantRouter);

// image upload route TESTING ONLY
router.post("/imageupload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.status(200).json({ message: "File uploaded successfully", file: req.file });
});
module.exports = router;