import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: '請提供 Email' }, { status: 400 });
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP in entity
    const existing = await base44.asServiceRole.entities.OtpCode.filter({ email });
    if (existing.length > 0) {
      await base44.asServiceRole.entities.OtpCode.update(existing[0].id, { code, expires });
    } else {
      await base44.asServiceRole.entities.OtpCode.create({ email, code, expires });
    }

    // Send email
    await base44.integrations.Core.SendEmail({
      to: email,
      subject: 'TEREA Taiwan 驗證碼',
      body: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="letter-spacing: 4px; font-size: 20px;">TEREA</h2>
          <p style="color: #555; font-size: 14px;">您的驗證碼為：</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">${code}</div>
          <p style="color: #999; font-size: 12px;">驗證碼有效期限為 10 分鐘，請勿將驗證碼告知他人。</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});