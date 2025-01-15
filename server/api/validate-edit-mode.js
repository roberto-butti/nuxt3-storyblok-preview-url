// server/api/validate-edit-mode.js
import crypto from 'crypto';

export default defineEventHandler((event) => {
  const query = getQuery(event);

  const spaceId = query['_storyblok_tk[space_id]'];
  const timestamp = query['_storyblok_tk[timestamp]'];
  const token = query['_storyblok_tk[token]'];
  console.log("SPACE ID = " ,spaceId)
  console.log("timestamp = " ,timestamp)
  console.log("token = " ,token)

  if (!spaceId || !timestamp || !token) {
    return { editMode: false };
  }

  const validationString = `${spaceId}:XpmVf72wMdQqKjbXXQm3UQtt:${timestamp}`;
  const validationToken = crypto.createHash('sha1').update(validationString).digest('hex');

  const isTokenValid = token === validationToken;
  const isTimestampValid = timestamp > Math.floor(Date.now() / 1000) - 3600;

  return { editMode: isTokenValid && isTimestampValid };
});
