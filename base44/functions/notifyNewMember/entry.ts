import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const data = payload.memberData || {};

    const body = `
📋 新會員註冊通知

姓名：${data.name || '-'}
電話：${data.phone || '-'}
Email：${data.user_email || '-'}
LINE ID：${data.line_id || '-'}
職業別：${data.occupation || '-'}
出生年月：${data.birth_year || '-'} 年 ${data.birth_month || '-'} 月
居住縣市：${data.city || '-'}
已確認年滿20歲：${data.age_confirmed ? '是' : '否'}
填寫時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: '568iqos@gmail.com',
      subject: '【TEREA Taiwan】新會員註冊通知',
      body,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});