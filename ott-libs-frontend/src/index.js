USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"

const bodyYo = document.querySelector('#body-yo')
const userName = document.querySelector('#user-name')
const user = document.querySelector('#uname')
const submitUser = document.querySelector('#submit-user')
const template1 = document.querySelector('#template-1')
const playGame = document.querySelector('#play-game')

template1.style.display = 'none'
playGame.style.display = 'none'

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
          `
        }
        playGame.style.display = ''
      })
    })

})

playGame.addEventListener('click', e=>{
  user.style.display = 'none'
  submitUser.style.display = 'none'
  playGame.style.display = 'none'
  userName.style.display = 'none'
  template1.style.display = ''
})
