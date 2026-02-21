export function track(event: string, payload: Record<string, unknown>) {
  if (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === 'console' || !process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER) {
    console.log('[analytics]', event, payload);
  }
}
