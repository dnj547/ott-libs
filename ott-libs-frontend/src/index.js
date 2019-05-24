const userName = document.querySelector('#user-name')
USERS_URL = "http://localhost:3000/api/v1/users"
STORIES_URL = "http://localhost:3000/api/v1/stories"
TEMPLATES_URL = "http://localhost:3000/api/v1/templates"
RECAPS_URL = "http://localhost:3000/api/v1/recaps"

fetch(USERS_URL)
  .then(r=>r.json())
  .then(users=>{
    users.forEach(user=>{
      userName.innerHTML +=`
        <h1>${user.name}</h1>
      `
    })
  })
