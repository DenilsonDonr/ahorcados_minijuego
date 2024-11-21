document.addEventListener("DOMContentLoaded", () => {

    createFloatingShapes();
    // Obtenemos el DOM del formulario de registro
    const registerForm = document.getElementById("registerForm");
    
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Detenemos la recarga de la página
        
        // Obtenemos los datos del formulario directamente
        const data = {
            user: registerForm.user.value,
            email: registerForm.email.value,
            password: registerForm.password.value
        };
        
        // Validamos que todos los campos estén completos
        if (!data.user || !data.email || !data.password || !registerForm.passwordConfirmed.value) {
            //alert('Todos los campos son obligatorios');
            showNotification('Todos los campos son obligatorios');
            playAudio('/assets/sound/entrada.wav');

            return;
        }
    
        // Validamos que la contraseña tenga al menos 8 caracteres
        // if (data.contrasena.length < 8) {
        //     alert('La contraseña debe tener al menos 8 caracteres');
        // }
        // Validamos que la confirmación de contraseña coincida
        // if (data.password !== registerForm.passwordConfirmed.value) {
        //     alert('Las contraseñas no coinciden');
        //     return;
        // }
    
        // Enviar datos a la API
        postRegister(data);
    });

    // Función para registrar un usuario
    const postRegister = async (data) => {
        try {
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/register', 'POST', data);
    
            if (!response || !response.success || response.error) {
                //alert('Error en el registro: ' + response.error);
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');

                return;
            }
    
            //alert("Usuario: " + response.success);
            showNotification("Usuario: " +response.success);
            playAudio('assets/sound/entrada.wav');

            
    
            cleanForm();

        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }
    
    const authForm = document.getElementById("registerAuth");
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Detenemos la recarga de la página
        
        // Obtenemos los datos del formulario directamente
        const data = {
            email: authForm.email.value,
            password: authForm.password.value
        };
        
        // Validamos que todos los campos estén completos
        if (!data.email || !data.password) {
            //alert('Todos los campos son obligatorios');
            showNotification('Todos los campos son obligatorios');
            playAudio('/assets/sound/entrada.wav');

            return;
        }
    
        // Enviar datos a la API
        postAuth(data);
    });

    const postAuth = async (data) => {
        try {
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/authenticate', 'POST', data);
    
            if (!response || !response.success || response.error) {
                //alert('Error en el registro: ' + response.error);
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');

                return;
            }
    
            //alert("Usuario: " + response.success);
            showNotification("Usuario: " + response.success);
            
            // guardamos un status del logeado
            localStorage.setItem('logged', true);

            // refrescar la pagina
            setTimeout(() => {
                location.reload();
            }, 1800);
            
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }
    
    const arcadeLogout = document.getElementById("arcadeLogout");

    arcadeLogout.addEventListener("click", (e) => {
        e.preventDefault();  // Detenemos la recarga de la página
        
        // Enviar datos a la API
        postLogout();
    }
    );

    // funcion para un logout
    const postLogout = async () => {
        try {
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/logout', 'GET');
    
            if (!response || !response.success || response.error) {
                //alert('Error en el registro: ' + response.error);
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');

                return;
            }
    
            //alert("Usuario: " + response.success);
            showNotification("Usuario: " + response.success);
            // Eliminiamos el status del logeado
            localStorage.removeItem('logged');

            // refrescar la pagina
            setTimeout(() => {
                location.reload();
            }, 1600);
            
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    // Función para limpiar el formulario de registro
    const cleanForm = () => {
        registerForm.reset();
    }

});
