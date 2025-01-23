package admin_flexguaraje.back_end.Pruebas_Integracion;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CuentaTestIntegracion {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testListarCuentas() throws Exception {
        mockMvc.perform(get("/cuentas/listar_cuentas")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray()); // Verifica que la respuesta sea un array
    }

    @Test
    public void testCrearCuenta() throws Exception {
        Map<String, String> body = new HashMap<>();
        body.put("dni", "44567890");
        body.put("nombreRol", "Admin");
        body.put("password", "password123");

        mockMvc.perform(post("/cuentas/crear_cuenta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Cuenta creada exitosamente")));
    }

    @Test
    public void testCrearCuentaDniInvalido() throws Exception {
        Map<String, String> body = new HashMap<>();
        body.put("dni", "1234567A"); // DNI inválido
        body.put("nombreRol", "Administrador");
        body.put("password", "password123");

        mockMvc.perform(post("/cuentas/crear_cuenta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El DNI debe contener exactamente 8 dígitos numéricos."));
    }

    @Test
    public void testActualizarEstadoCuenta() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("dni", "12345678");

        mockMvc.perform(put("/cuentas/actualizar_estado_cuenta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Estado de la cuenta actualizado exitosamente")));
    }

    @Test
    public void testActualizarEstadoCuentaDniInvalido() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("dni", "87654321A"); // DNI inválido

        mockMvc.perform(put("/cuentas/actualizar_estado_cuenta")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El DNI debe contener exactamente 8 dígitos numéricos."));
    }

    @Test
    public void testActualizarContrasena() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("dni", "12345678");
        body.put("correo", "pérez_12345678@FLEXGUARAJE_PERU.COM");

        mockMvc.perform(put("/cuentas/actualizar_pass_automatico")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isOk())
                .andExpect(content().string("Contraseña actualizada exitosamente. La nueva contraseña se ha enviado al usuario."));
    }

    @Test
    public void testActualizarContrasenaCorreoInvalido() throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("dni", "12345678");
        body.put("correo", "correo_invalido@dominio.com"); // Correo con formato inválido

        mockMvc.perform(put("/cuentas/actualizar_pass_automatico")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("El correo debe tener el formato: apellidoPaterno + DNI + @FLEXGUARAJE_PERU.COM"));
    }
}
