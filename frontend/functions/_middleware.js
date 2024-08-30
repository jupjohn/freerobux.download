export async function onRequestGet(context) {
  const possibleImageName = new URL(context.request.url).pathname.replace(/^\//, "");
  if (possibleImageName === "") {
    return await context.next();
  }

  const obj = await context.env.IMAGE_STORE.get(possibleImageName);

  if (obj === null) {
    return await context.next();
  }

  return new Response(obj.body, { headers: { "Content-Type": obj.httpMetadata.contentType } });
}
