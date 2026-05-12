import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email, code } = await req.json();

    if (!email || !code) {
      return Response.json({ error: '請提供 Email 與驗證碼' }, { status: 400 });
    }

    const records = await base44.asServiceRole.entities.OtpCode.filter({ email });
    if (records.length === 0) {
      return Response.json({ success: false, error: '找不到驗證碼' });
    }

    const record = records[0];
    if (Date.now() > record.expires) {
      return Response.json({ success: false, error: '驗證碼已過期' });
    }

    if (record.code !== code) {
      return Response.json({ success: false, error: '驗證碼錯誤' });
    }

    // Delete used OTP
    await base44.asServiceRole.entities.OtpCode.delete(record.id);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});