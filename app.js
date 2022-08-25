let json;
const http = new XMLHttpRequest();
const url =`https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json`


http.open("GET",url,true);
http.send();
http.onload =()=>{
    json = JSON.parse(http.responseText);

    const w = 1140;
    const h = 550;
    const padding = 60;

    var yearsDate = json.data.map(function (item) {
      return new Date(item[0]);
    });

    var GDP = json.data.map(function (item) {
      return item[1];
    }); 

    var xMax = new Date(d3.max(yearsDate));
    xMax.setMonth(xMax.getMonth() + 3);

    const xScale = d3.scaleTime()
                    .domain([d3.min(yearsDate), xMax])
                    .range([0, w ]);

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(GDP)])
                    .range([h, 0 ]);

  let tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('opacity', 0);

  let overlay = d3
  .select('body')
  .append('div')
  .attr('class', 'overlay')
  .style('opacity', 0);

    let svg = d3.select("body")
    .append("svg")
    .attr("width", "1200")
    .attr("height", "600");

    svg.selectAll("rect")
    .data(json.data)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("x", function(d,i) { return xScale(yearsDate[i]); })
    .attr("y", function(d) { return yScale(d[1]); })
    .attr("width", (d, i)=>{
      return 2
    })
    .attr('data-date',(d) =>  d[0])
    .attr('data-gdp',(d) =>  d[1])
    .attr("height", function(d) { return h - yScale(d[1]); })
    .attr("fill","blue")
    .attr("index", (d,i)=> i)
    .attr('transform', 'translate(60, 0)')
    .on('mouseover', function (event, d)  {
      
      var i = this.getAttribute('index');

        overlay
          .transition()
          .duration(0)
          .style('height', 40 + 'px')
          .style('width', 100 + 'px')
          .style('opacity', 0.9)
          .style('transform', 'translateX(60px)');
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(
            d[0] +
              '<br>' +
              '$' +
              GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
              ' Billion'
          )
          .attr('data-date', json.data[i][0])
          .style('transform', 'translateX(60px)');
    })
    .on('mouseout', function (event, d)  {
      
      tooltip.transition().duration(200).style('opacity', 0);
        overlay.transition().duration(200).style('opacity', 0);
    });

    

    var xAxis = d3.axisBottom(xScale);

    svg
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', 'translate(60, 550)');

    var yAxis = d3.axisLeft(yScale);

    svg
        .append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(60, 0)');

    


       
       

    
};

    
    
    

