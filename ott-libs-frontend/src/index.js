// URLS
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"
// HTML Variable
const frontPage = document.querySelector('#front-page')
const userForm = document.querySelector('#user-form')
const signIn = document.querySelector('#signin')
const userName = document.querySelector('#uname')
const userRecaps = document.querySelector('#user-recaps')
const newGameBtn = document.querySelector('#new-game-btn')
const template1 = document.querySelector('#template-1')
const temp1Form = document.querySelector('#temp1-form')

// Initial Page View
template1.style.display = 'none'

// Create New User or Show Old User's Recaps
userForm.addEventListener('submit',e=>{
  e.preventDefault()
  fetch(USERS_URL)
  .then(r=>r.json())
  .then(users=>{
    let user = users.find(user => user.name === userName.value)
    if (user) {
      userRecaps.innerHTML +=`
      <h1>${user.name}</h1>`
      for (var i = user.stories.length; i > 0; i--) {
        const fullStory = []
        user.stories.forEach(story=>{
          if (story.recap == i) {
            fullStory.push(story.full_story)
          }
        })
        if (fullStory.length > 0) {
          userRecaps.innerHTML +=`
          <label>${i} - Recap</label>
          <p>${fullStory.join(" ")}</p>
          <input type="submit" name=${i} accessKey=${user.id} value="Continue"/>
          <br>
          <br>
          `
        }
      }
      let recapNum = parseInt(userRecaps.children[1].innerText)
      recapNum++
      newGameBtn.name = recapNum
      newGameBtn.accessKey = user.id
      console.log(newGameBtn);
    } else {
      newUser()
    }
    userForm.style.display = 'none'
  })
})

// Start Game
userRecaps.addEventListener('click', e=>{
  let userId = parseInt(e.target.accessKey)
  let saveSlot = parseInt(e.target.attributes[1].value)
  const input = document.createElement('input')
  input.type = 'submit'
  input.accessKey = userId
  input.name = saveSlot
  userForm.style.display = 'none'
  userRecaps.style.display = 'none'
  template1.style.display = ''
  temp1Form.appendChild(input)
  // debugger
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
  // debugger
  fetch(STORIES_URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'user_id': e.target.lastChild.accessKey,
      'full_story': storyArr.join(" "),
      'recap': e.target.lastChild.name
    })
  })
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
      'name': userName.value
    })
  })
  userRecaps.innerHTML +=`
  <input type="submit" name=1 value="New Game"/>
  `
}
