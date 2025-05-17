import React from "react";

const Contact = ({name, phone, email, address}) => {

    return (

        <div className="container">
            <div className="row">
                <div class="col-md-2 col-sm-2">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" class="profile-photo-lg"/>
                  </div>
                <div className="col-md-8">
                    <div className="people-nearby">

                        <div className="nearby-user">

                            <div className="row">
                                
                                <div className="col-md-7 col-sm-7">
                                    <h5><a href="#" className="profile-link">{name}</a></h5>
                                    <p>{email}</p>
                                    <p>{phone}</p>
                                    <p className="text-muted">{address}</p>

                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Contact;