const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");

copyright.innerHTML = `Illia Shabaiev &#169 ${thisYear} &#x2658;`;
footer.appendChild(copyright);

const skills = ['JavaScript',
    'HTML',
    'CSS',
    'Cypress',
    'Webdriver IO',
    'GitHub']

const skillsSection = document.getElementById("skills")
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li")
    skill.innerText = skills[i],
        skillsList.appendChild(skill)
}

const messageForm = document.forms.formID;

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usersName = event.target.name.value;
    const usersEmail = event.target.email.value;
    let usersMessage = event.target.message.value;

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    let newMessage = document.createElement("li");

    newMessage.setAttribute("id", "new-message")


    newMessage.innerHTML =
        `<a href = "mailto:${usersEmail}">${usersName}</a>
    <span>says: ${usersMessage} </span>`;

    const removeButton = document.createElement("button")
    removeButton.innerText = "remove"
    removeButton.setAttribute("type", "button")
    removeButton.setAttribute("id", "remove-button")
    removeButton.addEventListener("click", () => {
        const entry = removeButton.parentNode
        entry.remove()
    })
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageForm.reset();
})

// function to fix date format from GitHub
const formatingDate = (date) => {
    return date.slice(0, 10);
};

// Method for getiing info from GitHub
fetch("https://api.github.com/users/shabaiev/repos")
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then((repositories) => {

        // selecting ul in projects section
        const projectSection = document.getElementById('projects');
        const projectList = projectSection.querySelector('ul')

        //iterating over repo array to display repo data
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement('li');

            const projectLink = document.createElement('a');
            projectLink.innerText = repositories[i].name;
            projectLink.href = repositories[i].html_url;
            projectLink.target = "_blank";

            let projectDate = document.createElement("p");
            projectDate.innerText = `last pushed : ${formatingDate(
                repositories[i].pushed_at
            )}`;


            project.appendChild(projectLink);
            project.appendChild(projectDate);
            projectList.appendChild(project);

            //styling
            // project.classList.add('projectStyle');
            project.style.listStyleType = "none";
            project.style.marginLeft = "10%";
            project.style.marginRight = "5%";
            project.style.padding = "5px";
            project.style.marginTop = "5px";
            project.style.marginBottom = "5px";
            project.style.width = "250px";
            project.style.textAlign = "center";
            projectDate.style.fontSize = "20px";
            projectDate.style.fontStyle = "italic";
            project.style.display = "inline-block";

        }
    })
    .catch((error) => {
        console.warn(error);
        const projectSection = document.getElementById('projects');
        const errorMessage = document.createElement('h1');
        errorMessage.innerText = `There was an error! Github error message: ${error.message}`;
        projectSection.appendChild(errorMessage);
    });

