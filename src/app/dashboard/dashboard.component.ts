import { ProdStatistics } from './../shared/prod-statistics';
import { ServerService } from './../shared/server.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showGraph: boolean;
  showLoader: boolean;
  lineData: any[];
  graphData = {};
  subscription: Subscription;
  graph_data: any[];
  statistics_data: ProdStatistics;
  title: string;
  today: number = Date.now();
  showProductionGraph: boolean;
  salesData: any[];
  salesMonth: any[];
  prodStatistics: ProdStatistics;
  monthSalesData: any[];

  prod_data = [];
  prod_month = [];
  sales_data = [];
  sales_month = [];
  prod_data_graph = [];
  prod_month_graph = [];
  sales_data_graph = [];
  sales_month_graph = [];
  type_month_sales = 'bar';
  type_month_prod = 'bar';
  data_month_sales = {};
  data_month_prod = {};
  options_month_sales = {};
  options_month_prod = {};
  messages = {};
  constructor(private serverService: ServerService) {

    this.showGraph = false;
    this.subscription = this.serverService.getMessages().
      subscribe(list => {
        this.messages = list;
        // console.log(list);
      }
      )
  }

  ngOnInit() {
    this.showProductionGraph = false;
    var role = localStorage.getItem('role');
    if (role == 'admin') {
      this.showProductionGraph = true;
    }

    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getProdStatsForDashboard().
      subscribe(list => {
        // console.log(list);
        this.statistics_data = list;
        this.prodStatistics = list;
        for (var i = 0; i < this.prodStatistics.productionSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.productionSummaryByMonth[i].amount) > 0) {
            // console.log("in prod data");
            this.prod_data[i] = Math.round(this.prodStatistics.productionSummaryByMonth[i].amount / 1000);
            this.prod_month[i] = this.prodStatistics.productionSummaryByMonth[i].month.substring(0, 3);
          }

        for (var i = 0; i < this.prodStatistics.salesSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.salesSummaryByMonth[i].amount) > 0) {
            this.sales_data[i] = Math.round(this.prodStatistics.salesSummaryByMonth[i].amount / 100000);
            this.sales_month[i] = this.prodStatistics.salesSummaryByMonth[i].month.substring(0, 3);
          }
        this.prod_data_graph = this.prod_data;
        this.prod_month_graph = this.prod_month;
        this.sales_data_graph = this.sales_data;
        this.sales_month_graph = this.sales_month;
        // this.showProdStatistics();
        this.monthlyProdGraph();
        this.monthlySalesGraph();
      },
      error => {
      }
      );
  }
  showProdStatistics() {
    this.showLoader = false;
    this.showGraph = true;
  }

  displayIndianFormat(amount: number) {
    return Number(Math.round(amount / 1000)).toLocaleString('en-IN');
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }

  showProdDataGraph() {
    this.showLoader = true;
    this.lineData = [];
    this.subscription = this.serverService.getProdDataForDashboardChart().
      subscribe(list => {
        this.graph_data = list;
        this.lineData[0] = ['Type', "Actual", { 'type': 'string', 'role': 'tooltip', 'p': { 'html': true } }];
        for (var i = 0; i < this.graph_data.length; i++) {
          var type = '';
          // var type = this.graph_data[i].date;
          var actual = Math.round(this.graph_data[i].quantity / 1000);
          var graph_tooltip = '<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1.5px solid #dddddd;text-align: left;padding: 8px;}</style><table class="table-sm"><tr><td>Tonnes</td><td>' + this.graph_data[i].quantity
            + '</td></tr><tr><td>Date</td><td>' + this.graph_data[i].date + '</td></tr>';
          this.lineData[i + 1] = [type, actual, graph_tooltip];
        }
        this.showLoader = false;
        this.showGraph = true;
        this.displayGraph(this.lineData);
      }
      )
  }

  displayGraph(lineData) {
    this.graphData = {
      chartType: 'AreaChart',
      dataTable: lineData,
      options: {
        title: this.title,
        tooltip: { isHtml: true },
        width: 1000,
        height: 300,
        colors: ['#87cb16'],
        hAxis: {
          title: 'Date',
          // ticks: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        vAxis: {
          title: 'Tonnes'
        }
      }
    };
  }

  showMonthlySalesGraph() {
    this.showLoader = true;
    this.salesData = [];
    this.salesMonth = [];
    this.monthSalesData = [];
    this.serverService.getProdStatsForDashboard()
      .subscribe(
      (list) => {
        this.prodStatistics = list;
        this.salesData = [];
        this.salesMonth = [];
        this.monthSalesData[0] = ['Month', 'Percentage'];
        for (var i = 0; i < this.prodStatistics.salesSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.salesSummaryByMonth[i].amount) > 0) {
            this.salesData[i] = Number(this.prodStatistics.salesSummaryByMonth[i].amount);
            this.salesMonth[i] = this.prodStatistics.salesSummaryByMonth[i].month;
            this.monthSalesData[i + 1] = [this.salesMonth[i], this.salesData[i]]
          }
      }
      )
    this.showLoader = false;
  }

  lData = ([
    [this.monthSalesData]
  ]);

  pieChartData = {
    chartType: 'Bar',
    dataTable: this.lData,
    // dataTable: this.monthSalesData,
    options: {
      title: 'GSM Variation Datewise',
      legend: 'none',
      tooltip: { isHtml: true },
      // width: 1000,
      // height: 500,
      colors: ['green'],
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'GSM ',
        // ticks: [0, 10, 15, 20, 40]
      }
    }
  };

  showMonthlyGraph() {
    this.showLoader = false;
    this.serverService.getProdStatsForDashboard()
      .subscribe(
      (list) => {
        this.prodStatistics = list;
        for (var i = 0; i < this.prodStatistics.productionSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.productionSummaryByMonth[i].amount) > 0) {
            this.prod_data[i] = Math.round(this.prodStatistics.productionSummaryByMonth[i].amount / 1000);
            this.prod_month[i] = this.prodStatistics.productionSummaryByMonth[i].month.substring(0, 3);
          }
        for (var i = 0; i < this.prodStatistics.salesSummaryByMonth.length; i++)
          if (Number(this.prodStatistics.salesSummaryByMonth[i].amount) > 0) {
            this.sales_data[i] = Math.round(this.prodStatistics.salesSummaryByMonth[i].amount / 100000);
            this.sales_month[i] = this.prodStatistics.salesSummaryByMonth[i].month.substring(0, 3);
          }
      },
      error => {
      }
      );
    this.showLoader = false;
    this.showGraph = true;
    this.monthlyProdGraph();
  }

  monthlyProdGraph() {
    this.showLoader = false;
    this.showGraph = true;
    this.type_month_prod = 'bar';
    this.data_month_prod = {
      labels: this.prod_month_graph,
      datasets: [{
        label: "Sales in lakhs",
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#42A5F5',
        // backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.prod_data_graph,
        spanGaps: true,
      },
      ]
    };

    this.options_month_prod = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'tons'
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            // console.log(tooltipItem)
            return tooltipItem.yLabel;
          }
        }
      }
    };
  }
  monthlySalesGraph() {
    this.showLoader = false;
    this.showGraph = true;
    this.type_month_sales = 'bar';
    this.data_month_sales = {
      labels: this.sales_month_graph,
      // labels: ["12 BF 100 GSM 48",
      // "12 BF 100 GSM 39",    "12 BF 100 GSM 33"    ],
      datasets: [{
        label: "Sales in lakhs",
        fill: true,
        lineTension: 0.1,
        backgroundColor: '#9CCC65',
        // backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.sales_data_graph,
        spanGaps: true,
      },
      ]
    };

    this.options_month_sales = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'rupees'
          }
        }]
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            // console.log(tooltipItem)
            return tooltipItem.yLabel;
          }
        }
      }
    };
  }

}
