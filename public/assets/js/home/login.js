document.addEventListener("DOMContentLoaded", () => {

    // Obtenemos el DOM del formulario de registro
    const registerForm = document.getElementById("registerForm");
    
    // Evento que se dispara cuando el formulario de registro es enviado
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Detenemos la recarga de la página por defecto
        
        // Obtenemos los datos del formulario directamente
        const data = {
            user: registerForm.user.value,        // Nombre de usuario
            email: registerForm.email.value,      // Correo electrónico
            password: registerForm.password.value // Contraseña
        };
        
        // Validamos que todos los campos estén completos
        if (!data.user || !data.email || !data.password || !registerForm.passwordConfirmed.value) {
            // Si falta algún campo, mostramos una notificación
            showNotification('Todos los campos son obligatorios');
            playAudio('/assets/sound/entrada.wav'); // Reproducimos un sonido de alerta

            return;
        }
              
        // Enviar los datos a la API para registro
        postRegister(data);
    });

    // Función para limpiar el formulario de registro
    function cleanForm()
    {
        registerForm.reset(); // Restablece todos los campos del formulario
    }

    // Función para registrar un usuario mediante una solicitud POST
    const postRegister = async (data) => {
        try {
            // Llamada a la función FetchData para realizar la solicitud POST con los datos de registro
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/register', 'POST', data);
    
            // Verificamos si la respuesta contiene errores o si no fue exitosa
            if (!response || !response.success || response.error) {
                // Muestra un mensaje de error y reproduce un sonido
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');
                return;
            }
    
            // Si el registro fue exitoso, mostramos el mensaje correspondiente
            showNotification("Usuario: " + response.success);
            playAudio('assets/sound/entrada.wav');

            // Limpiar el formulario después de un registro exitoso
            cleanForm();

        } catch (error) {
            console.error("Error en el registro:", error); // Si ocurre un error en la solicitud
        }
    }
    
    // Obtenemos el formulario de autenticación (login)
    const authForm = document.getElementById("registerAuth");
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();  // Detenemos la recarga de la página por defecto
        
        // Obtenemos los datos del formulario de autenticación
        const data = {
            email: authForm.email.value,        // Correo electrónico
            password: authForm.password.value   // Contraseña
        };
        
        // Validamos que los campos de autenticación no estén vacíos
        if (!data.email || !data.password) {
            // Si falta algún campo, mostramos una notificación
            showNotification('Todos los campos son obligatorios');
            playAudio('/assets/sound/entrada.wav'); // Reproducimos un sonido de alerta
            return;
        }
    
        // Enviar los datos a la API para autenticación (login)
        postAuth(data);
    });

    // Función para autenticar a un usuario mediante una solicitud POST
    const postAuth = async (data) => {
        try {
            // Llamada a la función FetchData para realizar la solicitud POST con los datos de autenticación
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/authenticate', 'POST', data);
    
            // Verificamos si la respuesta contiene errores o si no fue exitosa
            if (!response || !response.success || response.error) {
                // Muestra un mensaje de error y reproduce un sonido
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');
                return;
            }
    
            // Si la autenticación fue exitosa, mostramos el mensaje correspondiente
            showNotification("Usuario: " + response.success);
            
            // Guardamos el estado de que el usuario está logueado en el almacenamiento local
            localStorage.setItem('logged', true);

            // Recargamos la página después de 1.8 segundos para aplicar el cambio
            setTimeout(() => {
                location.reload();
            }, 1800);
            
        } catch (error) {
            console.error("Error en el registro:", error); // Si ocurre un error en la solicitud
        }
    }
    
    // Obtenemos el botón de logout (cerrar sesión)
    const arcadeLogout = document.getElementById("arcadeLogout");
    if(arcadeLogout)
    {
        arcadeLogout.addEventListener("click", (e) => {
            e.preventDefault();  // Detenemos la recarga de la página por defecto
            
            // Enviar datos a la API para cerrar sesión
            postLogout();
        });
    }

    // Función para cerrar sesión del usuario mediante una solicitud GET
    const postLogout = async () => {
        try {
            // Llamada a la función FetchData para realizar la solicitud GET de logout
            let response = await FetchData('http://localhost/ahorcados_minijuego/usuario/login/logout', 'GET');
    
            // Verificamos si la respuesta contiene errores o si no fue exitosa
            if (!response || !response.success || response.error) {
                // Muestra un mensaje de error y reproduce un sonido
                showNotification(response.error);
                playAudio('assets/sound/entrada.wav');
                return;
            }
    
            // Si el logout fue exitoso, mostramos el mensaje correspondiente
            showNotification("Usuario: " + response.success);

            // Eliminamos el estado de logueo del almacenamiento local
            localStorage.removeItem('logged');

            // Recargamos la página después de 1.6 segundos para aplicar el cambio
            setTimeout(() => {
                location.reload();
            }, 1600);
            
        } catch (error) {
            console.error("Error en el registro:", error); // Si ocurre un error en la solicitud
        }
    }

});
