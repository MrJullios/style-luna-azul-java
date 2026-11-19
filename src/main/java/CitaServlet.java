import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/citas")
public class CitaServlet extends HttpServlet {

    @Override
    protected void doPost(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        String cliente =
                request.getParameter("cliente");

        String servicio =
                request.getParameter("servicio");

        String barbero =
                request.getParameter("barbero");

        String fechaHoraTexto =
                request.getParameter("fechaHora");

        try {

            LocalDateTime fechaHora =
                    LocalDateTime.parse(fechaHoraTexto);

            Cita cita =
                    new Cita(
                            cliente,
                            servicio,
                            barbero,
                            fechaHora,
                            "PENDIENTE"
                    );

            CitaDAO citaDAO =
                    new CitaDAO();

            boolean guardada =
                    citaDAO.insertar(cita);

            if (guardada) {

                response.getWriter().println(
                        "<h1>🌙 ¡Cita agendada!</h1>"
                );

                response.getWriter().println(
                        "<p>Tu próximo look está cada vez más cerca. "
                        + "Te esperamos en Style Luna Azul.</p>"
                );

                response.getWriter().println(
                        "<p><strong>Cliente:</strong> "
                        + cliente + "</p>"
                );

                response.getWriter().println(
                        "<p><strong>Servicio:</strong> "
                        + servicio + "</p>"
                );

                response.getWriter().println(
                        "<p><strong>Barbero:</strong> "
                        + barbero + "</p>"
                );

                response.getWriter().println(
                        "<p><strong>Fecha y hora:</strong> "
                        + fechaHora + "</p>"
                );

                response.getWriter().println(
                        "<p><a href=\"citas\">Ver citas registradas</a></p>"
                );

            } else {

                response.getWriter().println(
                        "<h1>No fue posible guardar la cita.</h1>"
                );
            }

        } catch (Exception error) {

            response.getWriter().println(
                    "<h1>Error al registrar la cita</h1>"
            );

            response.getWriter().println(
                    "<p>" + error.getMessage() + "</p>"
            );
        }
    }


    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {

        CitaDAO citaDAO =
                new CitaDAO();

        List<Cita> citas =
                citaDAO.listar();

        List<String[]> datosCitas =
                new ArrayList<>();

        for (Cita cita : citas) {

            datosCitas.add(
                    new String[]{
                            String.valueOf(cita.getId()),
                            cita.getCliente(),
                            cita.getServicio(),
                            cita.getBarbero(),
                            String.valueOf(cita.getFechaHora()),
                            cita.getEstado()
                    }
            );
        }

        request.setAttribute(
                "citas",
                datosCitas
        );

        request
                .getRequestDispatcher("/citas.jsp")
                .forward(request, response);
    }
}