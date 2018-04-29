/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: use D3 to draw the lines
 */

 import React,{Component} from 'react';
import * as d3 from "d3";

export default class Line extends Component{

    shouldComponentUpdate(){
        return false;
    }
    componentWillReceiveProps(nextProps){
        let data = nextProps.lineData.lineData;
        let math = data.filter(d=>d.subject === "Math");
        let english = data.filter(d=>d.subject === "English Language Arts");
        let margin = {
            top: 50,
            left:50,
            right:200,
            bottom:50
        };

        let yearExtent = d3.extent(data,d=>+d['academic_year_end']);

        let valueExtent = [0,100];
        let svg = d3.select("#line");
        let width = +svg.attr("width") - margin.left - margin.right;
        let height = +svg.attr("height") - margin.top - margin.bottom;
        svg.html("");

        let g = svg.append("g")
            .attr('id','lineG')
            .attr('transform',`translate(${margin.left}, ${margin.top})`);

        let scaleX = d3.scale.linear()
            .domain(yearExtent)
            .range([0,width]);
        let scaleY = d3.scale.linear()
            .domain(valueExtent)
            .range([height,0]);

        //plotting scale
        let xAxis = d3.svg.axis()
            .scale(scaleX)
            .orient("bottom")
            .ticks(yearExtent[1]-yearExtent[0]);
        let yAxis = d3.svg.axis()
            .scale(scaleY)
            .orient("left")
            .ticks(5);
        g.append("g").attr('transform',`translate(0,${height})`).call(xAxis);
        g.append('g').call(yAxis);

        let color = ['#ED1C24', '#00A2E8', '#E800E0', '#00E805'];

        ////////////////////////////////MATH/////////////////////////////////////////////
        let lineM_advanced = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctadvanced']));
        g.selectAll('.lineM_advanced').data([math])
            .enter().append("path")
            .attr('class','lineM_advanced')
            .attr('d',lineM_advanced)
            .style('fill','none')
            .style('stroke',color[0]);

        let lineM_proficient = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctproficient']));
        g.selectAll('.lineM_proficient').data([math])
            .enter().append("path")
            .attr('class','lineM_proficient')
            .attr('d',lineM_proficient)
            .style('fill','none')
            .style('stroke',color[1]);

        let lineM_pctbasic = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctbasic']));
        g.selectAll('.lineM_pctbasic').data([math])
            .enter().append("path")
            .attr('class','lineM_pctbasic')
            .attr('d',lineM_pctbasic)
            .style('fill','none')
            .style('stroke',color[2]);

        let lineM_pctbelowbasic = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctbelowbasic']));
        g.selectAll('.lineM_pctbelowbasic').data([math])
            .enter().append("path")
            .attr('class','lineM_pctbelowbasic')
            .attr('d',lineM_pctbelowbasic)
            .style('fill','none')
            .style('stroke',color[3]);

        /////////////////////////////////////english//////////////////////////////////////////
        let lineE_advanced = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctadvanced']));
        g.selectAll('.lineE_advanced').data([english])
            .enter().append("path")
            .attr('class','lineE_advanced')
            .attr('d',lineE_advanced)
            .style('fill','none')
            .style('stroke-dasharray','1 2')
            .style('stroke',color[0]);

        let lineE_proficient = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctproficient']));
        g.selectAll('.lineE_proficient').data([english])
            .enter().append("path")
            .attr('class','lineE_proficient')
            .attr('d',lineE_proficient)
            .style('fill','none')
            .style('stroke-dasharray','1 2')
            .style('stroke',color[1]);

        let lineE_pctbasic = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctbasic']));
        g.selectAll('.lineE_pctbasic').data([english])
            .enter().append("path")
            .attr('class','lineE_pctbasic')
            .attr('d',lineE_pctbasic)
            .style('fill','none')
            .style('stroke-dasharray','1 2')
            .style('stroke',color[2]);

        let lineE_pctbelowbasic = d3.svg.line()
            .x(d=>scaleX(d['academic_year_end']))
            .y(d=>scaleY(d['pctbelowbasic']));
        g.selectAll('.lineE_pctbelowbasic').data([english])
            .enter().append("path")
            .attr('class','lineE_pctbelowbasic')
            .attr('d',lineE_pctbelowbasic)
            .style('fill','none')
            .style('stroke-dasharray','1 2')
            .style('stroke',color[3]);


        ///////////////////////////diagram sample/////////////////////////////////////

        let linegraph_W = 200;
        var linegraph = g.append('g').attr('id','linegraph');
        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-300)
            .attr('y2',height-300)
            .style("stroke",'blue')
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-300)
            .style("fill",'#000')
            .style('dominant-baseline','middle')
            .text('math');
        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-250)
            .attr('y2',height-250)
            .style("stroke",'blue')
            .style('stroke-dasharray','1 2')
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-250)
            .style("fill",'#000')
            .style('dominant-baseline','middle')
            .text('english');


        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-200)
            .attr('y2',height-200)
            .style("stroke",color[0])
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-200)
            .style("fill",color[0])
            .style('dominant-baseline','middle')
            .text('pctadvanced');

        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-150)
            .attr('y2',height-150)
            .style("stroke",color[1])
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-150)
            .style("fill",color[1])
            .style('dominant-baseline','middle')
            .text('proficient');

        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-100)
            .attr('y2',height-100)
            .style("stroke",color[2])
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-100)
            .style("fill",color[2])
            .style('dominant-baseline','middle')
            .text('pctbasic');

        linegraph.append('line')
            .attr('x1',width+50)
            .attr('x2',width+100)
            .attr('y1',height-50)
            .attr('y2',height-50)
            .style("stroke",color[3])
            .style("stroke-width",'2px');
        linegraph.append('text')
            .attr('x',width+100)
            .attr('y',height-50)
            .style("fill",color[3])
            .style('dominant-baseline','middle')
            .text('pctbelowbasic');



    }
    render(){
        return(
            <div>
                <svg id="line" width={1000} height={400}/>
            </div>
        )
    }
}
