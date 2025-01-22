package admin_flexguaraje.back_end.Pruebas_unitarias;

import admin_flexguaraje.back_end.Modelo.Cuenta;
import admin_flexguaraje.back_end.Repositorio.LoginRepositorio;
import admin_flexguaraje.back_end.Negocio.LoginNegocio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;  // Usando JUnit 5
@SpringBootTest
@AutoConfigureMockMvc
class LoginTestUnitarias {

    @InjectMocks
    private LoginNegocio loginNegocio;

    @Mock
    private LoginRepositorio loginRepositorio;

    private BCryptPasswordEncoder passwordEncoder;

    // Método que se ejecuta antes de cada prueba para inicializar los mocks y objetos
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Inicializa los mocks
        passwordEncoder = new BCryptPasswordEncoder();  // Inicializa el encriptador de contraseñas
    }

    @Test
    void testAutenticarUsuario_CredencialesValidas() {
        // Datos de prueba
        String email = "PEREZ_12345678@FLEXGUARAJE_PERU.COM";
        String password = "Password123!";
        Cuenta cuenta = new Cuenta();
        cuenta.setEmail(email);
        cuenta.setPassword(passwordEncoder.encode(password));  // Contraseña encriptada
        cuenta.setEstado(Cuenta.estadoCuenta.Activo);

        // Configuración del mock
        when(loginRepositorio.findByEmail(email)).thenReturn(Optional.of(cuenta));

        // Llamada al método que estamos probando
        Cuenta result = loginNegocio.autenticarUsuario(email, password);

        // Verificación de resultados
        assertNotNull(result);
        assertEquals(cuenta.getEmail(), result.getEmail());
        verify(loginRepositorio, times(1)).findByEmail(email);  // Verifica que el repositorio fue llamado una vez
    }

    @Test
    void testAutenticarUsuario_CredencialesInvalidas() {
        // Datos de prueba
        String email = "PEREZ_12345678@FLEXGUARAJE_PERU.COM";
        String password = "Password123!";

        // Configuración del mock
        when(loginRepositorio.findByEmail(email)).thenReturn(Optional.empty());

        // Llamada al método y verificación de excepciones
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            loginNegocio.autenticarUsuario(email, password);
        });

        assertEquals("Credenciales inválidas", thrown.getMessage());
        verify(loginRepositorio, times(1)).findByEmail(email);
    }

    @Test
    void testCambiarPassword_ContraseñasCoinciden() {
        // Datos de prueba
        String email = "PEREZ_12345678@FLEXGUARAJE_PERU.COM";
        String passwordActual = "Password123!";
        String nuevaPassword = "NewPassword123!";
        String repetirNuevaPassword = "NewPassword123!";

        Cuenta cuenta = new Cuenta();
        cuenta.setEmail(email);
        cuenta.setPassword(passwordEncoder.encode(passwordActual));  // Contraseña encriptada
        cuenta.setEstado(Cuenta.estadoCuenta.Activo);

        // Configuración del mock
        when(loginRepositorio.findByEmail(email)).thenReturn(Optional.of(cuenta));

        // Llamada al método que estamos probando
        loginNegocio.cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword);

        // Verificación de que el repositorio fue llamado para guardar la cuenta con la nueva contraseña
        verify(loginRepositorio, times(1)).save(cuenta);
    }

    @Test
    void testCambiarPassword_ContraseñasNoCoinciden() {
        // Datos de prueba
        String email = "PEREZ_12345678@FLEXGUARAJE_PERU.COM";
        String passwordActual = "Password123!";
        String nuevaPassword = "NewPassword123!";
        String repetirNuevaPassword = "DifferentPassword123!";

        // Llamada al método y verificación de excepciones
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            loginNegocio.cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword);
        });

        assertEquals("Las nuevas contraseñas no coinciden", thrown.getMessage());
    }

    @Test
    void testCambiarPassword_ContraseñaActualIncorrecta() {
        // Datos de prueba
        String email = "PEREZ_12345678@FLEXGUARAJE_PERU.COM";
        String passwordActual = "WrongPassword!";
        String nuevaPassword = "NewPassword123!";
        String repetirNuevaPassword = "NewPassword123!";

        Cuenta cuenta = new Cuenta();
        cuenta.setEmail(email);
        cuenta.setPassword(passwordEncoder.encode("Password123!"));  // Contraseña encriptada
        cuenta.setEstado(Cuenta.estadoCuenta.Activo);

        // Configuración del mock
        when(loginRepositorio.findByEmail(email)).thenReturn(Optional.of(cuenta));

        // Llamada al método y verificación de excepciones
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            loginNegocio.cambiarPassword(email, passwordActual, nuevaPassword, repetirNuevaPassword);
        });

        assertEquals("La contraseña actual es incorrecta", thrown.getMessage());
    }
}
