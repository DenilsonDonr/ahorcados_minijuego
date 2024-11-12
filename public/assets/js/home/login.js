document.addEventListener("DOMContentLoaded", () => { 
    // Variables de elementos DOM
    const registerForm = document.getElementById("registerForm");
    const loginButton = document.getElementById("btn-login");
    const loginModal = document.getElementById("loginModal");
    const logoutButton = document.getElementById("btn-logout");
    const logoutModal = document.getElementById("logoutModal");
    const confirmLogout = document.getElementById("confirmLogout");
    const cancelLogout = document.getElementById("cancelLogout");

    // Función para mostrar notificaciones
    function showNotification(message, duration = 1500) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.innerText = message;

        document.body.appendChild(notification);
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, duration + 100);
    }

    // Función para verificar si hay una sesión activa
    async function checkSession() {
        try {
            const response = await FetchData('http://localhost/ahorcados_minijuego/usuario/session', 'GET');
            if (response.isLoggedIn) {
                // Mostrar notificación y actualizar el nombre de usuario en la interfaz
                showNotification(`Bienvenido de nuevo, ${response.user.usuario}`);
    
                // Actualizar el nombre en el HTML
                const userNameElement = document.getElementById("userName");
                if (userNameElement) {
                    userNameElement.textContent = `Nombre: ${response.user.usuario}`;
                }
    
                // Actualizar el puntaje si está disponible en la sesión
                if (response.user.puntaje) {
                    const userScoreElement = document.getElementById("userScore");
                    if (userScoreElement) {
                        userScoreElement.textContent = `Puntaje: ${response.user.puntaje}`;
                    }
                }
            } else {
                // Mostrar el modal de inicio de sesión o la opción de registrarse
                loginModal.style.display = "block";
            }
        } catch (error) {
            console.error("Error verificando sesión:", error);
        }
    }
    

    // Función para manejar el inicio de sesión
    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const username = document.querySelector("#loginSection input[type='text']").value;
        const password = document.querySelector("#loginSection input[type='password']").value;

        if (!username || !password) {
            showNotification("Por favor, ingresa todos los datos");
            return;
        }

        const data = { user: username, password: password };

        try {
            const response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/authenticate', 'POST', data);
            if (response.message === 'Login exitoso') {
                showNotification("Inicio de sesión exitoso");
                loginModal.style.display = "none";
            } else {
                showNotification("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            showNotification("Hubo un error en el inicio de sesión");
        }
    });

    // Función para manejar el registro de usuario
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const data = {
            user: registerForm.user.value,
            email: registerForm.email.value,
            password: registerForm.password.value
        };
        
        if (!data.user || !data.email || !data.password || !registerForm.passwordConfirmed.value) {
            alert('Todos los campos son obligatorios');
            return;
        }

        postRegister(data);
    });

    // Función para enviar los datos de registro a la API
    async function postRegister(data) {
        try {
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/register', 'POST', data);
            if (!response || !response.success || response.error) {
                showNotification(response.error);
                return;
            }
            showNotification(response.success);
            cleanForm();
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    // Función para limpiar el formulario de registro
    const cleanForm = () => {
        registerForm.reset();
    };

    // Función para mostrar el modal de cierre de sesión
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            logoutModal.style.display = "flex";
        });
    }

    // Confirmar el cierre de sesión
    confirmLogout.addEventListener("click", async () => {
        try {
            const response = await fetch('http://localhost/ahorcados_minijuego/usuario/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (result.success) {
                showNotification("Sesión cerrada exitosamente");
                logoutModal.style.display = "none";
                window.location.href = "/index.php";
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    });

    // Cancelar el cierre de sesión y ocultar el modal
    cancelLogout.addEventListener("click", () => {
        logoutModal.style.display = "none";
    });

    // Verificar la sesión al cargar la página
    checkSession();
});
