import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {DataService} from "../data.service";

interface Color {
  color: string;
}
interface Series {
  name: string;
  data: number[];
  type: string;
  zones: Color[];
}
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input('type') type = 'spline';
  @Input('sensors') sensors = [{name:'Temperature', color:'orange'}];
  @Input('start') start = '';
  @Input('end') end = '';
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptions: Highcharts.Options = {};

  constructor(dataService: DataService) { }

  ngOnInit(): void {
    if(this.type === 'bar'){
      this.chartOptions = {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Historic World Population by Region'
        },
        subtitle: {
          text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        },
        xAxis: {
          categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
            title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
            title: {
            text: 'Population (millions)',
              align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' millions'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
          enabled: false
        },
        series: this.createSeries(5)
      }
    } else {
      this.chartOptions = {
        chart: {
          type: this.type
        },
        title: {
          text: "Monthly Average(s)"
        },
        subtitle: {
          text: "Source: WorldClimate.com"
        },
        xAxis:{
          categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        yAxis: {
          title:{
            text:"Sensors"
          }
        },
        tooltip: {
          valueSuffix:" °C/"
        },
        series: this.createSeries(10)
      };
    }
  }

  private createSeries(dataLength: number): any[] {
    let seriesItems: any[] = [];
    for (const sensor of this.sensors) {
      let series: Series = {
        name : sensor.name,
        type : this.type,
        zones : [{color:sensor.color}],
        data: []
      };
      let data:number[] = new Array(dataLength);
      for (let i = 0; i < dataLength; i++) {
        data[i] = Math.floor(Math.random() * 10)
      }
      series.data = data;
      seriesItems.push(series);
    }
    return seriesItems;
  }
}
