const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// Permitir requisições do frontend
app.use(cors());
app.use(bodyParser.json());

// Configura o transporter do nodemailer (substitua pelo seu gmail e app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "m.valhiente@aluno.ifsp.edu.br@gmail.com", // seu gmail
    pass: "SENHA_DE_APLICATIVO" // gere uma senha de app p/ Gmail na conta Google
  }
});

app.post("/enviar-contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    await transporter.sendMail({
      from: `"Contato Site" <m.valhiente@aluno.ifsp.edu.br@gmail.com>`,
      to: "m.valhiente@aluno.ifsp.edu.br@gmail.com",
      subject: "Nova mensagem de contato",
      html: `
        <h3>Nova mensagem recebida</h3>
        <p><b>Nome:</b> ${nome}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensagem:</b><br>${mensagem}</p>
      `
    });
    res.status(200).json({ ok: true, msg: "E-mail enviado com sucesso!" });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "Erro ao enviar e-mail.", error: e.toString() });
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
