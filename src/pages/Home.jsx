import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Contact from "../components/Contact.jsx";

export const Home = () => {

	const[contacts, setContacts] = useState([]);



  	const {store, dispatch} =useGlobalReducer()

	const getAllContacts = async() => {
		const response = await fetch("https://playground.4geeks.com/contact/agendas/Pedro/contacts") 
		const data = await response.json()
		console.log(data);
		return data;
	}

	useEffect(() => {
		getAllContacts().then(newContacts => setContacts(newContacts.contacts))
	}, []) 


	return (
		<>
			{
				contacts.map((contact, index) => {
					return(
						<Contact 
							name={contact.name}
							email={contact.email}
							phone={contact.phone}
							address={contact.address}
							key={contact.id}
						/>
					)
				}) 
			}
		</>
	);
}; 