
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import KPICard from "./KPICard";
import DayDetail from "./DayDetail";
import { TrendingUp, Heart, AlertTriangle, Smile, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DashboardProps {
  entries: any[];
}

const Dashboard = ({ entries }: DashboardProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<any>(null);

  // Génération des données pour le mois actuel
  const generateMonthData = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const monthData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day);
      const dateString = dayDate.toISOString().split('T')[0];
      
      // Chercher les données réelles pour ce jour
      const dayEntry = entries.find(entry => entry.date === dateString);
      
      // Données fictives si pas d'entrée réelle
      const intensity = dayEntry?.intensity ?? Math.floor(Math.random() * 8) + 1;
      const mood = dayEntry?.mood ?? Math.floor(Math.random() * 5) + 1;
      
      monthData.push({
        day,
        date: dateString,
        intensity,
        mood,
        hasData: !!dayEntry,
        fullData: dayEntry
      });
    }
    
    return monthData;
  };

  const chartData = generateMonthData(currentDate);

  const triggerCounts = entries.reduce<Record<string, number>>((acc, entry) => {
    entry.triggers?.forEach(t => {
      acc[t] = (acc[t] ?? 0) + 1;
    });
    return acc;
  }, {});

  const topTriggers = Object.entries(triggerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const uniqueTriggerCount = Object.keys(triggerCounts).length;
  const maxCount = topTriggers[0]?.[1] ?? 0;
  
  const avgIntensity = (chartData.reduce((sum, entry) => sum + entry.intensity, 0) / chartData.length).toFixed(1);
  const avgMood = (chartData.reduce((sum, entry) => sum + entry.mood, 0) / chartData.length).toFixed(1);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDayClick = (data: any) => {
    if (data.hasData) {
      setSelectedDay(data.fullData);
    }
  };

  const monthName = currentDate.toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Intensité moyenne"
          value={`${avgIntensity}/10`}
          subtitle="Ce mois-ci"
          icon={TrendingUp}
          color="blue"
        />
        <KPICard
          title="Humeur moyenne"
          value={`${avgMood}/5`}
          subtitle="Globalement positive"
          icon={Smile}
          color="green"
        />
        <KPICard
          title="Déclencheurs identifiés"
          value={uniqueTriggerCount}
          subtitle="Patterns reconnus"
          icon={AlertTriangle}
          color="yellow"
        />
        <KPICard
          title="Sources de joie"
          value="8"
          subtitle="Activités bénéfiques"
          icon={Heart}
          color="purple"
        />
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Évolution mensuelle - {monthName}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('prev')}
                className="zen-focus"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigateMonth('next')}
                className="zen-focus"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} onClick={handleDayClick}>
                <defs>
                  <linearGradient id="intensityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--calm-blue))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--calm-blue))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--soft-green))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--soft-green))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                  labelFormatter={(value) => `Jour ${value}`}
                  content={(props) => {
                    if (props.active && props.payload && props.payload.length > 0) {
                      const data = props.payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">Jour {data.day}</p>
                          <p className="text-calm-blue">Intensité: {data.intensity}/10</p>
                          <p className="text-soft-green">Humeur: {data.mood}/5</p>
                          {data.hasData && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Cliquer pour voir les détails
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="intensity"
                  stroke="hsl(var(--calm-blue))"
                  fillOpacity={1}
                  fill="url(#intensityGradient)"
                  strokeWidth={2}
                  className="cursor-pointer"
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--soft-green))"
                  fillOpacity={1}
                  fill="url(#moodGradient)"
                  strokeWidth={2}
                  className="cursor-pointer"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-calm-blue"></div>
              <span className="text-sm text-muted-foreground">Intensité symptômes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-soft-green"></div>
              <span className="text-sm text-muted-foreground">Humeur</span>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Cliquez sur un jour avec des données pour voir les détails
          </p>
        </CardContent>
      </Card>

      {/* Recent Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warm-yellow">
              <AlertTriangle className="h-5 w-5" />
              Déclencheurs fréquents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTriggers.length ? topTriggers.map(([name, count]) => (
                <div key={name} className="flex justify-between items-center">
                  <span className="text-sm">{name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-warm-yellow rounded-full"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{count}x</span>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground text-sm">Aucun déclencheur enregistré.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-soft-green">
              <Heart className="h-5 w-5" />
              Sources de bonheur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {["Musique apaisante", "Temps seul", "Nature", "Lecture"].map((joy, index) => (
                <div key={joy} className="flex justify-between items-center">
                  <span className="text-sm">{joy}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-soft-green rounded-full"
                        style={{ width: `${(4 - index) * 25}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{4 - index}x</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Day Detail Modal */}
      {selectedDay && (
        <DayDetail
          data={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
