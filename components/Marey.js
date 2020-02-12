const d3 = require('d3')

export default class Marey {
  constructor(schedule, observations, stations, timeDomain) {
    this.schedule = schedule
    this.observations = observations
    this.stations = stations
    this.timeDomain = timeDomain
    this.width = 1000
    this.height = 1000
    this.xScaleLeftAxis = d3.scaleLinear().domain([0, 1]).range([0, 60])
    this.xScaleChart = d3.scaleLinear().domain([0, 1]).range([60, this.width])
    this.yScaleLabels = d3.scaleLinear().domain([0, 1]).range([0, 250])
    this.yScaleChart = d3.scaleTime().domain(timeDomain).range([250, this.height * 4])
    this.state = {
      direction: 0
    }
  }
  
  drawLine(path, direction) {
    return d3.line()
      .x(d => this.xScaleChart(direction === "0" ? d.position : 1 - d.position))
      .y(d => this.yScaleChart(new Date(d.datetime)))(path)
  }
  
  drawScheduleLine(path, direction) {
    return d3.line()
      .x(d => this.xScaleChart(d.position))
      .y(d => this.yScaleChart(new Date(d.datetime)))(path)
  }
  
  stationLine(position, timeDomain) {
    const path = timeDomain.map(time => ({ x: this.xScaleChart(position), y: this.yScaleChart(time) }))
    return d3.line()
      .x(d => d.x)
      .y(d => d.y)(path)
  }
  
  changeDirection(direction) {
    this.state.direction = direction
    this.yScaleChart.range([250, this.height * 4])
    this.draw(this.container)
  }
  
  draw(container) {
    this.container = container
    container.selectAll("svg").remove()
    const svg = container.append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
    this.svg = svg
    
    const clipPath = svg.append('clipPath')
      .attr('id', 'chart-bounds')
      .append('rect')
      .attr('x', -60)
      .attr('y', 250)
      .attr('width', 1260)
      .attr('height', 750)
    
    const timeArea = svg.append('g')
    const labelArea = svg.append('g')
    const chart = svg.append('g')
    const leftAxis = d3.axisLeft(this.yScaleChart)
      .ticks(d3.timeMinute.every(30))
      .tickFormat(d3.timeFormat("%-I:%M %p"));
    
    const stationLabels = labelArea.append('g')
      .selectAll('text')
      .data(this.stations)
      .join('text')
      .text(d => d.stop_name)
          .style('font-size', 14)
          .attr('x', d => this.xScaleChart(d.relative_position) + 10)
          .attr('y', this.yScaleLabels(1))
          .attr('transform', d => `rotate(-90, ${this.xScaleChart(d.relative_position)}, ${this.yScaleLabels(1)})`);
    
    const stationLines = chart.append('g')
      .selectAll('path')
      .data(this.stations)
      .join('path')
        .attr('d', d => this.stationLine(d.relative_position, this.timeDomain))
        .attr("clip-path","url(#chart-bounds)")
        .attr('stroke', '#ddd')
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    
    const times = timeArea
      .attr('transform', `translate(${this.xScaleLeftAxis(1)}, 0)`)
      .attr("clip-path","url(#chart-bounds)")
      .call(leftAxis)
    
    this.tripLines = svg.append('g')
    this.scheduleLines = svg.append('g')
    
    const tripPaths = this.tripLines.selectAll('path')
      .data(this.observations.filter(obj => parseInt(obj.direction) === this.state.direction))
      .join('path')
        .attr('d', d => this.drawLine(d.path, d.direction))
        .attr("clip-path","url(#chart-bounds)")
        .attr('stroke', '#f00')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    
    const schedulePaths = this.scheduleLines.selectAll('path')
      .data(this.schedule.filter(obj => parseInt(obj.direction) === this.state.direction))
      .join('path')
        .attr('d', d => this.drawScheduleLine(d.path, d.direction))
        .attr("clip-path","url(#chart-bounds)")
        .attr('stroke', '#bbb')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    
    const zoomed = () => {
      this.yScaleChart.range([250, this.height * 4].map(d => d3.event.transform.applyY(d)));
      tripPaths.attr('d', d => this.drawLine(d.path, d.direction));
      schedulePaths.attr('d', d => this.drawScheduleLine(d.path, d.direction));
      times.call(leftAxis);
    }
    
    const zoom = d3.zoom().on("zoom", zoomed);
    svg.call(zoom);
    svg.style('cursor', 'pointer')
    
    return svg
  }
}
