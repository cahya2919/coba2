// 1. Menu HP (tombol burger) dan dropdown
var burger = document.getElementById("burger");
var menu = document.getElementById("menu");
burger.addEventListener("click", function () { menu.classList.toggle("show"); });
document.querySelectorAll(".dd > a").forEach(function (a) {
  a.addEventListener("click", function (e) {
    if (window.innerWidth <= 800) { // di HP: klik pertama membuka submenu
      var li = a.parentElement;
      if (!li.classList.contains("open")) { e.preventDefault(); li.classList.add("open"); }
    }
  });
});

// 2. Jam digital
function tampilJam() {
  var el = document.getElementById("clock");
  if (!el) return;
  var now = new Date();
  el.textContent = now.toLocaleTimeString("id-ID");
  document.getElementById("date").textContent =
    now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
tampilJam(); setInterval(tampilJam, 1000);

// 3. Tahun di footer
document.getElementById("year").textContent = new Date().getFullYear();

// 4. Penghitung kunjungan (disimpan di browser)
try {
  var n = Number(localStorage.getItem("kunjungan") || 0) + 1;
  localStorage.setItem("kunjungan", n);
  document.getElementById("visit").textContent = n;
} catch (e) {}

// 5. Foto berjalan (slideshow) di Home
var slides = document.querySelectorAll(".slide");
if (slides.length) {
  var i = 0;
  setInterval(function () {
    slides[i].classList.remove("on");
    i = (i + 1) % slides.length;
    slides[i].classList.add("on");
  }, 3000);
}

// 6. Validasi form (Registration & Contact)
function pasangForm(idForm, idPesan, teksSukses) {
  var form = document.getElementById(idForm);
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var pesan = document.getElementById(idPesan);
    var salah = 0;
    form.querySelectorAll("[required]").forEach(function (f) {
      var kosong = f.value.trim() === "";
      var emailJelek = f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value);
      f.classList.toggle("err", kosong || emailJelek);
      if (kosong || emailJelek) salah++;
    });
    if (salah > 0) {
      pesan.textContent = "Mohon lengkapi " + salah + " kolom yang ditandai merah.";
      pesan.className = "msg bad";
    } else {
      pesan.textContent = teksSukses;
      pesan.className = "msg ok";
      form.reset();
    }
  });
}
pasangForm("regForm", "regMsg", "Terima kasih! Pendaftaran Anda sudah kami terima.");
pasangForm("contactForm", "contactMsg", "Pesan terkirim. Kami akan membalas lewat email.");
