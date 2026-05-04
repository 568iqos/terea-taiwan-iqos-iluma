import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { phone } = await req.json();

    if (!phone) {
      return Response.json({ error: '請提供電話號碼' }, { status: 400 });
    }

    // 格式化台灣電話號碼為 E.164 格式
    let formattedPhone = phone.replace(/\s+/g, '').replace(/-/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+886' + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+886' + formattedPhone;
    }

    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const serviceSid = Deno.env.get('TWILIO_VERIFY_SERVICE_SID');

    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${serviceSid}/Verifications`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ To: formattedPhone, Channel: 'sms' }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data.message || '發送失敗' }, { status: 400 });
    }

    return Response.json({ success: true, phone: formattedPhone });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});