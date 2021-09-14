module.exports = (mongoose) => {
  mongoose.connect(process.env.DB_URL).then(() => console.log("db connected"));
};
