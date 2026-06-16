import { BotIdClient } from 'botid/client';

const protectedRoutes = [{ path: '/api/contact', method: 'POST' as const }];

export default function BotIdProtection() {
  return <BotIdClient protect={protectedRoutes} />;
}
