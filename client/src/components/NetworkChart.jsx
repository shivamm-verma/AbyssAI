import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import commonData from './assets/data.json';

const NetworkChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const nodes = commonData?.speciesData || [];
    const links = commonData?.networkLinks || [];
    const data = { nodes, links };

    const width = 800;
    const height = 600;
    const padding = 50;

    d3.select(svgRef.current).selectAll('*').remove();

    if (nodes.length > 0 && links.length > 0) {
      const svg = d3
        .select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      const color = d3.scaleOrdinal()
        .domain(['known', 'unknown'])
        .range(['steelblue', 'red']);

      const sizeScale = d3.scaleLinear()
        .domain(d3.extent(nodes, d => d.count))
        .range([5, 20]);

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(180 * 1.4))
        .force('charge', d3.forceManyBody().strength(-250 * 1.4))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force('collide', d3.forceCollide().radius(d => sizeScale(d.count) + 10));

      const link = svg.append('g')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke-width', d => Math.sqrt(d.weight));

      const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', d => sizeScale(d.count))
        .attr('fill', d => color(d.group))
        .call(drag(simulation));

      const label = svg.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(nodes)
        .join('text')
        .text(d => d.id)
        .attr('font-size', 10)
        .attr('dy', '0.35em')
        .attr('x', d => sizeScale(d.count) + 5)
        .attr('fill', 'white');

      const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip-network')
        .style('position', 'absolute')
        .style('background', '#0a192f')
        .style('color', '#fff')
        .style('font-family', '"Segoe UI", Arial, sans-serif')
        .style('font-size', '12px')
        .style('padding', '8px 12px')
        .style('border-radius', '6px')
        .style('box-shadow', '0px 0px 10px rgba(0,0,0,0.5)')
        .style('pointer-events', 'none')
        .style('opacity', 0);

      node.on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip.html(`<strong>${d.id}</strong><br/>Group: ${d.group}<br/>Count: ${d.count}`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
        .on('mouseout', () => {
          tooltip.transition().duration(500).style('opacity', 0);
        });

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        label
          .attr('x', d => d.x + sizeScale(d.count) + 5)
          .attr('y', d => d.y);
      });

      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended);
      }

      return () => {
        tooltip.remove();
        simulation.stop();
      };
    }
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default NetworkChart;