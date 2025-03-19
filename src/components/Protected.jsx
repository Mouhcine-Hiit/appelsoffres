import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch("https://cors-anywhere.herokuapp.com/http://163.172.74.154:8003/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch protected data");
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error fetching protected data:", error);
        setMessage("Error fetching protected data.");
      }
    };

    fetchProtectedData();
  }, [navigate]); // Ensure navigate is in the dependency array

  return (
    <div>
      <h2>Protected Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Protected;
