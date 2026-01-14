const movies = [
    { title: "Inception", rating: 8.8, year: 2010, isNetflix: true },
    { title: "Interstellar", rating: 8.6, year: 2014, isNetflix: false },
    { title: "Parasite", rating: 8.5, year: 2019, isNetflix: true },
    { title: "Avatar", rating: 7.8, year: 2009, isNetflix: true },
    { title: "The Dark Knight", rating: 9.0, year: 2008, isNetflix: true }
]

//영화 목록 렌더링 함수
function renderMovies(movie) {
    const list = document.querySelector("#movieList")
    list.innerHTML = ""

    //리스트에 영화가 없을 때
    if (movie.length === 0) {
        const li = document.createElement("li");
        li.textContent = "영화가 없습니다";
        list.appendChild(li);
        return
    }

    //리스트에 영화가 있을 때
    movie.forEach(movie => {
        const li = document.createElement("li");
        li.textContent = `${movie.title}(${movie.year}) - ${movie.rating}`;
        list.appendChild(li);
    });
}

let currentMovies = movies

// 넷플릭스 영화 보기 버튼
const netflixButton = document.getElementById("netflixButton")
netflixButton.addEventListener("click", () => {
    currentMovies = movies.filter((movie) => movie.isNetflix)
    renderMovies(currentMovies)
})

//전체 영화 보기 버튼
const entireMovieButton = document.getElementById("entireMovieButton")
entireMovieButton.addEventListener("click", () => {
    currentMovies = movies
    renderMovies(currentMovies)
})

//평점 낮은 순 버튼
const lowestRatingButton = document.getElementById("lowestRating")
lowestRatingButton.addEventListener("click", () => {
    currentMovies = currentMovies.slice().sort(function(a,b) {
        return a.rating - b.rating
    })
    renderMovies(currentMovies)
})

//평점 높은 순
const highestRatingButton = document.getElementById("highestRating")
highestRatingButton.addEventListener("click", () => {
    currentMovies = currentMovies.slice().sort(function(a,b) {
        return b.rating - a.rating
    })
    renderMovies(currentMovies)
})

//검색하는 함수(검색 기능)
function movieSearch() {
    const inputValue = document.getElementById("movieSearch").value.toLowerCase()
    currentMovies = currentMovies.slice().filter((movie) => movie.title.toLowerCase().includes(inputValue.toLowerCase()))
    renderMovies(currentMovies)
}