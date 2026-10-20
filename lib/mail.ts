// ══════════════════════════════════════════════
// ارسال ایمیل با Resend (REST API — بدون SDK)
// در نبود کلید، پیام‌ها فقط در لاگ ثبت می‌شوند
// ══════════════════════════════════════════════

// تبدیل متن به HTML امن (escape) برای جلوگیری از تزریق در قالب ایمیل
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendMail({
  subject,
  fields,
}: {
  subject: string;
  fields: Record<string, string>;
}) {
  const to = process.env.MAIL_TO_ADMIN ?? 'info@markettroppy.ir';
  const from = process.env.MAIL_FROM ?? 'Market Troppy <onboarding@resend.dev>';

  const html = `
    <div dir="rtl" style="font-family:Tahoma;line-height:1.8">
      <h2 style="color:#0F172A">${escapeHtml(subject)}</h2>
      <table style="border-collapse:collapse">
        ${Object.entries(fields)
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:6px 12px;border:1px solid #ddd;color:#14B8A6;font-weight:bold">${escapeHtml(k)}</td>
                 <td style="padding:6px 12px;border:1px solid #ddd">${escapeHtml(v)}</td>
               </tr>`
          )
          .join('')}
      </table>
    </div>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // حالت توسعه: فقط لاگ (بدون حساس — لاگ نکردن محتوای پسورد)
    console.log(`[mail] (بدون RESEND_API_KEY) موضوع: ${subject} → ${to}`);
    return { ok: true, mocked: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
