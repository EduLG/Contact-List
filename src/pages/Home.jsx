import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [imageToggles, setImageToggles] = useState({});
  const [pokemonData, setPokemonData] = useState(null);

  const navigate = useNavigate();

  const createAgenda = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/EduLG",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("User created:", data);

      return data;
    } catch (error) {
      console.error("Couldn't create an agenda: ", error);
    }
  };

  const getAgendas = () => {
    fetch("https://playground.4geeks.com/contact/agendas/EduLG")
      .then((response) => {
        if (!response.ok) {
          createAgenda();
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Agenda Loaded", data);
        dispatch({
          type: "save_contact",
          payload: data.contacts,
        });
      })
      .catch((error) => {
        console.error("Couldn't access the agenda, error: ", error);
      });
  };

  useEffect(() => {
    getAgendas();
  }, []);

  const toggleImage = (contactId) => {
    setImageToggles((prev) => ({
      ...prev,
      [contactId]: !prev[contactId],
    }));
  };


  return (
    <div className="text-center mt-5 mx-auto container">
      <div className="d-flex">
        <button
          onClick={async () => {
            try {
              const response = await fetch(
                "https://playground.4geeks.com/contact/agendas/EduLG",
                {
                  method: "DELETE",
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Error: ${response.status} ${response.statusText}`
                );
              }

              await createAgenda();
              getAgendas();
            } catch (error) {
              console.log("Error al eliminar la agenda:", error.message);
            }
          }}
          className="btn btn-danger mt-3 d-flex ms-auto mx-2"
        >
          Delete agenda
        </button>

        <button
          onClick={() => {
            navigate("/create-contact");
          }}
          className=" btn btn-primary mt-3 d-flex "
        >
          Create contact
        </button>
      </div>

      <ul className="px-0 mx-0 list-unstyled border border-dark rounded my-2 bg-dark">
        {store.contacts.length === 0 ? (
          <div className="bg-dark">
            <h1 className="text-white mt-4">Add your first contact</h1>
            
          </div>
        ) : (
          store &&
          store.contacts?.map((contact) => {
            const isEven = contact.id % 2 === 0;
            return (
              <li
                key={contact.id}
                className="p-2 border-bottom border border-dark"
              >
                <div className="row caja">
                  <div className="d-flex align-items-center">
                        <img
                          src="https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg?semt=ais_hybrid&w=740"
                          alt="Profile Pic"
                        />
                    <div className="col-10">
                      <div className="row">
                        <div className="d-flex align-items-center mb-2">
                          <h4 className="text-start ps-2 flex-grow-1 mb-0 text-white">
                            {contact.name}
                          </h4>
                          <div>
                            <i
                              className="fa-solid fa-pencil pt-1 px-2 hoverazo text-white"
                              onClick={() =>
                                navigate(`/edit-contact/${contact.id}`)
                              }
                            ></i>
                            <i
                              className="fa-solid fa-trash pt-1 px-2 hoverazo text-white"
                              onClick={() => {
                                fetch(
                                  `https://playground.4geeks.com/contact/agendas/EduLG/contacts/${contact.id}`,
                                  {
                                    method: "DELETE",
                                  }
                                )
                                  .then((response) => {
                                    if (!response.ok) {
                                      throw new Error(response.statusText);
                                    }
                                  })
                                  .then(() => {
                                    dispatch({
                                      type: "delete_contact",
                                      payload: contact.id,
                                    });
                                  })
                                  .catch((error) => {
                                    console.error(
                                      "couldn't delete the contact, error: \n",
                                      error
                                    );
                                  });
                              }}
                            ></i>
                          </div>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-envelope pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.email}</p>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-phone pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.phone}</p>
                        </div>
                        <div className="d-flex">
                          <i className="fa-solid fa-location-dot pt-1 px-2 text-white"></i>
                          <p className="text-white">{contact.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};