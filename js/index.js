const saveData = (event) => {

    event.preventDefault();

    // Retrieve - Start
    const email = document.getElementById("email").value;
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const con_password = document.getElementById("con_pass").value;
    // Retrieve - End

    // Storage Check - Start
    let data = JSON.parse(localStorage.getItem("users")) || [];
    // Storage Check - End

    // Validation - Start
    let isEmailExist = data.some(user => user.email === email);
    let isUserExist = data.some(user => user.username === username);
    if (isEmailExist) {
        alert("Email already exists!");
        return;
    }
    if (isUserExist) {
        alert("Username already exists!");
        return;
    }
    if (password !== con_password){
        alert("Password Tidak Cocok");
        return;
    }
    if(password.length < 5){
        alert("Password Minimal 5 huruf atau angka !");
        return;
    }
    // Validation - End

    // Saving - Start
    alert("Berhasil");
    data.push({email,username,password});
    localStorage.setItem("users", JSON.stringify(data));
    // Saving - End
    return window.location.href = "login.html";
};

// Define the arrow function to handle login
const handleLogin = (event) => {
    // Prevent the form from submitting
    event.preventDefault();

    // Get the input values
    let username = document.getElementById("user").value;
    let password = document.getElementById("pass").value;

    if(username === "admin" && password === "123"){
      sessionStorage.setItem("username", user.username);
      window.location.href = "../admin/dataPendaftar.html";
    }else{
    // Get the users array from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the matching email and password
    let user = users.find(user => user.username === username && user.password === password);

    // If user is not found, show error message
    if (!user) {
        alert("Incorrect email or password!");
        return;
    }

    // Set session storage with user name and redirect to welcome page
    sessionStorage.setItem("username", user.username);
    window.location.href = "index.html";
  }
};


const showGreeting = (username) => {
//   const divElement = document.getElementById('sambutan');
  const waktuElement = document.getElementById('waktu');
  const namaElement = document.getElementById('nama');
  const now = new Date();
  const hour = now.getHours();
  // let usernames = sessionStorage.getItem("username");

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'Selamat pagi, ';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Selamat siang, ';
  } else {
    greeting = 'Selamat malam, ';
  }

  waktuElement.innerHTML = greeting;
  namaElement.innerHTML = username;
};

document.addEventListener('DOMContentLoaded', () => {
  const username = sessionStorage.getItem("username");
  showGreeting(username);
});


const submitForm = (event) => {
  event.preventDefault();
  const nama = document.getElementById("name").value;
  const alamat = document.getElementById("alamat").value;
  const telepon = document.getElementById("number").value;
  const email = document.getElementById("email").value;
  const pendidikan = document.querySelector('input[name="pendidikan"]:checked').value;
  const alasan = document.getElementById("alasan").value;
  const informasi = [];
  document.querySelectorAll('input[name="informasi"]:checked').forEach(element => {
    informasi.push(element.value);
  });

  const foto = document.getElementById("foto").files[0];
  // cek apakah nama pengguna sudah terdaftar
  const pendaftar = JSON.parse(sessionStorage.getItem("pendaftar")) || [];
  const daftarNama = pendaftar.map(user => user.nama);
  if (daftarNama.includes(nama)) {
    alert("Nama pengguna sudah terdaftar!");
    return;
  }

  const data = { nama,alamat,telepon, email,pendidikan,informasi,alasan,foto};
  pendaftar.push(data);
  sessionStorage.setItem("pendaftar", JSON.stringify(pendaftar));
  alert("Registrasi berhasil!");
  event.target.reset();
};




function saveDaftar() {
  // ambil data nama dari input
  const nameInput = document.getElementById("name");
  const name = nameInput.value;
  const alamatInput = document.getElementById("alamat");
  const alamat = alamatInput.value;
  const numberInput = document.getElementById("number");
  const number = numberInput.value;
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const jenjang = document.querySelector('input[name="pendidikan"]:checked').value;
  const alasanInput = document.getElementById("alasan");
  const alasan = alasanInput.value;
  const informasi = [];
  const checkboxes = document.getElementsByName("informasi");
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      informasi.push(checkboxes[i].value);
    }
  }

  // ambil data multi user dari session storage atau buat array kosong jika belum ada
  const userData = JSON.parse(sessionStorage.getItem("users")) || [];

  // tambahkan informasi nama dan gambar ke dalam array multi user
  userData.push({ name,alamat,number,email,jenjang,alasan,informasi});

  // simpan array multi user ke dalam session storage
  alert("Berhasil Daftar");
  sessionStorage.setItem("users", JSON.stringify(userData));
  document.getElementById("my-form").reset();
  window.location.href = 'index.html';

}

function displayData() {

  // ambil data multi user dari session storage atau buat array kosong jika belum ada
  const userData = JSON.parse(sessionStorage.getItem("users")) || [];

  // tampilkan setiap objek pada array multi user pada halaman web
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  let counter = 1;
  userData.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("card");
    userCard.innerHTML = `
    <section id="tampilan-card">
      <div class="card-body">
        <h5 class="card-title">No. ${counter}</h5>
        <p class="card-text">${user.name}</p>
        <p class="card-text">${user.alamat}</p>
        <p class="card-text">${user.number}</p>
        <p class="card-text">${user.email}</p>
        <p class="card-text">${user.jenjang}</p>
        <p class="card-text">${user.alasan}</p>
        <p class="card-text">${user.informasi}</p>

        <button onclick="deleteUser(${counter - 1})">Hapus</button>
      </div>
    </section>
    `;
    userList.appendChild(userCard);
    counter++;
  });
}
function deleteUser(index) {
      const userData = JSON.parse(sessionStorage.getItem("users"));
      userData.splice(index, 1);
      sessionStorage.setItem("users", JSON.stringify(userData));
      displayData();
    }