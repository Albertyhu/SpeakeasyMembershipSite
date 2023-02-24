const CursorMessage = document.createElement('div'); 
CursorMessage.classList.add("CursorDeleteMessage");

CursorMessage.innerHTML = "Delete?"
function CursorDeleteMessage(evt, container) {
    container.appendChild(CursorMessage)
    CursorMessage.style.left = evt.pageX + 'px';
    CursorMessage.style.top = evt.pageY + 'px';
}

function HideCursorDeleteMessage(evt, container) {
    container.removeChild(CursorMessage)
} 