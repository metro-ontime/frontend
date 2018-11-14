import React, { Component } from 'react';
import { scaleLinear, scaleTime } from "d3-scale";
import { select } from "d3-selection";
import { line, curveCatmullRom } from "d3-shape";

class Marey extends Component {
  constructor(props){
     super(props)
     this.createLine = this.createLine.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
    this.props.schedule.forEach((element) => {
      const data = JSON.parse(element);
      if (data[0].stop_headsign == this.props.direction) {
        this.createLine(data, "lightGrey");
      }
    });
    this.props.trips.forEach((element) => {
      const data = JSON.parse(element);
      if (data[0].direction == 0) {
        this.createLine(data, "steelBlue");
      }
    });
  }

  createLine(lineData, color) {
    const node = this.node;
    const width = this.props.size[0];
    const height = this.props.size[1];
    const dataMax = 1;
    const dataLen = this.props.schedule.length;
    const dateMin = new Date(this.props.dates.min);
    const dateMax = new Date(this.props.dates.max);
    const yScale = scaleTime()
      .domain([dateMin, dateMax])
      .range([0, height]);
    const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, width]);

    const lineFunction = line()
      .x(function(d, i) { return xScale(d.relative_position); })
      .y(function(d, i) { 
        const date = new Date(d.datetime);
        return yScale(date);
      })
      .curve(curveCatmullRom.alpha(0.5));

    select(node)
      .attr("width", width)
      .attr("height", height);

    select(node).append("path")
      .attr("d", lineFunction(lineData))
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none");
  }

  render() {
     return <svg ref={node => this.node = node}> </svg>
  }
}

export default Marey; 
