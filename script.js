
const API = "https://web-production-1fe10d.up.railway.app";

function login() {

  let correo = document.getElementById("correo").value;
  let password = document.getElementById("password").value;
  let mensaje = document.getElementById("mensaje");

  
  if (!correo.endsWith("@miumg.edu.gt")) {
    mensaje.style.color = "red";
    mensaje.textContent = "Correo no válido";
    return;
  }

  if (password === "") {
    mensaje.style.color = "red";
    mensaje.textContent = "Ingrese contraseña";
    return;
  }

  mensaje.style.color = "#4299e1";
  mensaje.textContent = "Validando credenciales...";

  
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correo: correo,
      password: password
    })
  })

  .then(res => res.text())

  .then(data => {

    mensaje.textContent = data;

    if (data === "Login correcto") {

      mensaje.style.color = "#48bb78";

      // Guardamos el correo para usarlo luego en web.html
      localStorage.setItem("usuarioCorreo", correo);

      setTimeout(() => {
        window.location.href = "web.html";
      }, 1000);

    } else {

      mensaje.style.color = "#f56565";
    }

  })

  .catch(error => {

    console.error("ERROR LOGIN:", error);

    mensaje.style.color = "#f56565";
    mensaje.textContent = "No se pudo conectar con Railway";

  });

}


// NUEVA FUNCIÓN: Mostrar/Ocultar contraseña
function togglePasswordVisibility() {

    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggleIcon.textContent = "🙈";
        toggleIcon.style.opacity = "1";

    } else {

        passwordInput.type = "password";
        toggleIcon.textContent = "👁️";
        toggleIcon.style.opacity = "0.6";
    }
}

