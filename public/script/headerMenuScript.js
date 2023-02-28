//function CheckIfClickedOutside(evt){

//	//if (!AccountMenu.classList.contains('hidden') && evt.target != AccountMenu && evt.target != AccountLink){
//	//		console.log('outside')
//	//		CloseAccountMenu();
//	//}
//	if (evt.target == AccountLink) {
//		console.log('link')
//	}
//}

//MobileHeader.addEventListener('click', CheckIfClickedOutside);


	<% if (typeof user != 'undefined') { %>
		var AccountLink = document.querySelector('#AccountLink');
	var AccountMenu = document.querySelector('#AccountMenu');
	var Container = document.querySelector("#container");
	var ProfilePic = document.querySelector("#ProfilePic");
	const MobileHeader = document.getElementById('MobileHeader');

	AccountLink.addEventListener("click", ToggleAccountMenu);

	function ToggleAccountMenu() {
		if (AccountMenu.classList.contains('hidden')) {
			AccountMenu.classList.remove('hidden');
			AccountMenu.classList.add('grid');
		}
		else {
			CloseAccountMenu();
		}
	}

	function CloseAccountMenu() {
		AccountMenu.classList.remove('grid');
		AccountMenu.classList.add('hidden');
	}


	//This is used to complement the feature where the user clicks outside of the Account Menu to close it
	//It is used to check if evt.target is one of the child anchor tag of Account Menu
	function ConfirmChild(target, NodeList) {
		NodeList.forEach(node => {
			if (node == target)
				return true;
		})
		return false;
	}

	function CheckIfClickedOutsideAccountMenu(evt) {
		//If the user is logged in
		<% if (typeof user != 'undefined') { %>
			//The following extracts all the child anchor tags of AccountMenu div
			const childAnchors = AccountMenu.querySelectorAll('a');
			//If the user's profile picture exist, execute the following
			//The image is chosen instead of its parent because for some reason, the image is only registered by click
			<% if (user.profile_pic.contentType != 'undefine') { %>
			if (!AccountMenu.classList.contains('hidden') && ConfirmChild(evt.target, childAnchors) && evt.target != AccountMenu && evt.target != ProfilePic) {
					CloseAccountMenu();
				}
			<% } else { %> 
			if (!AccountMenu.classList.contains('hidden') && evt.target != AccountMenu && evt.target != AccountLink && ConfirmChild(evt.target, childAnchors)) {
					CloseAccountMenu();
				}
				<%}%>
		<% } %>
		}

	Container.addEventListener("mousedown", (evt) => {
		if (window.innerWidth >= 640) {
			CheckIfClickedOutsideAccountMenu(evt)
		}
		else {
			CheckIfClickedOutsideMobileMenu(evt)
		}
	})
		<% } %>