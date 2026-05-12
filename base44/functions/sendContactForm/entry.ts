import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { name, phone, product, quantity, birthday, lineId } = body;

    if (!name || !phone || !product) {
      return Response.json({ error: '請填寫必填欄位' }, { status: 400 });
    }

    const emailBody = `
客戶聯絡表單提交

姓名: ${name}
電話: ${phone}
想購買商品: ${product}
條數: ${quantity || '未填寫'}
生日: ${birthday || '未填寫'}
LINE ID: ${lineId || '未填寫'}

提交時間: ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
    `.trim();

    await base44.integrations.Core.SendEmail({
      to: '568iqos@gmail.com',
      subject: `新的客戶聯絡表單 - ${name}`,
      body: emailBody,
    });

    return Response.json({ success: true, message: '表單已提交，感謝您的聯絡！' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});