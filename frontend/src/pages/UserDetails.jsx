import React, { useState, useEffect } from 'react';

function UserDetails() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await fetch("http://localhost:7000/auth/authDetails", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='row mt-5'>
            <div className='col-md-3' style={{marginLeft:'70vh'}}>
                <div className="card text-center">
                    <div className="card-header">
                        My Profile
                    </div>
                    <img src="https://th.bing.com/th/id/OIP.WPmdNoTzIuLFH4m-D36ArAEsEs?w=169&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt='Hi' />
                    {user && (
                        <div className="card-body">
                            <h5 className="card-title">{user.fullName}</h5>
                            <p className="card-text">{user.email}</p>
                            <div className='mb-3'>
                                <button className="btn btn-primary" onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.href = "/login";
                                }}>Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
