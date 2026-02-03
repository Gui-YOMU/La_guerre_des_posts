const formulaire = document.querySelector("#form");


formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    await createEmploye(data.get("lastname"), data.get("firstname"), data.get("email"), data.get("password"))
})

async function createEmploye(lastname, firstname, email, password){
    const response = await fetch("http://localhost:3000/employe",{
        method:"POST",
        body: JSON.stringify ({lastname, firstname, email, password}),
        headers:{
            'Content-type' : "application/json"
        }
    });
    return response;
}

