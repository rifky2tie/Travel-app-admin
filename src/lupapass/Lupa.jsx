export default function Lupa() {
  return (
    <div>
      <center>
        <Badan />
      </center>
    </div>
  );
}

function Badan() {
  return (
    <body>
      <div class="box">
        <h1>Lupa Password</h1>
        <div class="input-field">
          <input type="text" class="input" placeholder="Username" required />
        </div>
        <div class="input-field">
          <input type="email" class="input" placeholder="Email" required />
        </div>
        <div class="input-field">
          <input type="submit" class="submit" value="Reset Password" />
        </div>
      </div>
    </body>
  );
}
