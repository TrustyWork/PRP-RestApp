
export const addSideMenuEntry = (txt) =>{

	return {
		type: 'ADD_SIDEMENU_ENTRY',
		data: txt
	}
}

export const SideMenuEntry = () =>{

	return {
		type: 'ADD_SIDEMENU_ENTRY',
		data: {}
	}
}

export default { addSideMenuEntry, SideMenuEntry }