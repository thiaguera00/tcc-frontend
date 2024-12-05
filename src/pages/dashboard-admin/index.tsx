import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Box, Typography, Container, CircularProgress, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import './index.css';
import NavBarAdmin from "../../Components/nav-gerenciar-user";
import NavAdm from "../../Components/navLateralADM";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

export const DashboardAdmin = () => {
  const [userStats, setUserStats] = useState<{ active: number; inactive: number } | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<Record<string, number>>({});
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterField, setFilterField] = useState("level_knowledge");
  const [filteredData, setFilteredData] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activeUsersResponse, listUsersResponse, surveyUsersResponse] = await Promise.all([
          axios.get("http://localhost:3000/users/active-users"),
          axios.get("http://localhost:3000/users/listUsers"),
          axios.get("http://localhost:3000/users/search-users"),
        ]);

        setUserStats(activeUsersResponse.data.count);

        const registrations = listUsersResponse.data.reduce((acc: Record<string, number>, user: any) => {
          const date = new Date(user.created_at);
          const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
        setUserRegistrations(registrations);

        setSurveyData(surveyUsersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {

    const dataCounts = surveyData.reduce((acc: Record<string, number>, response: any) => {
      const value = response[filterField];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    setFilteredData(dataCounts);
  }, [filterField, surveyData]);

  const handleFilterChange = (event: any) => {
    setFilterField(event.target.value);
  };

  const chartData = {
    labels: Object.keys(filteredData),
    datasets: [
      {
        label: `Dados por ${filterField}`,
        data: Object.values(filteredData),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: `Gráfico de Respostas por ${filterField}`,
        color: "#ffffff",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        title: {
          display: true,
          text: filterField,
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  const registrationData = {
    labels: Object.keys(userRegistrations).sort(),
    datasets: [
      {
        label: "Novos Usuários",
        data: Object.values(userRegistrations),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

  const registrationOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Registros Mensais de Usuários",
        color: "#ffffff",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Quantidade",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      x: {
        title: {
          display: true,
          text: "Mês/Ano",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="main">
      <NavBarAdmin title="NIX admin" />
      <NavAdm />
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, color: "#fff" }}>
          Dashboard Admin
        </Typography>

        {loading ? (
          <CircularProgress sx={{ color: "#fff" }} />
        ) : (
          <Grid container spacing={4}>
            {/* Gráfico de usuários ativos e inativos */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: 4,
                  bgcolor: "#162447",
                  borderRadius: 4,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Bar
                  data={{
                    labels: ["Ativos", "Inativos"],
                    datasets: [
                      {
                        label: "Usuários",
                        data: userStats ? [userStats.active, userStats.inactive] : [0, 0],
                        backgroundColor: ["#4caf50", "#f44336"],
                        borderColor: ["#388e3c", "#d32f2f"],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                        labels: {
                          color: "#ffffff",
                        },
                      },
                      title: {
                        display: true,
                        text: "Usuários Ativos e Inativos",
                        color: "#ffffff",
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: "Quantidade",
                          color: "#ffffff",
                        },
                        ticks: {
                          color: "#ffffff",
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: "Status",
                          color: "#ffffff",
                        },
                        ticks: {
                          color: "#ffffff",
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Grid>

            {/* Gráfico de registros por mês */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  padding: 4,
                  bgcolor: "#162447",
                  borderRadius: 4,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Line data={registrationData} options={registrationOptions} />
              </Box>
            </Grid>

            {/* Gráfico com filtro */}
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: 4,
                  bgcolor: "#162447",
                  borderRadius: 4,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FormControl variant="filled" sx={{ minWidth: 200, mb: 4 }}>
                  <InputLabel id="filter-select-label" sx={{ color: "#fff" }}>Filtrar por</InputLabel>
                  <Select
                    labelId="filter-select-label"
                    value={filterField}
                    onChange={handleFilterChange}
                    sx={{ color: "#fff", bgcolor: "#162447" }}
                  >
                    <MenuItem value="level_knowledge">Nível de Conhecimento</MenuItem>
                    <MenuItem value="language">Linguagem</MenuItem>
                    <MenuItem value="learning_objective">Objetivo de Aprendizagem</MenuItem>
                  </Select>
                </FormControl>

                <Bar data={chartData} options={chartOptions} />
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};
