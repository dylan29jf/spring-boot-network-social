const emailUser = document.getElementById("user").firstChild.data;
const fotoPerfilHeader = document.getElementById("fotoPerfilHeader");
const containerCard = document.getElementById("container__card");
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

  const url_post = `http://localhost:5500/api/post/`;

  const arrayData = await fetch(url_post).then((res) => {
    return res.json();
  });

  containerCard.innerHTML = arrayData.map((element) => {
    console.log(element);
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
    <img src="${element.foto_url}" class="img-fluid" alt="${element.nombre}">
  </div>`;
  });
};

document.getElementById("postear").addEventListener("submit", async (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("text_descripcion");
  const image = document.getElementById("imagen");

  const formData = new FormData();
  formData.append("image", image.files[0]);
  formData.append("descripcion", descripcion.value);
  formData.append("email", emailUser);

  const http = new XMLHttpRequest();
  const url = `http://localhost:5500/api/post`;

  http.open("POST", url, true);
  http.send(formData);
  http.onreadystatechange = () => {
    if (http.readyState == 4 && http.status == 201) {
      Swal.fire({
        title: "Posteado",
        text: "Post creado",
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
