import dotenv from "dotenv";

// Load local .env during development (Netlify sets env vars in production)
dotenv.config();

const VOICERSS_API_KEY = process.env.VOICERSS_API_KEY;

// Utility to build VoiceRSS URL
function buildVoiceRssUrl(text, language) {
  const params = new URLSearchParams({
    key: VOICERSS_API_KEY,
    src: text,
    hl: language === "id" ? "id-id" : "en-us",
    v: language === "id" ? "Rizki" : "Linda",
    r: "0",
    c: "MP3",
    f: "44khz_16bit_stereo",
  });
  return `https://api.voicerss.org/?${params.toString()}`;
}

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { text, language } = JSON.parse(event.body || "{}");

    if (!text || typeof text !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid request",
          message: "Text is required and must be a string",
        }),
      };
    }

    if (!language || !["id", "en"].includes(language)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Invalid request",
          message: 'Language must be "id" or "en"',
        }),
      };
    }

    const sanitizedText = text.substring(0, 1000);
    console.log(
      `[TTS] Netlify function called. language=${language} length=${sanitizedText.length}`,
    );

    const voiceRssUrl = buildVoiceRssUrl(sanitizedText, language);
    const response = await fetch(voiceRssUrl);
    const audioBuffer = Buffer.from(await response.arrayBuffer());
    const responseText = audioBuffer.toString("utf-8");

    // VoiceRSS returns errors as plain text
    const isError =
      audioBuffer.length < 1000 ||
      responseText.toLowerCase().includes("error") ||
      (!audioBuffer[0] === 0xff && !responseText.startsWith("ID3"));

    if (!response.ok || isError) {
      console.error("[TTS] VoiceRSS error", responseText);
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "TTS service error",
          message: responseText || "Invalid audio response from VoiceRSS",
        }),
      };
    }

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
      body: audioBuffer.toString("base64"),
    };
  } catch (err) {
    console.error("[TTS] Function error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal error", message: err.message }),
    };
  }
};
