// script.js

// Esperamos a que el DOM esté listo
$(document).ready(function () {
  // ======================
  // Manejo de temas (Lógica de Dark/Blue y localStorage)
  // ======================
  function applyTheme(theme) {
    // 1. Quitamos posibles temas anteriores
    $("body").removeClass("theme-dark theme-blue");

    // 2. Agregamos el tema elegido
    $("body").addClass("theme-" + theme);

    // 3. Sincronizamos el selector si existe
    $("#theme-selector").val(theme);
  }

  // AL CARGAR: Aplicamos el tema guardado o 'dark' por defecto
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  // AL CAMBIAR: Guardamos y aplicamos el nuevo tema
  $("#theme-selector").on("change", function () {
    const selectedTheme = $(this).val();
    localStorage.setItem("theme", selectedTheme); // Guardamos en localStorage
    applyTheme(selectedTheme); // Aplicamos en la página actual
  });

  // ======================
  // Validación del formulario de contacto
  // (Solo se ejecuta si el formulario con el ID #contact-form existe)
  // ======================
  const $contactForm = $("#contact-form");

  if ($contactForm.length) { // Comprueba que el formulario exista en el DOM
      $contactForm.on("submit", function (event) {
          event.preventDefault(); // Evita el envío real

          // Limpiamos mensajes previos
          $(".error-text").text("");
          $("#form-message").removeClass("success error").text("");
          $("input, textarea").removeClass("input-error");

          let isValid = true;

          const name = $("#name").val().trim();
          const email = $("#email").val().trim();
          const message = $("#message").val().trim();

          // Validar nombre
          if (name === "") {
              $("#name-error").text("Por favor, ingresá tu nombre.");
              $("#name").addClass("input-error");
              isValid = false;
          }

          // Validar email
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (email === "") {
              $("#email-error").text("Por favor, ingresá tu email.");
              $("#email").addClass("input-error");
              isValid = false;
          } else if (!emailPattern.test(email)) {
              $("#email-error").text("Ingresá un email válido.");
              $("#email").addClass("input-error");
              isValid = false;
          }

          // Validar mensaje
          if (message === "") {
              $("#message-error").text("Contame brevemente qué necesitás.");
              $("#message").addClass("input-error");
              isValid = false;
          }

          if (!isValid) {
              $("#form-message").addClass("error").text("Revisá los campos marcados.");
              return; // Detenemos el proceso si hay errores
          }

          // Si todo está bien
          $("#form-message")
              .addClass("success")
              .text("¡Gracias por contactarme! Te responderé a la brevedad.");

          // Limpiamos el formulario
          this.reset();
      });
  }
});
