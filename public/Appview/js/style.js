var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        console.log("dssd");
    }
    slides[slideIndex - 1].style.display = "block";
}

function myfunction() {
    var x = 1024;
    var y = 9999;
    var deg = Math.floor(Math.random() * (x - y)) + y;
    document.getElementById("box").style.transform = "rotate(" + deg + "deg)";
    var element = document.getElementById("mainbox");
    element.classList.remove("animate");
    setTimeout(function () {
        element.classList.add("animate");
        var valueList = ["5", "6", "7", "8", "0", "1", "10", "9"];
        var getValue = valueList[Math.floor(Math.random() * valueList.length)];
        alert(getValue);
    }, 5000);
}
