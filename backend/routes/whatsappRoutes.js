import express from "express";
import twilio from "twilio";
import User from "../models/user.js";
import Clip from "../models/clip.js";

const router = express.Router();
const MessagingResponse = twilio.twiml.MessagingResponse;

const isVideoLink = (text) => {
  return (
    text.includes("youtube.com") ||
    text.includes("youtu.be") ||
    text.includes("instagram.com")
  );
};

const isLink = (text) => {
  return text.startsWith("http://") || text.startsWith("https://");
};

const getType = (content) => {
  if (isLink(content)) return "link";
  if (content.startsWith("#")) return "hex";
  if (content.includes("{") || content.includes("=>")) return "code";
  return "text";
};

router.post("/webhook", async (req, res) => {
  const twiml = new MessagingResponse();
  const body = req.body;
  const message = body.Body?.trim();
  const from = body.From;
  const mediaUrl = body.MediaUrl0;

  console.log(`From: ${from}`);
  console.log(`Message: ${message}`);

  try {
    // Bot activation code check
    if (message.startsWith("CLIPIN-")) {
      const code = message.replace("CLIPIN-", "").trim();

      const userToActivate = await User.findOne({
        botActivationCode: code,
        botActivationExpiry: { $gt: new Date() },
      });

      if (!userToActivate) {
        twiml.message(
          "⚠️ Invalid or expired code!\nPlease generate a new code from ClipIn website.",
        );
      } else {
        await User.findByIdAndUpdate(userToActivate._id, {
          whatsappNumber: from,
          botActivationCode: null,
          botActivationExpiry: null,
        });
        twiml.message(
          "✅ WhatsApp Bot activated successfully!\nYou can now save anything to ClipIn directly from WhatsApp 🎉",
        );
      }

      res.writeHead(200, { "Content-Type": "text/xml" });
      return res.end(twiml.toString());
    }
    const user = await User.findOne({ whatsappNumber: from });

    if (!user) {
      twiml.message(
        "⚠️ Your WhatsApp is not linked to ClipIn!\nPlease activate the bot from the ClipIn website first.",
      );
      res.writeHead(200, { "Content-Type": "text/xml" });
      return res.end(twiml.toString());
    }

    // Rule 3 — Image/Video file
    if (mediaUrl) {
      console.log("Media received — forwarding to download API");
      twiml.message("📥 Media received! Sending to your PC...");
    }

    // Rule 1 — YouTube/Instagram link
    else if (isLink(message) && isVideoLink(message)) {
      console.log("Video link — forwarding to download API");
      twiml.message("📥 Video link received! Downloading to your PC...");
    }

    // Rule 5 — #collection
    else if (message.startsWith("#")) {
      const lines = message.split("\n");
      const firstLine = lines[0];
      const rest = lines.slice(1).join("\n");

      const parts = firstLine.split(" ");
      const clipCollection = parts[0].replace("#", "");
      const title = parts.slice(1).join(" ");
      const content = rest || "";

      if (!title) {
        twiml.message("⚠️ Title missing! Format:\n#collection Title\nContent");
      } else {
        const existing = await Clip.findOne({
          user: user._id,
          title,
          clipCollection,
        });

        if (existing) {
          twiml.message(
            `⚠️ Title "${title}" already exists in #${clipCollection}!\nPlease use a different title.`,
          );
        } else {
          await Clip.create({
            user: user._id,
            title,
            content: content || title,
            clipCollection,
            type: getType(content),
          });
          twiml.message(`📂 Saved to #${clipCollection} ✅\nTitle: ${title}`);
        }
      }
    }

    // Rule 2 & 4 — Normal link ya text
    else {
      const lines = message.split("\n");
      const title = lines[0];
      const content = lines.slice(1).join("\n");

      if (!content) {
        twiml.message(
          "⚠️ Content missing! Format:\nTitle\nYour content or link",
        );
      } else if (isLink(content.trim()) && isVideoLink(content.trim())) {
        twiml.message("📥 Video link received! Downloading to your PC...");
      } else {
        const existing = await Clip.findOne({
          user: user._id,
          title,
          clipCollection: "General",
        });

        if (existing) {
          twiml.message(
            `⚠️ Title "${title}" already exists!\nPlease use a different title.`,
          );
        } else {
          await Clip.create({
            user: user._id,
            title,
            content,
            clipCollection: "General",
            type: getType(content),
          });
          twiml.message(`✅ Saved to ClipIn!\nTitle: ${title}`);
        }
      }
    }
  } catch (err) {
    console.error(err);
    twiml.message("❌ Something went wrong! Try again.");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

export default router;
