// ===============================
// Cognito Configuration
// ===============================

const USER_POOL_ID = "us-east-1_6IfUSLyTk";

const CLIENT_ID = "3eh4kmh71ev2i324mkuiiqrsoa";


// Check Cognito SDK loaded

if (typeof AmazonCognitoIdentity === "undefined") {

    alert("Cognito SDK not loaded. Check your script imports.");

}


// Create User Pool

const poolData = {

    UserPoolId: USER_POOL_ID,

    ClientId: CLIENT_ID

};


const userPool = 
new AmazonCognitoIdentity.CognitoUserPool(poolData);





// ===============================
// REGISTER USER
// ===============================

function registerUser(){


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    const attributeList = [];



    const emailAttribute =

    new AmazonCognitoIdentity.CognitoUserAttribute({

        Name: "email",

        Value: email

    });



    attributeList.push(emailAttribute);



    userPool.signUp(

        email,

        password,

        attributeList,

        null,


        function(error,result){


            if(error){

                alert(error.message);

                return;

            }



           alert(
"Registration successful. Check your email for the verification code."
);


window.location.href="confirm.html";


        }

    );


}






// ===============================
// LOGIN USER
// ===============================

function loginUser(){



    const email =

    document.getElementById("email").value;



    const password =

    document.getElementById("password").value;



    const authenticationData = {

        Username: email,

        Password: password

    };



    const authenticationDetails =

    new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
    );



    const userData = {

        Username: email,

        Pool: userPool

    };



    const cognitoUser =

    new AmazonCognitoIdentity.CognitoUser(userData);




    cognitoUser.authenticateUser(

        authenticationDetails,


        {


            onSuccess:function(result){



                const idToken =

                result
                .getIdToken()
                .getJwtToken();



                localStorage.setItem(

                    "token",

                    idToken

                );



                localStorage.setItem(

                    "user",

                    email

                );



                alert(
                    "Login successful"
                );



                window.location.href="index.html";


            },




            onFailure:function(error){


                alert(

                    "Login failed: " + error.message

                );


            }




        }


    );


}







// ===============================
// LOGOUT USER
// ===============================

function logoutUser(){


    localStorage.removeItem("token");

    localStorage.removeItem("user");



    alert(
        "You have been logged out"
    );


    window.location.href="login.html";


}







// ===============================
// CHECK CURRENT USER
// ===============================

function getCurrentUser(){


    return localStorage.getItem("user");


}
function confirmUser(){

    const email =
    document.getElementById("email").value;


    const code =
    document.getElementById("code").value;



    const userData = {

        Username: email,

        Pool: userPool

    };


    const cognitoUser =
    new AmazonCognitoIdentity.CognitoUser(userData);



    cognitoUser.confirmRegistration(

        code,

        true,


        function(error,result){


            if(error){

                alert(error.message);

                return;

            }


            alert(
                "Account verified successfully"
            );


            window.location.href="login.html";


        }

    );

}