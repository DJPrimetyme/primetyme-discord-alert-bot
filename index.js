import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    const discordName =
      member.displayName ||
      member.user.globalName ||
      member.user.username;

    const response = await fetch(process.env.WIX_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-alert-secret": process.env.WIX_SECRET
      },
      body: JSON.stringify({
        discordName
      })
    });

    const result = await response.text();

    console.log("Join alert sent:", result);
  } catch (err) {
    console.error(err);
  }
});

client.login(process.env.DISCORD_TOKEN);
