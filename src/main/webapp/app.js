/**
 * STYLE LUNA AZUL
 * Lógica principal del Front-End
 * Funciona con base_de_datos_completa.json usando Live Server
 */

/* =========================================================
   1. ESTADO GENERAL DE LA APLICACIÓN
   ========================================================= */

const AppState = {
    currentUser: null,
    users: [],
    services: [],
    barbers: [],
    appointments: [],
    inventory: [],
    sales: []
};


/* =========================================================
   2. CARGAR DATOS DESDE EL ARCHIVO JSON
   ========================================================= */

async function loadAppData() {

    try {

        const response = await fetch("./base_de_datos_completa.json");

        if (!response.ok) {
            throw new Error("No se pudo cargar la base de datos local.");
        }

        const data = await response.json();

        AppState.users = data.users || [];
        AppState.services = data.services || [];
        AppState.barbers = data.barbers || [];
        AppState.appointments = data.appointments || [];
        AppState.inventory = data.inventory || [];
        AppState.sales = data.sales || [];

        console.log("Base de datos cargada correctamente.");

    } catch (error) {

        console.error("Error cargando los datos:", error);

        alert(
            "No se pudo cargar la información del sistema. " +
            "Verifica que base_de_datos_completa.json esté en la misma carpeta."
        );
    }
}


/* =========================================================
   3. CAMBIAR ENTRE MÓDULOS
   ========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".view-module").forEach(section => {
        section.classList.remove("active");
    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.add("active");
    }
}


/* =========================================================
   4. MÓDULO DEL CLIENTE
   ========================================================= */

