// ===============================
// Protect BookWise Application
// ===============================

function checkLogin(){

    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");


    // If user is not authenticated,
    // redirect to login page

    if(!user || !token){

        window.location.href = "login.html";

    }

}


// Run login check only on index.html

if(window.location.pathname.endsWith("index.html") 
   || window.location.pathname === "/"){

    checkLogin();

}



// ===============================
// Dark Mode
// ===============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

}



// ===============================
// Scroll to Books Section
// ===============================

function scrollBooks(){

    document
    .getElementById("books-section")
    .scrollIntoView({

        behavior:"smooth"

    });

}



// ===============================
// Login Placeholder
// ===============================

function showLogin(){

    window.location.href = "login.html";

}



// ===============================
// Signup Placeholder
// ===============================

function showSignup(){

    window.location.href = "register.html";

}