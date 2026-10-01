const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// اختبار الخادم
app.get("/", (req, res) => {
  res.send("قدور يعمل بنجاح 🤖");
});

// استقبال رسالة من صفحة قدور
app.post("/ask", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "لم يتم إرسال رسالة صحيحة"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions:
        "أنت قدور، مساعد ذكي يتحدث العربية بطريقة ودودة وواضحة ومختصرة.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("Qaddour error:", error);

    res.status(500).json({
      error: "تعذر الاتصال بالذكاء الاصطناعي"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Qaddour server running on port ${PORT}`);
});