import React, { useEffect } from "react";
import * as d3 from "d3";
import commonData from './assets/data.json';

const data = commonData.speciesData;

export default function D3RadarChart() {
  useEffect(() => {
    const width = 400, height = 400, radius = 150;
    d3.select("#radar").selectAll("svg").remove();
    const svg = d3.select("#radar")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const angleSlice = (2 * Math.PI) / data.length;
    const scale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([0, radius]);

    // Define the closed radial line
    const radarLine = d3.lineRadial()
      .radius(d => scale(d.count))
      .angle((d,i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    // Draw concentric grid circles
    const numLevels = 5;
    const gridLevels = d3.range(1, numLevels + 1).map(i => radius * i / numLevels);
    svg.selectAll(".grid-circle")
      .data(gridLevels)
      .enter()
      .append("circle")
      .attr("class", "grid-circle")
      .attr("r", d => d)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 0.7);

    // Draw radial axes
    svg.selectAll(".radial-axis")
      .data(data)
      .enter()
      .append("line")
      .attr("class", "radial-axis")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => Math.cos(i * angleSlice - Math.PI / 2) * radius)
      .attr("y2", (d, i) => Math.sin(i * angleSlice - Math.PI / 2) * radius)
      .attr("stroke", "#bbb")
      .attr("stroke-width", 1);

    // Draw the radar area
    svg.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", "rgba(0,150,255,0.3)")
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    svg.selectAll(".axis-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "axis-label")
      .attr("x", (d, i) => Math.cos(i * angleSlice - Math.PI / 2) * (radius + 20))
      .attr("y", (d, i) => Math.sin(i * angleSlice - Math.PI / 2) * (radius + 20))
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .style("font-size", "12px")
      .style("fill", "white")
      .text(d => d.species);
  }, []);

  return <>
    <h3>Species Abundance Radar Chart</h3>
    <p>This chart compares the relative abundance of different species detected in eDNA samples.</p><br />
    <p>This radar chart visualizes the relative abundance of species detected in the eDNA dataset. Each axis represents a species group (Cnidaria, Protists, Crustacea, Mollusca, Annelida), and the distance from the center indicates the number of DNA reads associated with that group. The polygon formed by connecting the data points shows the biodiversity profile of the sample: longer spikes mean higher abundance, while shorter spikes show lower presence. The concentric circles provide a scale to compare magnitudes, and the radial lines act as axes for each species. In short, the chart gives an at-a-glance view of how different species groups compare against one another in abundance.</p>
    <div id="radar"></div>
  </>;
}