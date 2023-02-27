
var MessageForm = document.getElementById('NewMessageForm');

    var MessageButton = document.querySelector('#OpenMessageButton');

    var CancelMessageButton = document.querySelector('#CancelMessageButton');

    var SubmitMessageButton = document.getElementById('SubmitMessageButton')

    const OpenMessageForm = () => {
        MessageForm = document.getElementById('NewMessageForm');
        MessageButton = document.querySelector('#OpenMessageButton');
        //display form 
        MessageForm.classList.remove('hidden');
        MessageForm.classList.add('block');
        //hide button
        MessageButton.classList.remove('block');
        MessageButton.classList.add('hidden');
    }

    const CloseMessageForm = () => {
        MessageForm = document.getElementById('NewMessageForm');
        MessageButton = document.querySelector('#OpenMessageButton');
        //hide form
        MessageForm.classList.remove('block');
        MessageForm.classList.add('hidden');
        //display button
        MessageButton.classList.remove('hidden');
        MessageButton.classList.add('block');
    }
    MessageButton?.addEventListener('mousedown', OpenMessageForm);
    CancelMessageButton?.addEventListener('mousedown', CloseMessageForm);
