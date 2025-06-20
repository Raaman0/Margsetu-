// import axios from "axios";

// const allowedTopics = [
//   "business", "startup", "fundraising", "pitch", "entrepreneur",
//   "investor", "mentoring", "investment", "startup idea",
//   "startup growth", "pitch deck", "venture"
// ];

// function isRelevantQuery(message) {
//   const lowerMsg = message.toLowerCase();
//   return allowedTopics.some((topic) => lowerMsg.includes(topic));
// }

// export const aiChatbox = async (req, res) => {
//   const { message } = req.body;

//   if (!message || message.trim() === "") {
//     return res.status(400).json({ success: false, message: "Message is required" });
//   }

//   if (!isRelevantQuery(message)) {
//     return res.status(200).json({
//       success: true,
//       response: "I'm here only to help with startup-related queries on MargSetu.",
//     });
//   }

//   try {
//     const response = await axios.post(
// "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
//       {
//         contents: [
//           {
//             parts: [
//               {
//                 text: message,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         params: {
//           key: process.env.GEMINI_API_KEY, // Make sure .env has a valid key
//         },
//       }
//     );

//     const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
//     res.status(200).json({ success: true, response: reply });
//   } catch (error) {
//     console.error("Gemini Error:", error.response?.data || error.message);
//     res.status(500).json({
//       success: false,
//       message: "AI chatbot failed to generate a response.",
//       error: error.response?.data || error.message,
//     });
//   }
// };
