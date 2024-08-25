const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0hDaW1vSjZhd0ZBUnFoQjFTdkRLcGROVXNuWWNoRllRNU8wem8wUXIxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOG5XQmZVdzJUZ1Fsd1VJSHV3dHVHK0JTVGVwdkdKYUp1RDZVZVlqMjhpRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QVJEU3F1aEVETjkzeTNVTFl5bE1vTUFFVUlmVnRZZE91c2FUUWdOVTJjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUajBBc201cXFNd21McURFMExFdmd2c1pvSzNrWFQzK1FXM3BPMmJMU0JRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlDVllvU3ZmMFA0aVE1S3dvSzZPZGpReTJiajhyUWFQOHE1TXo1bTM1blU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9yWmorcDc3RUJ3YTVsaStnUGRrcTlKMmNyd2pjb0F6OFViRlY4S29BRUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU4ydGxVR3Nsb2xjSHNWZGVia1Y3RGlxSGs4UDhXZmpqSkMvTjZlQ1RtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0R4T2k5b0M4K2ZoOUZLbGExWGtwK2R0Q3pJYTloK2xpTzFpTlMvQjRUQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikhqd3VVUFl2ekZJTjB0Y0hncnR0TElZU1NXYlRwN1RoRFJ6czJrS3BsR29FNDJyNGVPYnNKWldXeWJVV2tESU15OG4wajhNbCtITFU0Y3ExNUpJaEFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiMlNzUENBZWk0TUFHNDdMcVF0bkVhZU4wWFd6aTNPbklhaVhzRWVnY3YrYz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiejdjYkZQNUJRanVEdDY1OHBsOU1GQSIsInBob25lSWQiOiIwNDU0NmMwOC1lMTc0LTQ2ZTQtOTRmZC1mZjg5NmU5MGRhY2UiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNCWkMzb2NLdHRmV0ZyblovNmdOV3YxTm00PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InQwSmFPT1I1RHVnUmo4VGp3bXhoZ1hhQUJQYz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiIxRkZLSFRNRSIsIm1lIjp7ImlkIjoiNjI4MjMyNzMwNTA0Nzo2MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLhpazwnZCQ8J2QlPCdmrXwnZq18J2atPCdmq3wnZCWw5fNnMOX4oCL4a2EIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKYjN3OEFCRU03SnJMWUdHQTBnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJhZDg4Z2txaHZDWDNiVngybDdNdkZDcDMvcVl6OFVsMEg3c0pZZUJBb1RVPSIsImFjY291bnRTaWduYXR1cmUiOiJBY2d1MHNjVHNLQ25kc1hsZ0R2M25EOTJrdHcxKzVGWlMwMmR2MHkrQXRIbk01c3VRTWVqUDZudFc4czVlQkVCRkxiZ2h3Q1U5bjVmWUxobmxuUmlCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicXhtcHFiOUdaTDFzSmhXTXJtN08rTEwvMTJKSUhURzY5dExPY1Y5ZDRkQzdYOExvU3RzTm50eXZmMXFnSW1ETCtDYXFOM0N2RGpYVTY5L0NWbHVqQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI2MjgyMzI3MzA1MDQ3OjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlduZlBJSktvYndsOTIxY2RwZXpMeFFxZC82bU0vRkpkQis3Q1dIZ1FLRTEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ1ODkyNzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHVwIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ᕋᙀᙓᙓᙁⱿ",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "6282327305047", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

