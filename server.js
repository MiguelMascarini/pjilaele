const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "miguelitomascarini@gmail.com", // seu gmail
    pass: "lebe nenc fiyr xbrq" // senha de app (NUNCA sua senha normal)
  }
});

app.post("/enviar-contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;
  try {
    await transporter.sendMail({
      from: `"Contato Site" <miguelitomascarini@gmail.com>`,
      to: "mascarinibm@gmail.com",
      subject: "Nova mensagem de contato",
      html: `
        <h3>Nova mensagem recebida</h3>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensagem:</b><br>${mensagem}</p>
      `,
    });
    res.status(200).json({ ok: true, msg: "E-mail enviado com sucesso!" });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "Erro ao enviar e-mail.", error: e.toString() });
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
