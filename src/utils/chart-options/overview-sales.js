import { alpha } from '@mui/material/styles';
import { daysNumber, monthString } from "../data";

export const configAnnual = {
  chart: {
    background: 'transparent',
    stacked: false,
    toolbar: {
      show: false
    }
  },
  colors: ['#2367fa', alpha('#2367fa', 0.5)],
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: 1,
    type: 'solid'
  },
  grid: {
    borderColor: '#78909c',
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  legend: {
    show: false
  },
  plotOptions: {
    bar: {
      columnWidth: '40px'
    }
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2
  },
  theme: {
    mode: 'light'
  },
  xaxis: {
    axisBorder: {
      color: '#303030',
      show: true
    },
    axisTicks: {
      color: '#303030',
      show: true
    },
    categories: monthString,
    labels: {
      offsetY: 5,
      style: {
        colors: '#303030'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => (value > 0 ? `${value}` : `${value}`),
      offsetX: -10,
      style: {
        colors: '#303030'
      }
    }
  }
};

export const configMonthly = {
  chart: {
    background: 'transparent',
    stacked: false,
    toolbar: {
      show: false
    }
  },
  colors: ['#2367fa', alpha('#2367fa', 0.5)],
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: 1,
    type: 'solid'
  },
  grid: {
    borderColor: '#78909c',
    strokeDashArray: 2,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  legend: {
    show: false
  },
  plotOptions: {
    bar: {
      columnWidth: '40px'
    }
  },
  stroke: {
    colors: ['transparent'],
    show: true,
    width: 2
  },
  theme: {
    mode: 'light'
  },
  xaxis: {
    axisBorder: {
      color: '#303030',
      show: true
    },
    axisTicks: {
      color: '#303030',
      show: true
    },
    categories: daysNumber,
    labels: {
      offsetY: 5,
      style: {
        colors: '#303030'
      }
    }
  },
  yaxis: {
    labels: {
      formatter: (value) => (value > 0 ? `${value}` : `${value}`),
      offsetX: -10,
      style: {
        colors: '#303030'
      }
    }
  }
};