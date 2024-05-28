// onclick="toggelMenu() not in use"
// const subMenu = document.getElementById("subMenu");
// function toggelMenu() {
//     subMenu.classList.toggle("open-menu");    
// }
window.onclick = function(event) {
    var userImage = document.getElementById("userImage");
    var subMenu = document.getElementById("subMenu");

    if(event.target === userImage){
        subMenu.classList.toggle("open-menu"); // Toggle class to open/close menu
    } else {
        subMenu.classList.remove("open-menu"); // Close menu if clicked outside userImage
    }
};
