

const btnLogin = document.querySelector("#submit-login");
const btnLogOut = document.querySelector("#logout")


btnLogin.addEventListener("click", async() => {
    //TODO: use provided loading element
    document.getElementById("error-login").textContent = "Loading";
    setTimeout(async() => {
       
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    
    if (!email || !password) {
        document.getElementById("error-login").textContent = "Data is mandatory";
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
        //TODO: not reset values when request fail
        document.getElementById("email-login").value = "";
        document.getElementById("password-login").value = "";
        document.getElementById("error-login").textContent = "";

        if (!response.ok) {
            throw new Error(result);
        }
        
        document.getElementById("auth-section").classList.add("hidden");
        document.getElementById("logged-section").classList.remove("hidden");
     //kp.marin10@gmail.com

    } catch (err) {
        document.getElementById("error-login").textContent = err.message;
    }
}, 2000)
})

btnLogOut.addEventListener("click", () => {

    document.getElementById("logged-section").classList.add("hidden");
    document.getElementById("auth-section").classList.remove("hidden");
})