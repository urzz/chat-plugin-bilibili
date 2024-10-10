import {
  PluginErrorType,
  createErrorResponse,
  getPluginSettingsFromRequest,
} from '@lobehub/chat-plugin-sdk';

import { fetchSearch } from '@/servers/fetchSearch';
import { Settings } from '@/type';

export const config = {
  runtime: 'edge',
};

export default async (req: Request) => {
  if (req.method !== 'POST') return createErrorResponse(PluginErrorType.MethodNotAllowed);

  const { keywords } = (await req.json()) as { keywords: string };

  const settings = getPluginSettingsFromRequest<Settings>(req);

  const result = await fetchSearch(settings, keywords);

  return new Response(JSON.stringify(result));
};
