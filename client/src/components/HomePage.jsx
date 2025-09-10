import React from "react";
import "./HomePage.css";
import BarChart from "./BarChart";
import D3RadarChart from "./D3RadarChart";
import NetworkChart from "./NetworkChart";

export default function HomePage() {
  return (
    <div className="homepage">
      <h1 className="text-3xl font-bold">Welcome to AbyssAI Home</h1>
      <br />
      {/* <p>Here goes navbar, features, charts, and more...</p> */}

      {/* Section for Bar + Radar charts with description */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mt-8">
          Species Abundance Radar Chart
        </h3>
        <p className="mt-2 text-gray-200">
          This chart compares the relative abundance of different species
          detected in eDNA samples.
        </p>
        <p className="mt-2  text-gray-200">
          Each axis represents a species group (Cnidaria, Protists, Crustacea,
          Mollusca, Annelida), and the distance from the center indicates the
          number of DNA reads associated with that group. The polygon formed by
          connecting the data points shows the biodiversity profile of the
          sample: longer spikes mean higher abundance, while shorter spikes show
          lower presence. The concentric circles provide a scale to compare
          magnitudes, and the radial lines act as axes for each species.
        </p>
        <br />

        {/* Responsive layout for charts */}
        <div className="flex flex-col md:flex-row gap-8 mt-16 bg-blue-900 rounded-xl max-sm:w-fit items-center">
          {/* Left: Bar Chart */}
          <div className="flex-1">
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
          </div>

          {/* Right: Radar Chart */}
          <div className="flex-1" id="radar-container">
            <D3RadarChart />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2 className="text-xl font-semibold">Network Chart</h2>
        <p style={{ color: "#e6f1ff", lineHeight: "1.6" }}>
          This network graph visualizes the relationships between known species
          and unknown DNA clusters detected in eDNA samples. Each node
          represents a species or a DNA cluster, and the size of the node
          indicates its abundance or probability of presence. Nodes are colored
          based on their group: blue for known species and red for unknown
          clusters. Links connect nodes with similarity relationships, showing
          how unknown clusters relate to known taxa, helping identify potential
          novel species.
        </p>
        <div className="w-full max-sm:">
          <center>
            <NetworkChart />
          </center>
        </div>
      </div>

      {/* <h2 className="text-xl font-semibold p-6">Data.json example here</h2>
      <br />
      <div className="font-mono">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm text-left m-4">
          {`{
  "speciesData": [
    { "id": "Cnidaria", "species": "Cnidaria", "count": 120, "probability": 0.95, "group": "known" },
    { "id": "Protists", "species": "Protists", "count": 80, "probability": 0.85, "group": "known" },
    { "id": "Crustacea", "species": "Crustacea", "count": 45, "probability": 0.6, "group": "known" },
    { "id": "Mollusca", "species": "Mollusca", "count": 30, "probability": 0.5, "group": "known" },
    { "id": "Annelida", "species": "Annelida", "count": 25, "probability": 0.4, "group": "known" },
    { "id": "Cluster_1", "species": "Cluster_1", "count": 40, "probability": 0.7, "group": "unknown" },
    { "id": "Cluster_2", "species": "Cluster_2", "count": 35, "probability": 0.6, "group": "unknown" },
    { "id": "Cluster_3", "species": "Cluster_3", "count": 50, "probability": 0.8, "group": "unknown" },
    { "id": "Cluster_4", "species": "Cluster_4", "count": 20, "probability": 0.3, "group": "unknown" }
  ],
  "networkLinks": [
    { "source": "Cluster_1", "target": "Cnidaria", "weight": 0.7 },
    { "source": "Cluster_2", "target": "Protists", "weight": 0.6 },
    { "source": "Cluster_3", "target": "Crustacea", "weight": 0.8 },
    { "source": "Cluster_4", "target": "Mollusca", "weight": 0.5 },
    { "source": "Cluster_1", "target": "Cluster_3", "weight": 0.4 }
  ]
}`}
        </pre>
      </div> */}
      
    </div>
  );
}
