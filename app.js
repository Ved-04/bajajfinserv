const express = require("express");


const app = express();
app.use(express.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input, 'data' must be an array",
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let lettersOnly = [];

    data.forEach((item) => {
      if (!isNaN(item) && item.trim() !== "") {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        lettersOnly.push(item);
      } else {
        special_characters.push(item);
      }
    });

    // Concatenation logic: reverse all letters and alternate caps
    let concat_string = lettersOnly
      .join("")
      .split("")
      .reverse()
      .map((ch, idx) =>
        idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      )
      .join("");

    res.json({
      is_success: true,
      user_id: "john_doe_17091999", // replace with your full name + DOB
      email: "john@xyz.com",       // replace with your email
      roll_number: "ABCD123",      // replace with your roll number
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
