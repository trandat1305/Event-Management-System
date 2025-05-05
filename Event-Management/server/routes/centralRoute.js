const router = require("express").Router();
const userRouter = require("./userRoutes");

// routes examples, commented due to error
// const userRoutes = require('./routes/userRoutes');
// const eventRoutes = require('./routes/eventRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/events', eventRoutes);

router.use("/auth", userRouter);

module.exports = router;