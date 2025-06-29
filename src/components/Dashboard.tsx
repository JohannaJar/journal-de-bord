
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import KPICard from "./KPICard";
import { TrendingUp, Heart, AlertTriangle, Smile, Calendar } from "lucide-react";

interface DashboardProps {
  entries: any[];
}

const Dashboard = ({ entries }: DashboardProps) => {
  // Mock data for demonstration
  const chartData = [
    { date: '1', intensity: 6, mood: 3 },
    { date: '2', intensity: 4, mood: 4 },
    { date: '3', intensity: 7, mood: 2 },
    { date: '4', intensity: 3, mood: 5 },
    { date: '5', intensity: 5, mood: 3 },
    { date: '6', intensity: 2, mood: 4 },
    { date: '7', intensity: 8, mood: 2 },
    { date: '8', intensity: 4, mood: 4 },
    { date: '9', intensity: 3, mood: 5 },
    { date: '10', intensity: 6, mood: 3 },
    { date: '11', intensity: 5, mood: 4 },
    { date: '12', intensity: 2, mood: 5 },
    { date: '13', intensity: 7, mood: 2 },
    { date: '14', intensity: 4, mood: 4 },
    { date: '15', intensity: 3, mood: 5 }
  ];

  const avgIntensity = (chartData.reduce((sum, entry) => sum + entry.intensity, 0) / chartData.length).toFixed(1);
  const avgMood = (chartData.reduce((sum, entry) => sum + entry.mood, 0) / chartData.length).toFixed(1);

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
          value="12"
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
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Évolution mensuelle - Intensité & Humeur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
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
                  dataKey="date"
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
                />
                <Area
                  type="monotone"
                  dataKey="intensity"
                  stroke="hsl(var(--calm-blue))"
                  fillOpacity={1}
                  fill="url(#intensityGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--soft-green))"
                  fillOpacity={1}
                  fill="url(#moodGradient)"
                  strokeWidth={2}
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
              {["Bruit fort", "Changement imprévu", "Fatigue", "Foule"].map((trigger, index) => (
                <div key={trigger} className="flex justify-between items-center">
                  <span className="text-sm">{trigger}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warm-yellow rounded-full"
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
    </div>
  );
};

export default Dashboard;
