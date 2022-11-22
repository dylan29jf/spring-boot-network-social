// const CLOUDIN_URL = "CLOUDINARY_URL=cloudinary://946294516624134:i7xijrjqBndOxZRf9UXKaXNshNo@datsowgd2"
// const CLOUDIN_UPLOAD_PRESET = "ofaztj2u"

//var cl = new cloudinary.Cloudinary({cloud_name: "datsowgd2", secure: true});

const emailUser = document.getElementById("user").firstChild.data;
const containerCard = document.getElementById("container__card");
const fotoPerfilHeader = document.getElementById("fotoPerfilHeader");
let nombre = document.getElementById("nombre");
let genero = document.getElementById("generoPerfil");
let foto = document.getElementById("fotoPerfil");
let nacimiento = document.getElementById("nacimiento");
let text_nombre = document.getElementById("text_nombre");
let text_apellido = document.getElementById("text_apellidos");
let text_fecha = document.getElementById("text_nacimiento");
let text_genero = document.getElementById("text_genero");

window.onload = async function () {
  const http = new XMLHttpRequest();
  const url = `http://localhost:5500/api/user/${emailUser}`;

  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      const response = JSON.parse(http.response);

      nombre.innerHTML = response.nombre + " " + response.apellido;

      genero.innerHTML =
        response.genero === null ? "No hay genero" : response.genero;

      nacimiento.innerHTML =
        response.fecha === null ? "No hay fecha" : response.fecha;

      foto.src =
        response.url_perfil === null
          ? "https://res.cloudinary.com/datsowgd2/image/upload/v1669093326/usuario_2_bgxmoh.png"
          : response.url_perfil;

      fotoPerfilHeader.src =
        response.url_perfil === null
          ? "https://res.cloudinary.com/datsowgd2/image/upload/v1669097557/proyecto/tmp-3-1669097556953_lbohns.png"
          : response.url_perfil;
          
      text_nombre.value = response.nombre;
      text_apellido.value = response.apellido;
      text_genero.value = response.genero;
      text_fecha.value = response.fecha === null ? "" : response.fecha;
      text_genero.value = response.genero === null ? "" : response.genero;
    }
  };

  http.open("GET", url);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();

  const url_post = `http://localhost:5500/api/post/${emailUser}`;

  const arrayData = await fetch(url_post).then((res) => {
    return res.json();
  });

  containerCard.innerHTML = arrayData.map((element) => {
    return `<div class="card">
    <div class="card-header d-flex justify-content-start align-items-center">
        <div>
            <img src="${(element.url_perfil === null || element.url_perfil === undefined) ? 'https://res.cloudinary.com/datsowgd2/image/upload/v1669097557/proyecto/tmp-3-1669097556953_lbohns.png' : element.url_perfil}" alt="${
      element.nombre
    }" class="rounded-circle" width="32" height="32">
        </div>
        <div class="ms-3">
            <h6 class="m-0">${element.email}</h6>
            <span>${new Date(
              element.fecha_de_publicacion
            ).toDateString()}</span>
        </div>
    </div>
    <div class="card-body">
      ${element.descripcion}
    </div>
    <img src="${element.foto_url}" class="img-fluid" alt="...">
  </div>`;
  });
};

document.getElementById("actualizarDatos").addEventListener("submit", (e) => {
  e.preventDefault();

  let img_perfil = document.getElementById("img_perfil");

  const formData = new FormData();
  formData.append("image", img_perfil.files[0]);
  formData.append("nombre", text_nombre.value);
  formData.append("apellido", text_apellido.value);
  formData.append("fecha", text_fecha.value);
  formData.append("genero", text_genero.value);

  const http = new XMLHttpRequest();
  const url = `http://localhost:5500/api/user/${emailUser}`;

  http.open("PATCH", url, true);
  http.send(formData);
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 200) {
      Swal.fire({
        title: "Actualizado",
        text: "Datos actualizados correctamente",
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
});
