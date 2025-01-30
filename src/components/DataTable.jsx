import React, { useEffect, useState } from "react";

const DynamicTable = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jugad-23-bakend.onrender.com/api/all"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging API response
        setTeamData(data.data); // Ensure correct data structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const convertToCSV = (data) => {
    const header = [
      "Team Name",
      "Team Size",
      "Team Leader Name",
      "Email Address",
      "Phone Number",
      "Team Member 1",
      "Team Member 2",
      "Team Member 3",
    ];

    const rows = data.map((team) => [
      team.teamName,
      team.teamSize,
      team.teamLeaderName,
      team.email,
      team.phoneNumber,
      team.teamMember1 || "N/A", // Handles missing values
      team.teamMember2 || "N/A",
      team.teamMember3 || "N/A",
    ]);

    const csvContent = [
      header.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(teamData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "team_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        Team Data
      </h2>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: "10px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Download CSV
      </button>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
          border: "1px solid #ddd",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Size
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Leader Name
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Email Address
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Phone Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Member 1
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Member 2
            </th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>
              Team Member 3
            </th>
          </tr>
        </thead>
        <tbody>
          {teamData && teamData.length > 0 ? (
            teamData.map((team, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamName}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamSize}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamLeaderName}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.email}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.phoneNumber}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamMember1 || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamMember2 || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {team.teamMember3 || "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                No team data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
