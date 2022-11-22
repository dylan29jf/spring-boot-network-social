const emailUser = document.getElementById("user").firstChild.data;
const fotoPerfilHeader = document.getElementById("fotoPerfilHeader");
const select_correos = document.getElementById("correos");
const contenedor_card = document.getElementById("container__card");

window.onload = async function () {
  const http = new XMLHttpRequest();
  const url = `http://localhost:5500/api/user/${emailUser}`;

  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      const response = JSON.parse(http.response);
      fotoPerfilHeader.src =
        response.url_perfil === null
          ? "https://res.cloudinary.com/datsowgd2/image/upload/v1669097557/proyecto/tmp-3-1669097556953_lbohns.png"
          : response.url_perfil;
    }
  };

  http.open("GET", url);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();

  const correos = await fetch("http://localhost:5500/api/user/").then((res) => {
    return res.json();
  });

  correos.map((e) => {
    if(e.email !== emailUser){
        const option = document.createElement("option");
        option.value = e.email;
        option.text = e.email;
        select_correos.appendChild(option);
    }
  });

  const url_message = `http://localhost:5500/api/messages/${emailUser}`;

  const arrayData = await fetch(url_message).then((res) => {
    return res.json();
  });

  contenedor_card.innerHTML = arrayData.map((element) => {
    console.log(element);
    return (`<div class="card">
    <div class="card-header d-flex justify-content-start align-items-center">
        <div>
            <img src="${(element.url_perfil === null || element.url_perfil === undefined) ? 'https://res.cloudinary.com/datsowgd2/image/upload/v1669097557/proyecto/tmp-3-1669097556953_lbohns.png' : element.url_perfil}" alt="${
      element.nombre
    }" class="rounded-circle" width="32" height="32">
        </div>
        <div class="ms-3">
            <h6 class="m-0">${element.email}</h6>
            <span>${new Date(
              element.fecha_de_envio
            ).toDateString()}</span>
        </div>
    </div>
    <div class="card-body">
      ${element.mensaje}
    </div>
  </div>`)
  })


  
};


document.getElementById("enviarMensaje").addEventListener("submit", (e) => {
    e.preventDefault();

    const receptor_email = document.getElementById("correos").value;
    const body = document.getElementById("text_mensaje").value;
      
    if (receptor_email === "null"){
        Swal.fire("Alerta","Seleccione para quien va el mensaje","warning");
        return;
    }
    if (body === ""){
        Swal.fire("Alerta","El contenido no puede estar vacio","warning");
        return;
    }

    const dataSend = {
      email_remitente: emailUser,
      mensaje: body,
      receptor_email: receptor_email
    }

    const http = new XMLHttpRequest();
    const url = `http://localhost:5500/api/messages/`;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json")
    http.send(JSON.stringify(dataSend));
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status == 200) {
        Swal.fire({
            text: "Mensaje enviado",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
            window.location.reload();
            }
        });
        }
    };


})