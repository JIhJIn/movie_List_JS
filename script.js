const movies = [
    { title: "Inception", rating: 8.8, year: 2010, isNetflix: true },
    { title: "Interstellar", rating: 8.6, year: 2014, isNetflix: false },
    { title: "Parasite", rating: 8.5, year: 2019, isNetflix: true },
    { title: "Avatar", rating: 7.8, year: 2009, isNetflix: true },
    { title: "The Dark Knight", rating: 9.0, year: 2008, isNetflix: true }
]

//상태 관리 객체
const state = {
    netflixOnly : false,
    sortType : null,
    searchKeyword : ""
}

function setNetfilxOnly(value) {
    state.netflixOnly = value
    updateView()
}

function setSortType(type) {
    state.sortType = type
    updateView()
}

function setSearchKeyword(keyword) {
    state.searchKeyword = keyword
    updateView()
}


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


// 계산 함수
function updateView() {
    let result = movies
    
    //넷플릭스 영화 버튼(true)/전체 영화 버튼(false)
    if(state.netflixOnly) {
        result = result.filter((movie) => movie.isNetflix)
    }

    //평점 높은순 버튼
    if(state.sortType === "ascending") {
        result = result.slice().sort((a,b) => b.rating - a.rating)
    }
    //펑점 낮은순 버튼
    if(state.sortType === "descending") {
        result = result.slice().sort((a,b) => a.rating - b.rating)
    }
    //키보드 인풋 상황
    if(state.searchKeyword) {
        result = result.slice().filter((movie) => movie.title.toLowerCase().includes(state.searchKeyword))
    }

    renderMovies(result)
}

// 넷플릭스 영화 보기 버튼
const netflixButton = document.getElementById("netflixButton")
netflixButton.addEventListener("click", () => {
    setNetfilxOnly(true)
})

//전체 영화 보기 버튼
const entireMovieButton = document.getElementById("entireMovieButton")
entireMovieButton.addEventListener("click", () => {
    setNetfilxOnly(false)
})

//평점 낮은 순 버튼
const lowestRatingButton = document.getElementById("lowestRating")
lowestRatingButton.addEventListener("click", () => {
    setSortType("descending")
})

//평점 높은 순
const highestRatingButton = document.getElementById("highestRating")
highestRatingButton.addEventListener("click", () => {
    setSortType("ascending")
})

//검색하는 함수(검색 기능)
function movieSearch() {
    const inputValue = document.getElementById("movieSearch").value.toLowerCase()
    setSearchKeyword(inputValue)
}

//초기 화면
function init() {
    updateView()
}

init()