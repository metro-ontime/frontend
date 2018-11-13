import React, { Component } from 'react';
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { line, curveCatmullRom, curveBasis } from "d3-shape";

class Marey extends Component {
  constructor(props){
     super(props)
     this.createLine = this.createLine.bind(this);
  }
  componentDidMount() {
    this.props.data.forEach((element) => {
      this.createLine(element);
    });
  }
  componentDidUpdate() {
    this.props.data.forEach((element) => {
      this.createLine(element);
    });
  }
  createLine(lineData) {
    const node = this.node;
    const width = this.props.size[0];
    const height = this.props.size[1];
    const dataMax = max(lineData);
    const dataLen = lineData.length;
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, height]);
    const xScale = scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    const lineFunction = line()
      .x(function(d, i) { return xScale(d); })
      .y(function(d, i) { return yScale(i / dataLen); })
      .curve(curveCatmullRom.alpha(0.5));

    select(node)
      .attr("width", width)
      .attr("height", height);

    select(node).append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }
  render() {
     return <svg ref={node => this.node = node}> </svg>
  }
}
export default Marey; 
