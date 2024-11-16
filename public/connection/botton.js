const btnLogin = document.querySelector("#submit-login");
const btnLogOut = document.querySelector("#logout")
const btnSignUp = document.querySelector('#submit-register');


btnSignUp.addEventListener("click", async() => {
    
    const regularExps = {email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,}

    document.getElementById("register-form").classList.add("loading");
    
    const name = document.getElementById("name-register").value;
    if (!name) {
        document.getElementById("error-register").textContent = "Name is required";
        document.getElementById("register-form").classList.remove("loading");
        return
    };
    
    const email = document.getElementById("email-register").value;
    if (!email || !regularExps.email.test(email)) {
            document.getElementById("error-register").textContent = "Invalid Email";
            document.getElementById("register-form").classList.remove("loading");
            return
    };

    const age = document.getElementById("age-register").value;
    if (age <= 18) {
        document.getElementById("error-register").textContent = "Age mush be over 18";
        document.getElementById("register-form").classList.remove("loading");
        return
    }

    const password = document.getElementById("password-register").value;
    if(password.length < 6) {
        document.getElementById("error-register").textContent = 'Password mush be over 6 characters';
        document.getElementById("register-form").classList.remove("loading");
         return
    }
    
    const passwordR = document.getElementById("repeated-password-register").value;
    if (password !== passwordR) {
        document.getElementById("error-register").textContent = "The passwords dont match";
        document.getElementById("register-form").classList.remove("loading");
        return
        }
    
    try {
         const response = await fetch("http://localhost:3001/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password,age})
        });
        const result = await response.json()
        
        if (!response.ok) {
            throw new Error(result)
        }

        document.getElementById("register-form").classList.remove("loading"); 
        document.getElementById("age-register").value = "";
        document.getElementById("password-register").value = "";
        document.getElementById("repeated-password-register").value = "";
        document.getElementById("email-register").value = "";
        document.getElementById("name-register").value = "";
        document.getElementById("success-register").classList.remove("hidden");        
        document.getElementById("link-show-login").click();
        //document.getElementById("auth-section").classList.add("hidden");        
        //document.getElementById("logged-section").classList.remove("hidden"); 
        //document.getElementById("login-form").classList.remove("hidden");   
        //document.getElementById("register-form").classList.add("hidden")
        
    } catch (error) {
        document.getElementById("error-register").textContent = error.message;
        document.getElementById("register-form").classList.remove("loading");
    }
})

btnLogin.addEventListener("click", async() => {
   
    document.getElementById("login-form").classList.add("loading");
    setTimeout(async() => {
       
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    
    if (!email || !password) {
        document.getElementById("error-login").textContent = "Data is mandatory";
        document.getElementById("login-form").classList.remove("loading");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/login", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email, password: password}),
        })

        const result = await response.json();
        
        document.getElementById("login-form").classList.remove("loading");

        if (!response.ok) {
            throw new Error(result);
        }
        
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("logged-section").classList.remove("hidden");
        document.getElementById("success-register").classList.add("hidden");

    } catch (err) {
        document.getElementById("error-login").textContent = err.message;
        //document.getElementById("login-form").classList.remove("loading");
    }
}, 1000)
})

btnLogOut.addEventListener("click", () => {

    document.getElementById("logged-section").classList.add("hidden");
    document.getElementById("auth-section").classList.remove("hidden");

    document.getElementById("email-login").value = "";
    document.getElementById("password-login").value = "";
})