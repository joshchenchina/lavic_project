/**
 *
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: use D3 to draw the map
 */

import React,{Component} from 'react';
import * as d3 from "d3";
import * as topojson from "topojson";

export default class Map extends Component{
    componentDidMount(){
        let loadExamList = this.props.loadExamList;
        var svg = d3.select("#map");
        var projection = d3.geo.mercator()
            .scale(4100)
            .translate([5750, 3350]);//right, down

        var path = d3.geo.path()
            .projection(projection);

        d3.json("/geoJson/PA.json", function(error, states_us) {
            if (error) return console.error(error);

            for (let i = 0; i < document.getElementsByClassName("schoolData").length; i++) {
                document.getElementsByClassName("schoolData")[i].style.display = "none";
            }

            var g = svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(states_us, states_us.objects.cb_2015_pennsylvania_county_20m).features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("class", function(d) { return 'path ' + d.properties.NAME; })
                .on("click", zoom);


            function zoom() {
                console.log("click");
                d3.json("/geoJson/LVSD.json", function(error, schoolDist) {
                    var lastClicked = null;
                    var lastClickedAUN = null;
                    var q = svg.append("g")
                        .attr("class", "dists")
                        .selectAll("path")
                        .data(topojson.feature(schoolDist, schoolDist.objects.schoolDistricts).features)
                        .enter()
                        .append("path")
                        .attr("d", path)
                        .attr("class", function(d) { return 'path ' + d.properties.school_nam; })
                        .on('mouseover', function(d) { d3.select("path." + d.properties.school_nam)
                            .style({
                                'fill': 'rgb(64, 116, 212)'
                            });
                            var toShow = d.properties.aun_schdis;
                            d3.select("#info").html(toShow);
                            /*var newDiv = document.createElement("div");
                            newDiv.setAttribute("id", "distName");
                            newDiv.style.fontSize = "1.5em";
                            var newContent = document.createTextNode(toShow);
                            newDiv.appendChild(newContent);
                            document.body.appendChild(newDiv);*/
                        })

                        .on('mouseout',  function(d) { d3.select("path." + d.properties.school_nam)
                            .style({
                                'fill': 'rgb(2, 34, 95)'
                            });
                            d3.select("#info").html("");
                            /*var element = document.getElementById("distName");
                            element.parentNode.removeChild(element);

                            d3.select("path." + lastClicked)
                                .style({
                                    'fill': 'rgb(64, 74, 55)'
                                });*/
                        })
                        .on('click',  function(d) {
                            console.log(d);
                            window.query = {state_lea_id: d.properties.aun_schdis};
                            loadExamList({
                                query:{state_lea_id: d.properties.aun_schdis}
                            })

                        });
                    console.log(schoolDist.objects.schoolDistricts);
                    q.transition()
                        .duration(1500)
                        .attr("transform", "translate(-1530,-600)scale(" + 5 + ")translate(-" + 10 + ",-" + 10 + ")");

                    g.transition()
                        .duration(1500)
                        .attr("transform", "translate(-1530,-600)scale(" + 5 + ")translate(-" + 10 + ",-" + 10 + ")").remove();
                });
            }
    });
    }

    shouldComponentUpdate(){
        return false;
    }
    render(){
        return(
            <div id="mapRoot">
                <svg id="map" width={500} height={300}/>
            </div>

        )
    }
}
