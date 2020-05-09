<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: {
    label: {
      type: String
    },
    chartData:{
      type: Array
    },
    options:{
      type: Object
    }
  },
  mounted(){
    const names = this.chartData.map( v => v.name).reverse();
    const totals = this.chartData.map( v => v.total).reverse();
    this.renderChart({
      labels: names,
      datasets:[{
        label:this.label,
        data:totals,
        scaleBeginAtZero : true,
        borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            pointBorderColor: '#2554FF',
      }],
    },this.options);
  }
  //   chartdata: {
  //     labels: ['Erica', 'Ferren', 'Michael', 'Asland', 'Moses', 'Jordan', 'Jhon', 'Arlen', 'Bram', 'Kezia'],
  //     datasets: [
  //       {
  //         label: 'VOTE',
  //         backgroundColor: '#f02324',
  //         borderColor: 'transparent',
  //         data: [50, 67, 89, 39, 100, 40, 39, 80, 40, 70]
  //       }
  //     ]
  //   },
  //   options: {
  //     responsive: true,
  //     maintainAspectRatio: false
  //   }
  // }),
  // mounted () {
  //   this.renderChart(this.chartdata, this.options)
  // }
// }
}
</script>