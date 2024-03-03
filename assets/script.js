
const loadData = (search) => {
    // proccessData(true);
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadCards(data);
            proccessData(false); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            proccessData(false); 
        });
  
}

function search() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value
      loadData(searchValue) 
}

document.getElementById('search-btn').addEventListener('click',()=>{
    proccessData(true)
    search()
})

loadData('')

const loadCards = (data) => {
    const posts = data.posts;
    // getting the container
    const cardContainer = document.getElementById('cardContainer')
    cardContainer.innerHTML=``
    if (posts.length>0) {
        const loading=document.getElementById('loading')
        loading.classList.add("hidden") 
    }
    posts.forEach((cards) => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-10 bg-[#aaf3c631] p-10 mb-6 rounded-xl">
            <div class="relative lg:w-1/12">
                <img src="${cards.image}" alt="" class="rounded-xl">
                <div class="absolute top-0 right-0 w-5 h-5 rounded-full bg-red-600"></div>
            </div>
            <div class="space-y-4 w-full">
                <span># ${cards.category}</span> <span class="lg:px-6">Author :  ${cards.author.name}</span>
                <p class="text-xl font-bold">${cards.title}</p>
                <p>${cards.description}</p>
                <hr class = "border-dashed">
                <div class="flex flex-col lg:flex-row space-y-10 lg:space-y-0 justify-between items-center">
                    <div class="space-x-6">
                        <span><i class="fa-regular fa-comment"></i> ${cards.comment_count}</span>
                        <span><i class="fa-solid fa-eye"></i> ${cards.view_count}</span>
                        <span><i class="fa-solid fa-clock"></i> ${cards.posted_time}</span>
                    </div>
                    <div class=""><button class="btn"><i class="fa-solid fa-envelope fa-xl" style="color: #63E6BE;"></i></button></div>
                </div>
            </div>
        </div>


        `;
    cardContainer.appendChild(card)
    });
}








const loadLatest = async () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
    const res = await fetch(url)
    const data = await res.json()
    const cardsContainer = document.getElementById('latestCardsContainer')
    data.forEach( (cards) => {
        const div = document.createElement('div')
        div.classList= `card card-compact bg-base-100 shadow-xl`
        div.innerHTML = `
        <figure><img src="${cards.cover_image}" alt="Shoes" /></figure>
        <div class="card-body">
          <P><i class="fa-solid fa-calendar-days"></i> ${cards.author.posted_date? cards.author.posted_date :' No Publish Date'}</P>
          <h1 class="text-xl font-extrabold">${cards.title}</h1>
          <p>${cards.description}</p>
            <div class="flex gap-4 items-center">
                <div class="w-1/4"><img src="${cards.profile_image}" alt="" class="rounded-xl"></div>
                <div class="">
                    <p class="text-xl">${cards.author.name}</p>
                    <p>${cards.author.designation? cards.author.designation : 'Unknown'}</p>
                </div>
            </div>
        </div>
        `;
        cardsContainer.appendChild(div)
    })
}

loadLatest()

const proccessData = (isLoad) => {
   const loading=document.getElementById('loading')
   if (isLoad) {
    loading.classList.remove("hidden")
} else {
    loading.classList.add("hidden") 
}
}