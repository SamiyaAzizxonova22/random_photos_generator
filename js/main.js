const rasmlar = document.querySelector(".photos__list");
const form = document.querySelector(".form");
const error = document.querySelector('.value_error')


form.addEventListener("submit", (e) => {
	e.preventDefault();
	const api = `https://api.unsplash.com/search/photos/?page=1&query=${form.input.value}&client_id=PYYovcuRItu-VvSKDkIOgkLY8QDIQ5X8CXQijeIUxgU`;
	getTodos(api)
		.then((data) => {
			// getTodos(data);
			// console.log("ishladi");
			showPhotos(data);
		})
		.catch((err) => {
			console.log(err, "xatolik mavjud");
		});
});

const getTodos = (resurse) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.addEventListener("readystatechange", () => {
			if (request.readyState === 4 && request.status === 200) {
				const data = JSON.parse(request.responseText);
				resolve(data);
        error.textContent = ''
        rasmlar.style.display = 'grid'


			} else if(request.readyState === 4 && form.input.value.length === 0){
        error.textContent = "Iltimos yoqtirgan rasmingiz nomini kiriting !!!"
        rasmlar.style.display = 'none'

			}
			else if (request.readyState === 4) {
				reject(
					error.textContent = "Iltimos yoqtirgan rasmingiz nomini kiriting !!!"
				);
        rasmlar.style.display = 'none'
			}
		});

		request.open("GET", resurse);
		request.send();
	});
};
getTodos(
	`https://api.unsplash.com/photos/?client_id=PYYovcuRItu-VvSKDkIOgkLY8QDIQ5X8CXQijeIUxgU`
)
	.then((data) => {
		// getTodos(data);
		// console.log("ishladi");
		showPhotos(data);
	})
	.catch((err) => {
		console.log(err, "xatolik mavjud");
	});



function showPhotos(foto) {
	rasmlar.innerHTML = "";
	(foto.results ? foto.results : foto).forEach((item) => {
		const { likes, user, urls } = item;

		rasmlar.innerHTML += `
		<li class="photos__item">
    <img class="photos__img" src="${urls.regular}" alt="" />
      <div class="photos__info">
        <div>
          <h5 class="name">${user.name}</h5>
          <p class="likes">${likes} likes</p>
        </div>
        <img class="photos__avtor" src="${user.profile_image.small}" alt="" />
      </div>
  </li>
	`;
	});
}

// https://api.unsplash.com/photos/?client_id=PYYovcuRItu-VvSKDkIOgkLY8QDIQ5X8CXQijeIUxgU
