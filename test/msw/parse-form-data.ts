import { DefaultBodyType, PathParams, RestRequest } from 'msw';

/**
 * Parses an incoming `msw` request object's form data payload to a JavaScript object.
 * @param request The request.
 * @returns The parsed body.
 */
export async function parseFormData(
  request: RestRequest<DefaultBodyType, PathParams<string>>,
): Promise<object> {
  const payload = await request.text();
  const keyValuePairs = payload.split('&');
  const body: object = {};
  for (const keyValuePair of keyValuePairs) {
    const [key, value] = keyValuePair.split('=');
    body[key] = value;
  }
  return body;
}
