const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const cors = require("cors");

dotenv.config();
connectDB();

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
