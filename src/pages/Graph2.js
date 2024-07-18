import React, {useEffect,useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graph2() {
  const [ar, setAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])


  const doApi = async() => {

    try {
      // MSFT for microsoft
      // AAPL for apple
      const url = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2024-01-09?adjusted=true&sort=asc&apiKey=ieZXkQlmZA08lJOy5DRQznkC0kTRlQ5y"

      const {data} = await axios.get(url);

      console.log(data);

      const map_ar = data.results.map(item => {

        return {

          x:new Date(item.t),

          y:item.c

        }

      })

      setAr(map_ar);

    } catch (error) {

      console.log(error);

    }

  }





  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "apple stock"
    },
    axisY: {
      title: "USD price",
      logarithmic: true
    },
    data: [{
      type: "spline",
      showInLegend: true,
      legendText: "MWp = one megawatt peak",
      dataPoints: ar
    
      
    }]
  }

  return (
    <div className='container'>
      <h2>Graph for stocks:</h2>
      <CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
    </div>
  )
}

// https://canvasjs.com/
// https://canvasjs.com/react-charts/
// https://canvasjs.com/react-charts/chart-with-logarithmic-axis/
// https://polygon.io/

// https://ai-test-p4ph.onrender.com/upload.html