package admin_flexguaraje.back_end.Negocio;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EnvioCorreo {
    @Autowired
    private JavaMailSender javaMailSender;

    public void enviarCorreo(String destinatario, String nuevaContrasena) {
        try {
            String asunto = "Nueva Contraseña";
            String contenido = "Su nueva contraseña es: " + nuevaContrasena;

            MimeMessage mensaje = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true);

            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(contenido, true);

            javaMailSender.send(mensaje);
        } catch (MessagingException | MailException e) {
            e.printStackTrace();  // Loguear detalles de la excepción
        }
    }

}
