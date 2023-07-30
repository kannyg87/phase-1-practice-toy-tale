let addToy = false;
fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(el => {
      console.log(el)
      const div = document.querySelector('#toy-collection')
      div.innerHTML += `<div class="card">
        <h2>${el.name}</h2>
        <img src="${el.image}" class="toy-avatar" />
        <p>${el.likes}</p>
        <button class="like-btn" id="${el.id}">Like ❤️</button>
      </div> `;

      const likeButton = document.querySelector(`[id="${el.id}"]`);
      likeButton.addEventListener('click', () => {
        increaseLikes(el);
      });
    });
  });
;

const toyForm = document.querySelector('.add-toy-form');

toyForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(toyForm);
  const name = formData.get('name');
  const image = formData.get('image');

  const newToy = {
    name,
    image,
    likes: 0,
  };

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newToy),
  })
    .then((res) => res.json())
    .then((data) => {
      const card = createToyCard(data);
      const toyCollection = document.getElementById('toy-collection');
      toyCollection.appendChild(card);
      toyForm.reset();
    });
});


function increaseLikes(toy) {
  const updatedToy = {
    likes: toy.likes + 1,
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(updatedToy),
  })
    .then((res) => res.json())
    .then((data) => {
      const toyLikes = document.querySelector(`[id="${toy.id}"]`).previousElementSibling;
      toyLikes.textContent = `${data.likes} Likes`;
    });
}



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
