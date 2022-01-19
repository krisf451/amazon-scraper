const express = require("express");

const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 9000;

const generateScaperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    greeting: "Welcome to Amazon Scraper API!!!!",
    endpoints: [
      "GET product details /products/:productId/?api_key=(your key goes here)",
      "GET product reviews /products/:productId/reviews/?api_key=(your key goes here)",
      "GET product offers /products/:productId/offers/?api_key=(your key goes here)",
      "GET product details /search/:searchQuery/?api_key=(your key goes here)",
    ],
    instructions: {
      steps: [
        "Get Your own API key from scraper API",
        "Decide on endpoints you want to use",
        "attach your api key as a query strings on your requests",
        "Example Endpoint:  http://localhost:5000/products/(any product id)/?api_key=(put your api key here)",
      ],
    },
  });
});

//GET product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScaperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});
//GET product reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});
//GET product offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});
//GET search results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  try {
    const response = await request(
      `${generateScaperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (err) {
    res.json(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
