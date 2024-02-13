const upload = (req, res) => {
  try {
    res.status(200).json("Image uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

module.exports = { upload };