function renderClientModule() {

    const serviceSelect = document.getElementById("bookService");
    const barberSelect = document.getElementById("bookBarber");
    const tableBody = document.getElementById("clientAppointmentsTable");

    if (!serviceSelect || !barberSelect || !tableBody) {
        return;
    }


    /* Cargar servicios */

    serviceSelect.innerHTML = AppState.services
        .map(service => `
            <option value="${service.name}">
                ${service.name} - $${Number(service.price).toLocaleString()} COP
            </option>
        `)
        .join("");


    /* Cargar barberos */

    barberSelect.innerHTML = AppState.barbers
        .map(barber => `
            <option value="${barber.name}">
                ${barber.name}
            </option>
        `)
        .join("");


    /* Buscar citas del cliente */

    const myAppointments = AppState.appointments.filter(
        appointment =>
            appointment.client === AppState.currentUser?.name
    );


    if (myAppointments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5"
                    class="p-4 text-center text-slate-500">
                    No tienes citas agendadas.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML = myAppointments
        .map(appointment => `
            <tr>

                <td class="p-3 font-medium text-slate-200">
                    ${appointment.service}
                </td>

                <td class="p-3">
                    ${appointment.barber}
                </td>

                <td class="p-3">
                    ${appointment.datetime.replace("T", " ")}
                </td>

                <td class="p-3">
                    <span class="badge-status badge-${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>
                </td>

                <td class="p-3">

                    ${
                        appointment.status === "PENDIENTE"

                        ? `
                            <button
                                onclick="cancelAppointment(${appointment.id})"
                                class="text-rose-400 hover:text-rose-300
                                       text-xs font-semibold">

                                Cancelar

                            </button>
                        `

                        : "-"
                    }

                </td>

            </tr>
        `)
        .join("");
}


/* =========================================================
   5. MÓDULO DEL BARBERO
   ========================================================= */

function renderBarberModule() {

    const tableBody = document.getElementById("barberAgendaTable");

    if (!tableBody) {
        return;
    }


    const myAgenda = AppState.appointments.filter(
        appointment =>
            appointment.barber === AppState.currentUser?.name
    );


    if (myAgenda.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5"
                    class="p-4 text-center text-slate-500">
                    No hay servicios asignados a tu nombre.
                </td>
            </tr>
        `;

        return;
    }


    tableBody.innerHTML = myAgenda
        .map(appointment => `
            <tr>

                <td class="p-3 font-mono text-sky-400">
                    ${appointment.datetime.split("T")[1]}
                </td>

                <td class="p-3 font-medium text-slate-200">
                    ${appointment.client}
                </td>

                <td class="p-3">
                    ${appointment.service}
                </td>

                <td class="p-3">
                    <span class="badge-status badge-${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>
                </td>

                <td class="p-3 space-x-2">

                    ${
                        appointment.status === "PENDIENTE"

                        ? `
                            <button
                                onclick="updateAppointmentStatus(${appointment.id}, 'COMPLETADA')"
                                class="bg-emerald-600/30 text-emerald-300
                                       px-2.5 py-1 rounded text-xs">

                                Completar

                            </button>

                            <button
                                onclick="updateAppointmentStatus(${appointment.id}, 'CANCELADA')"
                                class="bg-rose-600/30 text-rose-300
                                       px-2.5 py-1 rounded text-xs">

                                Cancelar

                            </button>
                        `

                        : `
                            <span class="text-xs text-slate-500">
                                Finalizada
                            </span>
                        `
                    }

                </td>

            </tr>
        `)
        .join("");
}


/* =========================================================
   6. MÓDULO DEL ADMINISTRADOR
   ========================================================= */

function renderAdminModule() {

    const totalRevenue = AppState.sales.reduce(
        (total, sale) =>
            total + Number(sale.amount || 0),
        0
    );


    const lowStockCount = AppState.inventory.filter(
        product =>
            product.stock <= product.min
    ).length;


    const revenue = document.getElementById("metricRevenue");
    const appointments = document.getElementById("metricAppointments");
    const lowStock = document.getElementById("metricLowStock");
    const table = document.getElementById("adminInventoryTable");


    if (revenue) {
        revenue.textContent =
            `$${totalRevenue.toLocaleString()} COP`;
    }


    if (appointments) {
        appointments.textContent =
            AppState.appointments.length;
    }


    if (lowStock) {
        lowStock.textContent =
            `${lowStockCount} Prod.`;
    }


    if (table) {

        table.innerHTML = AppState.inventory
            .map(product => `
                <tr>

                    <td class="p-2.5 font-medium text-slate-200">
                        ${product.name}
                    </td>

                    <td class="p-2.5 font-mono">
                        ${product.stock} un.
                    </td>

                    <td class="p-2.5">

                        ${
                            product.stock <= product.min

                            ? `
                                <span class="text-amber-400
                                             font-semibold text-xs">
                                    ¡Bajo!
                                </span>
                            `

                            : `
                                <span class="text-emerald-400 text-xs">
                                    Normal
                                </span>
                            `
                        }

                    </td>

                    <td class="p-2.5">

                        <button
                            onclick="addInventoryStock(${product.id})"
                            class="text-sky-400
                                   hover:text-sky-300 text-xs">

                            + Reabastecer

                        </button>

                    </td>

                </tr>
            `)
            .join("");
    }
}


/* =========================================================
   7. CANCELAR CITA
   ========================================================= */

function cancelAppointment(id) {

    const appointment = AppState.appointments.find(
        item => item.id === id
    );


    if (!appointment) {
        return;
    }


    appointment.status = "CANCELADA";

    renderClientModule();

    alert("La cita fue cancelada.");
}


/* =========================================================
   8. ACTUALIZAR ESTADO DE UNA CITA
   ========================================================= */

function updateAppointmentStatus(id, newStatus) {

    const appointment = AppState.appointments.find(
        item => item.id === id
    );


    if (!appointment) {
        return;
    }


    appointment.status = newStatus;

    renderBarberModule();
}


/* =========================================================
   9. REABASTECER INVENTARIO
   ========================================================= */

function addInventoryStock(id) {

    const product = AppState.inventory.find(
        item => item.id === id
    );


    if (!product) {
        return;
    }


    product.stock += 5;

    renderAdminModule();

    alert(
        `Se agregaron 5 unidades de ${product.name}.`
    );
}


/* =========================================================
   10. INICIAR LA APLICACIÓN
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    await loadAppData();


    const loginForm =
        document.getElementById("loginForm");

    const btnLogout =
        document.getElementById("btnLogout");

    const bookingForm =
        document.getElementById("bookingForm");

    const posForm =
        document.getElementById("posForm");


    /* =====================================================
       LOGIN
       ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", event => {

            event.preventDefault();


            const emailInput =
                document.getElementById("email").value.trim();

            const passwordInput =
                document.getElementById("password").value.trim();

            const authMessage =
                document.getElementById("authMessage");


            const user = AppState.users.find(
                candidate =>
                    candidate.email === emailInput &&
                    candidate.password === passwordInput
            );


            if (!user) {

                authMessage.classList.remove("hidden");

                authMessage.textContent =
                    "Correo o contraseña incorrectos.";

                authMessage.style.color = "#f87171";

                return;
            }


            AppState.currentUser = user;


            document
                .getElementById("navUserSection")
                .classList.remove("hidden");


            document.getElementById("userInfoName").textContent =
                user.name;


            document.getElementById("userInfoRole").textContent =
                `Rol: ${user.role}`;


            authMessage.classList.remove("hidden");

            authMessage.textContent =
                `Bienvenido, ${user.name}.`;

            authMessage.style.color =
                "#34d399";


            /* Mostrar módulo según el rol */

            setTimeout(() => {

                if (user.role === "CLIENT") {

                    showSection("mod-client");

                    renderClientModule();

                }

                else if (user.role === "BARBER") {

                    showSection("mod-barber");

                    renderBarberModule();

                }

                else if (user.role === "ADMIN") {

                    showSection("mod-admin");

                    renderAdminModule();

                }

            }, 400);

        });
    }


    /* =====================================================
       CERRAR SESIÓN
       ===================================================== */

    if (btnLogout) {

        btnLogout.addEventListener("click", () => {

            AppState.currentUser = null;


            document
                .getElementById("navUserSection")
                .classList.add("hidden");


            loginForm.reset();

            showSection("mod-auth");
        });
    }


    /* =====================================================
       CREAR NUEVA CITA
       ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener("submit", event => {

            event.preventDefault();


            const service =
                document.getElementById("bookService").value;

            const barber =
                document.getElementById("bookBarber").value;

            const datetime =
                document.getElementById("bookDateTime").value;


            const newId =
                AppState.appointments.length > 0

                ? Math.max(
                    ...AppState.appointments.map(
                        appointment => appointment.id
                    )
                ) + 1

                : 1;


            const newAppointment = {

                id: newId,

                client: AppState.currentUser.name,

                service: service,

                barber: barber,

                datetime: datetime,

                status: "PENDIENTE"
            };


            AppState.appointments.push(newAppointment);


            alert(
                "¡Reserva confirmada con éxito!"
            );


            bookingForm.reset();

            renderClientModule();

        });
    }


    /* =====================================================
       REGISTRAR VENTA
       ===================================================== */

    if (posForm) {

        posForm.addEventListener("submit", event => {

            event.preventDefault();


            const concept =
                document.getElementById("posConcept").value;

            const amount =
                Number(
                    document.getElementById("posAmount").value
                );

            const payment =
                document.getElementById("posPayment").value;


            const newSale = {

                id: AppState.sales.length + 1,

                concept: concept,

                amount: amount,

                payment: payment
            };


            AppState.sales.push(newSale);


            posForm.reset();

            renderAdminModule();


            alert(
                "Ingreso registrado correctamente."
            );

        });
    }

});