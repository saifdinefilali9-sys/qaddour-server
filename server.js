const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("قدور يعمل بنجاح 🤖");
});

app.post("/ask", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({
        error: "لم يتم إرسال رسالة"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions:
        "أنت قدور، مساعد ذكي يتحدث بالعربية بطريقة ودودة وواضحة ومختصرة.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Qaddour server running on port ${PORT}`);
});