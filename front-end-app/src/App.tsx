import React, { Component } from "react";
import MaterialTable from "material-table";
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

// override padding settings in order to make the 
// table's theme more accurate to that of what was proposed
const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        paddingLeft: "10px",
        padding: 0
      },
    },
  },
});


class App extends Component {


  render() {
    return (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            title="Securities Table Page"
            options={{
              sorting: true,
              thirdSortClick: false,
              paging: false,
              search: false,
              headerStyle: {
                fontWeight: "bold",
                textAlign: "center"
              },
            }}

            data={query =>
              new Promise((resolve: any, reject: any) => {
                fetch('http://localhost:8000/securities')
                  .then(async response => {
                    let data = await response.json();
                    data = data.map(MapTrend);
                    return data;
                  })
                  .then(result => {
                    resolve({
                      data: result,
                      page: query.page,
                      totalCount: result.length
                    })
                  })
              })
            }


            columns={[
              {
                title: "securityName", field: "securityName", cellStyle: {
                  width: "40%",
                }
              },
              {
                title: "sector", field: "sector", cellStyle: {
                  width: "30%",
                }
              },
              {
                title: "country", field: "country", cellStyle: {
                  width: "20%",
                }
              },
              {
                title: "trend", field: "trend", render: (data) =>
                  <div id="trendCol" style={{
                    backgroundColor: `rgba(${data.trend.color.red}, ${data.trend.color.green}, ${data.trend.color.blue}, ${data.trend.valueNormalized} )`
                  }}>
                    {data.trend.repValue}
                  </div>,
                customSort: (a, b) => a.trend.value - b.trend.value
              }
            ]}
          />
        </div>
      </ThemeProvider>
    );
  }
}

function MapTrend(val: any) {
  const newVal = Object.assign(val);
  const percentage = val.trend * 100
  let normalizedValue = Math.abs(val.trend);
  let color = {
    red: 0,
    green: 0,
    blue: 0
  }

  if (percentage >= -100 && percentage < -20) {
    color.red = 255;
  } else if (percentage >= -20 && percentage < 20) {
    color.green = 255;
    normalizedValue = val.trend <= 0.1 ? 0.1 : normalizedValue;
    // adding a bit of green on the blue cases, just to add a bit more brightness
  } else {
    color.blue = 255;
    color.green = 110;
  }

  newVal.trend = {
    color: color,
    value: val.trend,
    valueNormalized: normalizedValue,
    repValue: `${percentage.toFixed(1)}%`

  };
  return newVal;
}


export default App;
