const githubApi = "https://api.github.com/users/";

const userProfile = document.getElementById('userProfile');
const search = document.getElementById('search');
const form = document.getElementById('form');

async function getUser(user) {
    const data = await fetch(githubApi + user);
    const dataBack =  await data.json();

    showUserInfo(dataBack);
}

function showUserInfo(user) {

    var userUi = ""
    if(user.message === "Not Found"){
        userUi = `
            <div class ="user-ui">
                <h3>This username does not exist</h3>
            </div> ` ;
    } else {

    userUi =  `
        <div class="user-ui">
            <div>
                <a href="https://github.com/${user.login}" target="blank">
                    <img src="${user.avatar_url}" class="picture" alt="${user.name}">
                </a>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <div class="user-profile-link">
                    <a href="https://github.com/${user.login}" target="blank">View Profile</a>
                </div>
                <ul class="meta-data">
                    <li>${user.public_repos} Repositories </li>
                </ul>
            </div>
        </div> `;

    }
    userProfile.innerHTML = userUi;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value.split(' ').join('');

    if(user) {
        getUser(user);
        search.value = '';
}

})


