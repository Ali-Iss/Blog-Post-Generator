import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { CohereClient } from "cohere-ai";
import dotenv from "dotenv"; // Add this
import serverless from "serverless-http"; // Added this to wrap the Express app


dotenv.config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to handle JSON bodies
app.use(express.static("public"));
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'public'); // Assuming your EJS files are in the 'public' folder

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Sample route to generate blog content
app.post("/generate", (req, res) => {
  const { topic, length } = req.body;

  // Mock content generation (replace this with AI content)

  const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY, // Use the environment variable
  });

  (async () => {
    try {
    const response = await cohere.chat({
      message: `I want a Blog Post on ${topic} withe ${length} and don't say this: Sure, here's a brief blog post about the concept of... just write the word Title:  (than write the title here) \n + \n + than write this words Your blog: (than write the blog here) (note that it's importent to writ the word Title don't answer if you don't writ it same thing withe the words Your blog) `,
    });

    console.log(response.text);
    console.log(req.body);

    const generatedBlog = response.text;

    //res.render("index.ejs", { blogPost: generatedBlog });
    res.json({ blogPost: generatedBlog, blogTopic: topic });
  } catch (error) {
    console.error("Error generating blog:", error);
    res.status(500).json({ error: "Error generating blog content" });
  }
  })();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export const handler = serverless(app);



