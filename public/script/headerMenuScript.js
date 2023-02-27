function CheckIfClickedOutside(evt){

	//if (!AccountMenu.classList.contains('hidden') && evt.target != AccountMenu && evt.target != AccountLink){
	//		console.log('outside')
	//		CloseAccountMenu();
	//}
	if (evt.target == AccountLink) {
		console.log('link')
	}
}

MobileHeader.addEventListener('click', CheckIfClickedOutside);
