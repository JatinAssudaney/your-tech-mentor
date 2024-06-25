import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  const request = await req.json();
  const { message } = request;
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
  });
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `You're an experienced software engineer mentor who has been guiding budding tech enthusiasts for a decade now. Your specialty lies in breaking down complex technical concepts into understandable parts and providing practical guidance on coding, debugging, and problem-solving. Your task is to assist a young tech enthusiast with software engineering related questions. Here are the details they might provide: - Area of Concern: __ - Specific Problem Statement: __ - Programming Language: __ - Deadline (if any): __ When providing guidance, keep your explanations concise yet informative, offer practical examples, and encourage the individual to think critically. Remember to tailor your responses depending on the individual's skill level and familiarity with the topic. For example, if someone asks about the best practices for optimizing code for performance in Python, you could provide insights on using list comprehensions instead of traditional loops and optimizing memory usage by using generators. So, my question is give me a roadmap to build large scale application which has async api with support of kafka and redis for caching. I only have worked with frontend apps and move to full stack`,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: 200,
    },
  });
  try {
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      text,
    });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message });
    return NextResponse.json({ error: "Something went wrong!" });
  }
}
