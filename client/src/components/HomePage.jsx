import React from "react";
import "./HomePage.css";
import BarChart from "./BarChart";
import D3RadarChart from "./D3RadarChart";
import NetworkChart from "./NetworkChart";

export default function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to AbyssAI Home</h1>
      <p>Here goes navbar, features, charts, and more...</p>
      <BarChart
        data={{
          known_species: 60,
          unknown_clusters: 40,
          abundance: [
            { species: "Cnidaria", count: 120 },
            { species: "Protists", count: 80 },
            { species: "Crustacea", count: 45 },
            { species: "Mollusca", count: 30 },
            { species: "Annelida", count: 25 },
          ],
        }}

        
      />

      <div id="radar-container">
        <D3RadarChart/>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Network Chart</h2>
        <p style={{ color: "#e6f1ff", lineHeight: "1.6", maxWidth: "800px" }}>
          This network graph visualizes the relationships between known species and unknown DNA clusters detected in eDNA samples.
          Each node represents a species or a DNA cluster, and the size of the node indicates its abundance or probability of presence.
          Nodes are colored based on their group: blue for known species and red for unknown clusters.
          Links connect nodes with similarity relationships, showing how unknown clusters relate to known taxa, helping identify potential novel species.
        </p>
        <NetworkChart />
      </div>
    </div>
  );
}