const userName = document.querySelector('#user-name')
const user = document.querySelector('#uname')
const submitUser = document.querySelector('#submit-user')
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"

submitUser.addEventListener('click',e=>{

  fetch(RECAPS_URL)
    .then(r=>r.json())
    .then(recaps=>{
      recaps.forEach(recap=>{
        if (recap.users[0].name === user.value) {
          userName.innerHTML +=`
            <ul>
              <li>${recap.users[0].name}</li>
              <li>${recap.stories.map(story=>{
                return story.words}).join(" ")}
              </li>
            </ul>
            <br>
            <br>
            <input type="submit" value="Play" id="play-game">
          `
        }
      })
    })

})
