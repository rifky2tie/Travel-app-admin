export default function Login() {
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
    <div class="box">
      <div class="container">
        <div class="top-header">
          <span>Sudah punya akun?</span>
          <header>Login</header>
        </div>
        <div class="input-field">
          <input type="text" class="input" placeholder="Username" required />
        </div>
        <div class="input-field">
          <input
            type="password"
            class="input"
            placeholder="Password"
            required
          />
        </div>
        <div class="input-field">
          <input type="submit" class="submit" value="Submit" />
        </div>
        <div class="bottom">
          <div class="left">
            <input type="checkbox" id="check" />
            <label for="check"> Remember Me</label>
          </div>
          <div class="right">
            <label>
              <a href="lupapass">Forgot password?</a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
