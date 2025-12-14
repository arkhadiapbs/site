export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          width: 100%;
          padding: 20px 0;
          background: #111;
          color: #bbb;
          text-align: center;
          margin-top: 60px;
          border-top: 1px solid #1a1919ff;
          box-shadow: 0 -4px 10px #1b1b1b55;
          font-size: 0.80rem;
          font-family: 'Montserrat', sans-serif;
        }

        .footer p {
          margin: 0;
          letter-spacing: 0.5px;
        }
      `}</style>

      <footer className="footer">
        <p>© 2025 Arkhadia. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
