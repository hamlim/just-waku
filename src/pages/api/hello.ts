async function handler(request: Request): Promise<Response> {
  return new Response(
    JSON.stringify({
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: (async () => {
        try {
          return await request.json();
        } catch (error) {
          try {
            return await request.text();
          } catch (error) {
            return null;
          }
        }
      })(),
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const OPTIONS = handler;
