const formulaire = document.querySelector("#form");


formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const lastnameRegex = /^[a-zA-Z\s]{2,30}$/
    const firstnameRegex = /^[a-zA-Z\s]{2,30}$/
    const emailRegex = /^\S+@\S+\.\S+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/


    if (!lastnameRegex.test(data.get("lastname")) || !data.get("lastname")) {
        alert("Le nom n'est pas valide")
        return
    }

    if (!firstnameRegex.test(data.get("firstname")) || !data.get("firstname")) {
        alert("Le prénom n'est pas valide")
        return
    }

    if (!emailRegex.test(data.get("email")) || !data.get("email")) {
        alert("Format d'email invalide")
        return
    }

    if (!passwordRegex.test(data.get("password")) || !data.get("password")) {
        alert("Le mot de passe est obligatoire")
        return
    }


    await createEmploye(data.get("lastname"), data.get("firstname"), data.get("email"), data.get("password"))




})

async function createEmploye(lastname, firstname, email, password) {
    const response = await fetch("http://localhost:3000/employe", {
        method: "POST",
        body: JSON.stringify({ lastname, firstname, email, motDePasse: password }),
        headers: {
            'Content-type': "application/json"
        }
    });


    window.location.href = "/src/views/login.html"
    return response;

}

