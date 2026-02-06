import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DEMO_SCENARIOS } from "@/lib/data/demo-scenarios";
import { Target, ShieldAlert, Users, Info } from "lucide-react";

interface ScenarioSummaryCardProps {
    scenarioId: string;
}

export function ScenarioSummaryCard({ scenarioId }: ScenarioSummaryCardProps) {
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId);

    if (!scenario) return null;

    return (
        <Card className="border-l-4 border-l-primary shadow-md bg-secondary/10 mb-8 border-t-0 border-r-0 border-b-0">
            <CardHeader className="py-4 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl bg-background rounded-lg p-1 shadow-sm border">{scenario.icon}</span>
                        <div>
                            <CardTitle className="text-lg font-bold">{scenario.title}</CardTitle>
                            <div className="text-xs text-muted-foreground flex gap-2 items-center mt-1">
                                <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal">{scenario.category}</Badge>
                                <span>Scenario Context Active</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant={scenario.riskLevel === "HIGH" || scenario.riskLevel === "CRITICAL" ? "destructive" : "secondary"}>
                        {scenario.riskLevel} Risk
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="py-4 pt-2">
                <p className="text-sm text-foreground/80 mb-4 bg-background/50 p-2 rounded-md border border-border/50 leading-relaxed">
                    {scenario.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm pt-2">
                    <div className="flex gap-2 items-start bg-background/40 p-2 rounded-md">
                        <Target className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <span className="font-semibold block text-xs uppercase text-muted-foreground mb-1">Purpose</span>
                            <span className="text-foreground/90 text-xs leading-tight block">{scenario.details.purpose}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start bg-background/40 p-2 rounded-md">
                        <ShieldAlert className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <span className="font-semibold block text-xs uppercase text-muted-foreground mb-1">Regulations</span>
                            <div className="flex flex-wrap gap-1">
                                {scenario.details.regulations.map(reg => (
                                    <Badge key={reg} variant="secondary" className="text-[10px] h-4 px-1 rounded-[4px]">{reg}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start bg-background/40 p-2 rounded-md">
                        <Users className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                            <span className="font-semibold block text-xs uppercase text-muted-foreground mb-1">Stakeholders</span>
                            <span className="text-foreground/90 text-xs leading-tight block">{scenario.details.stakeholders.join(", ")}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
