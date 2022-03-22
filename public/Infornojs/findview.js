findscreen();

function findscreen() {;
    console.log(mobileDetect())
    if (mobileDetect() == true) {
        window.location.href = './pannel';
    } else {
        window.location.href = './Pannel';
    }

}
function mobileDetect() {
    return !!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}