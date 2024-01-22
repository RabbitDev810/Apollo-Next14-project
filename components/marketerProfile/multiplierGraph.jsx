import Image from "next/image";
import React from "react";
import MultiplierLogo from "../../public/multiplier.svg";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const option = {
  series: [
    {
      data: [3, 4, 2, 4, 6, 9, 5, 14, 3],
    },
  ],
  options: {
    chart: {
      height: 250,
      type: "area",
      color: "red",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        // blur: 3,
        color: "#0B24FB",
        opacity: 0.3,
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    dataLabels: {
      enabled: false,
      offsetX: 2,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    xaxis: {
      type: "datetime",
      categories: [
        "2022-09-21",
        "2022-09-26",
        "2022-09-29",
        "2022-10-05",
        "2022-10-12",
        "2022-10-26",
        "2022-11-06",
        "2022-11-26",
        "2022-11-30",
      ],
      axisBorder: {
        color: "rgba(235, 237, 244, 0.4)",
      },

      axisTicks: {
        show: false,
      },

      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "10px",
          fontWeight: "400",
        },
      },
    },

    yaxis: {
      min: 0,
      tickAmount: 6,
      forceNiceScale: true,
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "12px",
          fontWeight: "600",
        },
        formatter: function (value) {
          return value + "X";
        },
      },
    },
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shade: 'dark',
    //     type: "vertical",
    //     shadeIntensity: 0.5,
    //     gradientToColors: ["#5942CC", "#6D6F95", "#6D7193"], // optional, if not defined - uses the shades of same color in series
    //     inverseColors: true,
    //     opacityFrom: 1,
    //     opacityTo: 1,
    //     stops: [0, 50, 100],
    //     // colorStops: []
    //   }
    // },
    grid: {
      show: true,
      borderColor: "rgba(235, 237, 244, 0.5)",
      padding: {
        top: 10,
      },
    },
    tooltip: {
      enabled: false,
      x: {
        enbled: false,
      },
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  },
};

const Logo = () => {
  return (
    <div className="h-[35px] w-[35px] rounded-full bg-[#172639] flex justify-center items-center">
      <Image src={MultiplierLogo} alt="multiplier" />
    </div>
  );
};

const Header = () => {
  return (
    <div className="flex flex-row items-center">
      <Logo />
      <div className="flex-grow-0 order-1 text-[#EAEAEA] text-[22px] font-bold ml-4">
        Average Multiplier After Call
      </div>
    </div>
  );
};

const ChartContainer = ({ children }) => {
  return (
    <div
      className="w-[100%] rounded-[10px] bg-[#262943] lg:bg-[#141524] mt-4 lg:mt-0 flex justify-center items-center py-[46px] md:py-[20px] md:pb-[30px]"
      style={{
        backgroundBlendMode: "soft-light",
        backdropFilter: "blur(25px)",
      }}
    >
      {children}
    </div>
  );
};

const BlurBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-20 backdrop-blur-[10px] bg-blend-lighten bg-[rgba(20, 14, 24, 0.3)] rounded-[25px]"></div>
  );
};

const BackgroundText = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-30 text-[#fff] font-[600] text-[28px]">
      Compiling Data
    </div>
  );
};

export const MultiplierGraph = () => {
  return (
    <section className="bg-[#141524] mt-2 rounded-[25px] w-[100%] py-[42px] pb-[10px] px-[20px] relative">
      <BlurBackground />
      <BackgroundText/>
      <Header />
      <ChartContainer>
        <section className="w-[95%] md:w-[75%] lg:w-[85%] h-[300px] md:h-[350px]">
          <Chart
            height={"100%"}
            options={option.options}
            series={option.series}
            type="area"
            width={"100%"}
          />
          {/* <Line options={options} data={data}/> */}
        </section>
      </ChartContainer>
    </section>
  );
};
