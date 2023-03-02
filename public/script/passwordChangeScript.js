
function ShowSuccessMessage(message) {
    const SuccessMessageDiv = document.createElement('div');
    SuccessMessageDiv.innerHTML = message;
    SuccessMessageDiv.classList.add("SuccessMessage");
    SuccessMessageDiv.setAttribute('id', "SuccessMessage")
    ContainerElement = document.getElementById('container');
    ContainerElement.appendChild(SuccessMessageDiv);

    setTimeout(() => {
        SuccessMessageDiv.classList.add("SuccessMessageFadeIn");
    }, 1)
    setTimeout(() => { ContainerElement.removeChild(SuccessMessageDiv) }, 4000)
    setTimeout(() => {
        SuccessMessageDiv.classList.remove("SuccessMessageFadeIn");
        SuccessMessageDiv.classList.add("SuccessMessageFadeOut");
    }, 2000)
}
