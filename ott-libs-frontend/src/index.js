// URLS
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"
// HTML Variable
const frontPage = document.querySelector('#front-page')
const userForm = document.querySelector('#user-form')
const signIn = document.querySelector('#signin')
const user = document.querySelector('#uname')
const userRecaps = document.querySelector('#user-recaps')
const template1 = document.querySelector('#template-1')
const temp1Form = document.querySelector('#temp1-form')
const playGame = document.querySelector('#play-game')
// All Users
let allUsers = []
// Initial Page View
template1.style.display = 'none'
playGame.style.display = 'none'
// Populate All Users
fetch(USERS_URL)
  .then(r=>r.json())
  .then(users=>{
    users.forEach(user=>{
      allUsers.push(user.name)
    })
  })
// Create New User or Show Old User's Recaps
userForm.addEventListener('submit',e=>{
  e.preventDefault()
  if (allUsers.includes(user.value)) {
    listUserRecaps()
  } else {
    debugger
    newUser()
  }
})
// Start Game
playGame.addEventListener('click', e=>{
  user.style.display = 'none'
  playGame.style.display = 'none'
  signIn.style.display = 'none'
  template1.style.display = ''
})
// Save Answers to User's Stories
temp1Form.addEventListener('submit',e=>{
  let eChild = e.target.children
  e.preventDefault()
  temp1Form.style.color = "black"
  // Create Array to Easily Save to User's Stories
  let storyArr = []
  // forEach() cannot be used with e.target.children
  // innerText of <p> will not be empty but
  // innerText of <input> will be empty
  // Need to call .value on <input>
  for (var i = 0; i < eChild.length - 1; i++) {
    if (eChild[i].innerText !== "") {
      storyArr.push(eChild[i].innerText)
    } else {
      storyArr.push(eChild[i].value)
    }
  }


})













// HELPER FETCHES
function newUser() {
  fetch(USERS_URL,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'name': user.value
    })
  })
  playGame.style.display = ''
}

function listUserRecaps() {
  fetch(RECAPS_URL)
    .then(r=>r.json())
    .then(recaps=>{
      recaps.forEach(recap=>{
        if (recap.users[0].name === user.value) {
          userRecaps.innerHTML +=`
          <ul>
          <li>${recap.users[0].name}</li>
          <li>${recap.stories.map(story=>{
            debugger
            return story.full_story}).join(" ")}
            </li>
            </ul>
            `
          }
          playGame.style.display = ''
        })
    })
}
