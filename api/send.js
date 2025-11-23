const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Método não permitido' });

  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Campos obrigatórios' });

  // Variáveis de ambiente configuradas no Vercel
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"Site Eliab" <${process.env.SMTP_USER}>`,
    to: process.env.ELIAB_EMAIL,
    subject: `Orçamento - ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || '-'}\n\nMensagem:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ ok: false, error: 'Erro ao enviar e-mail' });
  }
};