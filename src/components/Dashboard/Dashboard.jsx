import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

import * as userService from "../../services/userService";

import LoadingSpinner from "./Spinner";

import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const colors = {
  lightYellow: "rgb(250, 227, 165)", // #fae3a5
  orange: "rgb(255, 165, 10)",      // #ffa50a
  pink: "rgb(255, 148, 166)",       // #ff94a6
  darkGreen: "rgb(20, 36, 35)"      // #142423
};

const Dashboard = () => {
  const { user } = useContext(UserContext);

  const [sentimentData, setSentimentData] = useState([]);
  const [emotionsData, setEmotionsData] = useState([]);
  const [keywordData, setKeywordData] = useState({});
  const [entityData, setEntityData] = useState({});

  const [loading, setLoading] = useState(true); 
  const [noLogs, setNoLogs] = useState(false); 

  useEffect(() => {
 
    
    const fetchUserDashboardData = async () => {
      if (!user?._id) return;

      try {
        const data = await userService.index(user._id);

        if (
          !data.sentimentData.length &&
          !data.emotionsData.length &&
          !Object.keys(data.keywordData).length &&
          !Object.keys(data.entityData).length
        ) {
          setNoLogs(true); 
        } else {
          setSentimentData(data.sentimentData);
          setEmotionsData(data.emotionsData);
          setKeywordData(data.keywordData);
          setEntityData(data.entityData);
          setNoLogs(false); 
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (user) fetchUserDashboardData();
    
  }, [user]);

  if (loading) {
    return <LoadingSpinner colors={colors} />;
  }

  if (noLogs) {
    return (
      <div style={{ fontFamily: "'Lexend', sans-serif", color: colors.darkGreen }}>
        <h1>Dashboard</h1>
        <p>No logs yet</p>
      </div>
    );
  }

  const sortedSentimentData = sentimentData.sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortedEmotionsData = emotionsData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const hasSentimentData = sortedSentimentData.length > 0;

  const sentimentChartData = {
    labels: sortedSentimentData.map((item) => item.date),
    datasets: [
      {
        label: "Sentiment Score",
        data: sortedSentimentData.map((item) => item.score),
        fill: false,
        borderColor: colors.orange,
        backgroundColor: colors.orange,
        tension: 0.1,
      },
    ],
  };


  const hasEmotionsData = sortedEmotionsData.length > 0;

  const emotionsChartData = {
    labels: sortedEmotionsData.map((item) => item.date),
    datasets: [
      {
        label: "Joy",
        data: sortedEmotionsData.map((item) => item.emotions.joy),
        fill: false,
        borderColor: colors.orange,
        backgroundColor: colors.orange,
        tension: 0.1,
      },
      {
        label: "Sadness",
        data: sortedEmotionsData.map((item) => item.emotions.sadness),
        fill: false,
        borderColor: colors.lightYellow,
        backgroundColor: colors.lightYellow,
        tension: 0.1,
      },
      {
        label: "Fear",
        data: sortedEmotionsData.map((item) => item.emotions.fear),
        fill: false,
        borderColor: colors.pink,
        backgroundColor: colors.pink,
        tension: 0.1,
      },
      {
        label: "Disgust",
        data: sortedEmotionsData.map((item) => item.emotions.disgust),
        fill: false,
        borderColor: colors.darkGreen,
        backgroundColor: colors.darkGreen,
        tension: 0.1,
      },
      {
        label: "Anger",
        data: sortedEmotionsData.map((item) => item.emotions.anger),
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)", // Keeping this color for contrast
        backgroundColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const hasKeywordData = Object.keys(keywordData).length > 0;

  const keywordChartData = {
    labels: Object.keys(keywordData),
    datasets: [
      {
        label: "Keyword Frequency",
        data: Object.values(keywordData),
        backgroundColor: [
          colors.lightYellow,
          colors.orange,
          colors.pink,
          colors.darkGreen,
          "rgba(153, 102, 255, 0.6)", // Keeping one different color for variety
        ],
        borderColor: [
          colors.lightYellow,
          colors.orange,
          colors.pink,
          colors.darkGreen,
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const hasEntityData = Object.keys(entityData).length > 0;

  const entityChartData = {
    labels: Object.keys(entityData),
    datasets: [
      {
        label: "Entity Frequency",
        data: Object.values(entityData),
        backgroundColor: [
          colors.lightYellow,
          colors.orange,
          colors.pink,
          colors.darkGreen,
          "rgba(153, 102, 255, 0.6)", 
        ],
        borderColor: [
          colors.lightYellow,
          colors.orange,
          colors.pink,
          colors.darkGreen,
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: "'Lexend', sans-serif",
            size: 12
          },
          color: colors.darkGreen
        }
      },
      title: {
        font: {
          family: "'Lexend', sans-serif",
          size: 16
        },
        color: colors.darkGreen
      },
      tooltip: {
        titleFont: {
          family: "'Lexend', sans-serif"
        },
        bodyFont: {
          family: "'Lexend', sans-serif"
        },
        backgroundColor: colors.darkGreen,
        titleColor: colors.lightYellow,
        bodyColor: colors.lightYellow
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Lexend', sans-serif"
          },
          color: colors.darkGreen
        },
        grid: {
          display: false 
        }
      },
      y: {
        ticks: {
          font: {
            family: "'Lexend', sans-serif"
          },
          color: colors.darkGreen
        },
        grid: {
          display: false 
        }
      }
    }
  };

  // Doughnut chart options with smaller size
  const doughnutChartOptions = {
    plugins: {
      legend: {
        position: 'right', 
        labels: {
          font: {
            family: "'Lexend', sans-serif",
            size: 10
          },
          color: colors.darkGreen
        }
      },
      tooltip: {
        titleFont: {
          family: "'Lexend', sans-serif"
        },
        bodyFont: {
          family: "'Lexend', sans-serif"
        },
        backgroundColor: colors.darkGreen,
        titleColor: colors.lightYellow,
        bodyColor: colors.lightYellow
      }
    },
    cutout: '60%', // Make the donut hole larger
    maintainAspectRatio: true,
    responsive: true
  };

  const dashboardStyle = {
    fontFamily: "'Lexend', sans-serif",
    color: colors.darkGreen,
    padding: "20px"
  };

  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px"
  };

  const chartContainerStyle = {
    width: "calc(50% - 30px)",
    maxWidth: "600px",
    padding: "15px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  };

  const donutChartContainerStyle = {
    ...chartContainerStyle,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const donutChartWrapperStyle = {
    width: "70%", 
    maxWidth: "350px", 
    margin: "0 auto"
  };

  return (
    <div style={dashboardStyle}>
      <h1 style={{ textAlign: "center", color: colors.orange }}>Hello, {user.username}!</h1>
      <h4 style={{ textAlign: "center", color: colors.pink }}>Your week in review...</h4>

      <div style={gridContainerStyle}>
        {hasSentimentData ? (
          <div style={chartContainerStyle}>
            <h3 style={{ textAlign: "center", color: colors.lightYellow }}>Sentiment</h3>
            <Line data={sentimentChartData} options={lineChartOptions} />
          </div>
        ) : null}

        {hasEmotionsData ? (
          <div style={chartContainerStyle}>
            <h3 style={{ textAlign: "center", color: colors.lightYellow }}>Emotions</h3>
            <Line data={emotionsChartData} options={lineChartOptions} />
          </div>
        ) : null}

        {hasKeywordData ? (
          <div style={donutChartContainerStyle}>
            <h3 style={{ textAlign: "center", color: colors.lightYellow }}>Keywords</h3>
            <div style={donutChartWrapperStyle}>
              <Doughnut data={keywordChartData} options={doughnutChartOptions} />
            </div>
          </div>
        ) : null}

        {hasEntityData ? (
          <div style={donutChartContainerStyle}>
            <h3 style={{ textAlign: "center", color: colors.lightYellow }}>Entities</h3>
            <div style={donutChartWrapperStyle}>
              <Doughnut data={entityChartData} options={doughnutChartOptions} />
            </div>
          </div>
        ) : null}
      </div>

      {!hasSentimentData && !hasEmotionsData && !hasKeywordData && !hasEntityData && (
        <p style={{ textAlign: "center", color: colors.pink }}>No data available to display in charts</p>
      )}
    </div>
  );
};

export default Dashboard;