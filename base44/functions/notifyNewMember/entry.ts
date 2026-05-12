import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const data = payload.memberData || {};

    // 儲存到 MemberSubmission 實體
    await base44.asServiceRole.entities.MemberSubmission.create({
      name: data.name || '',
      phone: data.phone || '',
      email: data.user_email || '',
      line_id: data.line_id || '',
      occupation: data.occupation || '',
      birth_year: data.birth_year || null,
      birth_month: data.birth_month || null,
      city: data.city || '',
      age_confirmed: data.age_confirmed || false,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});