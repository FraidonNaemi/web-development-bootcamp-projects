// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/country/:name", async (req, res) => {
  const countryName = req.params.name;

  try {
      const result = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      const country = result.data[0]; // Get the first country object from the response
      res.render("index.ejs", { country });
  } catch (error) {
      console.log(error.response.data);
      res.status(500);
  }
});


// 5. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});