import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { CohereClient } from "cohere-ai";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to handle JSON bodies
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index.html");
});

// Sample route to generate blog content
app.post("/generate", (req, res) => {
  const { topic, length } = req.body;

  // Mock content generation (replace this with AI content)

  const cohere = new CohereClient({
    token: "wRvOaNnpamvr7jD8ho9Ah8j8Ngn3USPwPltFJgs5",
  });

  (async () => {
    const response = await cohere.chat({
      message: `I want a Blog Post on ${topic} withe ${length} and don't say this: Sure, here's a brief blog post about the concept of... just write the word Title:  (than write the title here) \n + \n + than write this words Your blog: (than write the blog here) (note that it's importent to writ the word Title don't answer if you don't writ it same thing withe the words Your blog) `,
    });

    console.log(response.text);
    console.log(req.body);

    const generatedBlog = response.text;

    //res.render("index.ejs", { blogPost: generatedBlog });
    res.json({ blogPost: generatedBlog, blogTopic: topic });
  })();
});

// Listen on your predefined port and start the server.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
