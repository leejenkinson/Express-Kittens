"use strict";

const output = document.getElementById("output");

document.getElementById('kittensForm').addEventListener("submit", function (event) {
    event.preventDefault();

    console.log(this);
    const form = event.target;

    const kitten = {
        name: form.kittenName.value,
        age: form.kittenAge.value,
        breed: form.kittenBreed.value,
        cuteness: form.kittenCuteness.value
    }

    axios.post("http://localhost:4494/kitten/create", kitten)
        .then(res => {
            console.log("RESPONSE: ", res);
            renderKittens();
        })
        .catch(err => console.error(err));
    
    console.log("KITTEN: ", kitten);
});

function renderKittens() {
    axios.get("http://localhost:4494/kitten/getAll")
        .then(res => {
            for (let kitten of res.data) {
                const kittenDiv = document.createElement("div");

                const kittenName = document.createElement("h2");
                kittenName.innerText = kitten.name;
                kittenDiv.appendChild(kittenName);

                const kittenAge = document.createElement("li");
                kittenAge.innerText = "Age: " + kitten.age;
                kittenDiv.appendChild(kittenAge);

                const kittenBreed = document.createElement("li");
                kittenBreed.innerText = "Breed: " + kitten.breed;
                kittenDiv.appendChild(kittenBreed);
            
                const kittenCuteness = document.createElement("li");
                kittenCuteness.innerText = "Cuteness: " + kitten.cuteness;
                kittenDiv.appendChild(kittenCuteness);
    
                output.appendChild(kittenDiv);
            }
        })
        .catch(err => console.error(err));
}

renderKittens();