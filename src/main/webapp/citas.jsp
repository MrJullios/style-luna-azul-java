<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Citas - Style Luna Azul</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #0f172a;
            color: #f8fafc;
            margin: 0;
            padding: 40px;
        }

        .contenedor {
            max-width: 1000px;
            margin: auto;
            background: #1e293b;
            padding: 30px;
            border-radius: 16px;
        }

        h1 {
            color: #38bdf8;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
        }

        th,
        td {
            padding: 12px;
            border-bottom: 1px solid #334155;
            text-align: left;
        }

        th {
            color: #38bdf8;
        }

        .estado {
            color: #facc15;
            font-weight: bold;
        }

        a {
            display: inline-block;
            margin-top: 25px;
            background: #0284c7;
            color: white;
            padding: 10px 18px;
            border-radius: 8px;
            text-decoration: none;
        }
    </style>
</head>

<body>

<div class="contenedor">

    <h1>🌙 Citas registradas</h1>

    <p>
        Consulta de citas almacenadas en Style Luna Azul.
    </p>

    <table>

        <thead>
        <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Barbero</th>
            <th>Fecha y hora</th>
            <th>Estado</th>
        </tr>
        </thead>

        <tbody>

        <%
            List<String[]> citas =
                    (List<String[]>) request.getAttribute("citas");

            if (citas != null && !citas.isEmpty()) {

                for (String[] cita : citas) {
        %>

        <tr>
            <td><%= cita[0] %></td>
            <td><%= cita[1] %></td>
            <td><%= cita[2] %></td>
            <td><%= cita[3] %></td>
            <td><%= cita[4] %></td>
            <td class="estado"><%= cita[5] %></td>
        </tr>

        <%
                }

            } else {
        %>

        <tr>
            <td colspan="6">
                No hay citas registradas.
            </td>
        </tr>

        <%
            }
        %>

        </tbody>

    </table>

    <a href="index.html">
        Volver al inicio
    </a>

</div>

</body>

</html>