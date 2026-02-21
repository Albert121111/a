export async function sendEmail(to: string, subject: string, body: string) {
  if (!process.env.EMAIL_FROM) {
    console.log('[mock-email]', { to, subject, body });
    return;
  }
}
