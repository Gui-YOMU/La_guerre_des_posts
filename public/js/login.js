const form = document.querySelector("#form")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    const emailRegex = /^\S+@\S+\.\S+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!emailRegex.test(data.get("email")) || !data.get("email")) {
        alert("Adresse email invalide")
        return

    }

    if (!passwordRegex.test(data.get("password"))) {
        alert("Mot de passe invalide")
        return
    }

    await login(data.get("email"), data.get("password"))

})

async function login(email, password) {
    const response = await fetch("http://localhost:3000/employe/login", {
        method: "POST",
        body: JSON.stringify({ email, motDePasse: password }),
        headers: {
            'content-type': "application/json"
        }
    })

    const data = await response.json()




    if (data.ok) {
        sessionStorage.setItem("id", data.id)
        sessionStorage.setItem("lastname", data.lastname)
        sessionStorage.setItem("firstname", data.firstname)
        sessionStorage.setItem("role", data.role)

        if (data.role == "admin") {
            window.location.href = "/src/views/index.html"
            return
        }
        window.location.href = "/src/views/tickets.html"

    } else {
        alert("Adresse email ou mot de passe incorrect")
    }

 
}