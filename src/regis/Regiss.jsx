export default function Regiss() {
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
    

          <h1>Registrasi</h1>

        <div class="input-field">
          <input type="text" class="input" placeholder="Nama Lengkap" required />
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
            <input
              type="password"
              class="input"
              placeholder="Konfirmasi Password"
              required
            />
          </div>
        <div class="input-field">
          <input type="submit" class="submit" value="Register" />
        </div>

    </div>
  );
}
