import React from "react";
import Navbar from "./LabNavbar";

const LabReport = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const reportDetails = event.target.reportDetails.value;
        console.log("Submitting report:", reportDetails);
        // Add your API call or logic to handle the submitted report here
    };

    return (
        <div>
            <Navbar />
            <h1>Welcome to the Lab Report Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Report Details:
                    <input type="text" name="reportDetails" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LabReport;