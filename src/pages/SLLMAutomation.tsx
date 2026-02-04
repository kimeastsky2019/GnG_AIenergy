import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Brain,
  Settings,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Code,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Eye,
  Cpu,
  Database,
  Server
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { IMAGES } from "@/assets/images";
import { springPresets, fadeInUp } from "@/lib/motion";



export default function SLLMAutomation() {
  const { t } = useTranslation();

  const SLLM_MODELS = useMemo(() => [
    {
      id: "energy_risk_analyzer_v1",
      name: "Energy Risk Analyzer v1.0",
      description: t('sllm_data.models.energy_risk_v1_desc'),
      size: "7B",
      accuracy: 94.2,
      status: "TRAINED",
      lastUpdated: "2026-01-30"
    },
    {
      id: "compliance_checker_v2",
      name: "Compliance Checker v2.1",
      description: t('sllm_data.models.compliance_v2_desc'),
      size: "13B",
      accuracy: 97.8,
      status: "TRAINING",
      lastUpdated: "2026-01-31"
    },
    {
      id: "bias_detector_v1",
      name: "Bias Detector v1.5",
      description: t('sllm_data.models.bias_v1_desc'),
      size: "7B",
      accuracy: 91.5,
      status: "TRAINED",
      lastUpdated: "2026-01-29"
    }
  ], [t]);

  const PROMPT_TEMPLATES = useMemo(() => [
    {
      id: "risk_assessment",
      name: t('sllm_data.templates.risk_assessment_name'),
      category: "Risk Assessment",
      template: t('sllm_data.templates.risk_assessment_content')
    },
    {
      id: "compliance_check",
      name: t('sllm_data.templates.compliance_check_name'),
      category: "Compliance",
      template: t('sllm_data.templates.compliance_check_content')
    },
    {
      id: "bias_analysis",
      name: t('sllm_data.templates.bias_analysis_name'),
      category: "Bias Detection",
      template: t('sllm_data.templates.bias_analysis_content')
    }
  ], [t]);

  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState<any>(null);

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleStartEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setEvaluationResults({
        accuracy: 94.7,
        precision: 92.3,
        recall: 96.1,
        f1Score: 94.2,
        biasScore: 0.08,
        complianceRate: 97.5
      });
      setIsEvaluating(false);
    }, 3000);
  };

  const handleExportModel = () => {
    // 실제로는 서버에서 모델 파일을 생성하고 다운로드 링크를 제공
    const exportData = {
      model_name: selectedModel,
      export_date: new Date().toISOString(),
      model_config: {
        architecture: "transformer",
        parameters: "7B",
        quantization: "int8",
        optimization: "onnx"
      },
      deployment_config: {
        hardware_requirements: {
          min_ram: "16GB",
          min_gpu: "RTX 4090 or equivalent",
          storage: "50GB"
        },
        runtime: "onnx_runtime",
        api_format: "rest_api"
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedModel}_export_config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Brain className="w-4 h-4" />
                <span>{t('sllm_automation.header.badge')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('sllm_automation.header.title_prefix')} <span className="text-primary">{t('sllm_automation.header.title_highlight')}</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('sllm_automation.header.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="models" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="models">{t('sllm_automation.tabs.models')}</TabsTrigger>
                <TabsTrigger value="prompts">{t('sllm_automation.tabs.prompts')}</TabsTrigger>
                <TabsTrigger value="training">{t('sllm_automation.tabs.training')}</TabsTrigger>
                <TabsTrigger value="export">{t('sllm_automation.tabs.export')}</TabsTrigger>
              </TabsList>

              {/* sLLM Models Management */}
              <TabsContent value="models" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="w-5 h-5 text-primary" />
                          {t('sllm_automation.models.available_title')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {SLLM_MODELS.map((model) => (
                          <div
                            key={model.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${selectedModel === model.id ? "border-primary bg-primary/5" : ""
                              }`}
                            onClick={() => setSelectedModel(model.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold text-sm">{model.name}</div>
                                <div className="text-xs text-muted-foreground">{model.description}</div>
                              </div>
                              <Badge variant={model.status === "TRAINED" ? "default" : "secondary"}>
                                {model.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{t('sllm_automation.models.size')}: {model.size}</span>
                              <span>{t('sllm_automation.models.accuracy')}: {model.accuracy}%</span>
                              <span>{t('sllm_automation.models.updated')}: {model.lastUpdated}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>모델 성능 지표</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedModel && (
                          <div className="space-y-4">
                            {(() => {
                              const model = SLLM_MODELS.find(m => m.id === selectedModel);
                              if (!model) return null;

                              return (
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">{t('sllm_automation.models.total_accuracy')}</span>
                                    <span className="font-semibold">{model.accuracy}%</span>
                                  </div>
                                  <Progress value={model.accuracy} className="h-2" />

                                  <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                      <div className="text-lg font-bold text-primary">92.3%</div>
                                      <div className="text-xs text-muted-foreground">Precision</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                      <div className="text-lg font-bold text-primary">96.1%</div>
                                      <div className="text-xs text-muted-foreground">Recall</div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.models.realtime_test_title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="test-input">{t('sllm_automation.models.input_label')}</Label>
                          <Textarea
                            id="test-input"
                            placeholder={t('sllm_automation.models.input_placeholder')}
                            className="mt-2"
                            rows={6}
                          />
                        </div>

                        <Button
                          onClick={handleStartEvaluation}
                          disabled={!selectedModel || isEvaluating}
                          className="w-full"
                        >
                          {isEvaluating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              {t('sllm_automation.models.btn_evaluating')}
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              {t('sllm_automation.models.btn_evaluate')}
                            </>
                          )}
                        </Button>

                        {evaluationResults && (
                          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="font-semibold text-green-800 mb-3">{t('sllm_automation.models.eval_complete')}</div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>{t('sllm_automation.models.eval_metrics.accuracy')}: {evaluationResults.accuracy}%</div>
                              <div>{t('sllm_automation.models.eval_metrics.precision')}: {evaluationResults.precision}%</div>
                              <div>{t('sllm_automation.models.eval_metrics.recall')}: {evaluationResults.recall}%</div>
                              <div>{t('sllm_automation.models.eval_metrics.f1')}: {evaluationResults.f1Score}%</div>
                              <div>{t('sllm_automation.models.eval_metrics.bias')}: {evaluationResults.biasScore}</div>
                              <div>{t('sllm_automation.models.eval_metrics.compliance')}: {evaluationResults.complianceRate}%</div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.models.automation_settings_title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{t('sllm_automation.models.auto_risk')}</div>
                            <div className="text-xs text-muted-foreground">{t('sllm_automation.models.auto_risk_desc')}</div>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{t('sllm_automation.models.realtime_compliance')}</div>
                            <div className="text-xs text-muted-foreground">{t('sllm_automation.models.realtime_compliance_desc')}</div>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{t('sllm_automation.models.auto_bias')}</div>
                            <div className="text-xs text-muted-foreground">{t('sllm_automation.models.auto_bias_desc')}</div>
                          </div>
                          <Switch />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Prompt Engineering */}
              <TabsContent value="prompts" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Code className="w-5 h-5 text-primary" />
                          {t('sllm_automation.prompts.library_title')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {PROMPT_TEMPLATES.map((template) => (
                          <div
                            key={template.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${selectedPrompt === template.id ? "border-primary bg-primary/5" : ""
                              }`}
                            onClick={() => {
                              setSelectedPrompt(template.id);
                              setCustomPrompt(template.template);
                            }}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-semibold text-sm">{template.name}</div>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {template.category}
                                </Badge>
                              </div>
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.prompts.optimizer_title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>{t('sllm_automation.prompts.auto_complete')}</Label>
                          <div className="flex flex-wrap gap-2">
                            {["{system_name}", "{purpose}", "{data_types}", "{impact_level}"].map((variable) => (
                              <Button
                                key={variable}
                                variant="outline"
                                size="sm"
                                onClick={() => setCustomPrompt(prev => prev + " " + variable)}
                              >
                                {variable}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>{t('sllm_automation.prompts.validation')}</Label>
                          <Button variant="outline" className="w-full">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            {t('sllm_automation.prompts.btn_validate')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.prompts.editor_title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="prompt-editor">{t('sllm_automation.prompts.editor_label')}</Label>
                          <Textarea
                            id="prompt-editor"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="mt-2 font-mono text-sm"
                            rows={15}
                            placeholder={t('sllm_automation.prompts.editor_placeholder')}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <FileText className="w-4 h-4 mr-2" />
                            {t('sllm_automation.prompts.btn_save')}
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            {t('sllm_automation.prompts.btn_test')}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.prompts.analysis_title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-primary">8.7/10</div>
                              <div className="text-xs text-muted-foreground">{t('sllm_automation.prompts.clarity')}</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-primary">9.2/10</div>
                              <div className="text-xs text-muted-foreground">{t('sllm_automation.prompts.completeness')}</div>
                            </div>
                            <div className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-primary">7.8/10</div>
                              <div className="text-xs text-muted-foreground">{t('sllm_automation.prompts.efficiency')}</div>
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="text-sm font-medium text-blue-800 mb-2">{t('sllm_automation.prompts.suggestions_title')}</div>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• {t('sllm_automation.prompts.suggestion_1')}</li>
                              <li>• {t('sllm_automation.prompts.suggestion_2')}</li>
                              <li>• {t('sllm_automation.prompts.suggestion_3')}</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Fine-tuning */}
              <TabsContent value="training" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-primary" />
                          {t('sllm_automation.training.settings_title')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>{t('sllm_automation.training.base_model')}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sllm_automation.training.base_model_placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="llama2-7b">Llama 2 7B</SelectItem>
                              <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                              <SelectItem value="gemma-7b">Gemma 7B</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{t('sllm_automation.training.dataset_label')}</Label>
                          <div className="p-3 border-2 border-dashed border-muted rounded-lg text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                            <div className="text-sm text-muted-foreground">
                              {t('sllm_automation.training.upload_instruction')}
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                              {t('sllm_automation.training.btn_select_file')}
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('sllm_automation.training.learning_rate')}</Label>
                            <Input type="number" defaultValue="0.0001" step="0.0001" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('sllm_automation.training.batch_size')}</Label>
                            <Input type="number" defaultValue="16" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t('sllm_automation.training.epochs')}</Label>
                            <Input type="number" defaultValue="10" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t('sllm_automation.training.validation_split')}</Label>
                            <Input type="number" defaultValue="0.2" step="0.1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.training.quality_title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="font-semibold text-green-800 mb-2">{t('sllm_automation.training.quality_good')}</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>{t('sllm_automation.training.total_samples')}: 15,847개</div>
                              <div>{t('sllm_automation.training.label_accuracy')}: 98.2%</div>
                              <div>{t('sllm_automation.training.balance')}: 87.5%</div>
                              <div>{t('sllm_automation.training.deduplication')}: 99.1%</div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="text-sm font-semibold">{t('sllm_automation.training.distribution_title')}</div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs">{t('sllm_automation.training.cat_risk')}</span>
                                <span className="text-xs">35%</span>
                              </div>
                              <Progress value={35} className="h-1" />

                              <div className="flex justify-between items-center">
                                <span className="text-xs">{t('sllm_automation.training.cat_compliance')}</span>
                                <span className="text-xs">28%</span>
                              </div>
                              <Progress value={28} className="h-1" />

                              <div className="flex justify-between items-center">
                                <span className="text-xs">{t('sllm_automation.training.cat_bias')}</span>
                                <span className="text-xs">37%</span>
                              </div>
                              <Progress value={37} className="h-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>파인튜닝 실행</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-semibold">학습 진행 상황</div>
                            <div className="text-sm text-muted-foreground">
                              {isTraining ? `${Math.round(trainingProgress)}%` : "대기 중"}
                            </div>
                          </div>
                          <Progress value={trainingProgress} className="h-3 mb-4" />

                          {isTraining && (
                            <div className="text-xs text-muted-foreground space-y-1">
                              <div>현재 에포크: {Math.floor(trainingProgress / 10) + 1}/10</div>
                              <div>예상 완료 시간: {Math.max(0, Math.round((100 - trainingProgress) * 0.5))}분</div>
                              <div>GPU 사용률: 87%</div>
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={handleStartTraining}
                          disabled={isTraining}
                          className="w-full"
                        >
                          {isTraining ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              학습 중단
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              파인튜닝 시작
                            </>
                          )}
                        </Button>

                        {trainingProgress === 100 && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              파인튜닝 완료
                            </div>
                            <div className="text-sm text-green-700 space-y-1">
                              <div>최종 정확도: 96.8% (+2.6% 향상)</div>
                              <div>검증 손실: 0.023</div>
                              <div>학습 시간: 2시간 34분</div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>학습 로그</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs">
                          <div className="text-muted-foreground">[2026-01-31 15:23:45] 학습 데이터 로딩 완료</div>
                          <div className="text-muted-foreground">[2026-01-31 15:23:46] 모델 초기화 완료</div>
                          <div className="text-blue-600">[2026-01-31 15:23:47] Epoch 1/10 시작</div>
                          <div className="text-muted-foreground">[2026-01-31 15:24:12] Batch 100/500 - Loss: 0.245</div>
                          <div className="text-muted-foreground">[2026-01-31 15:24:35] Batch 200/500 - Loss: 0.198</div>
                          <div className="text-green-600">[2026-01-31 15:25:01] Epoch 1 완료 - Validation Accuracy: 89.2%</div>
                          <div className="text-blue-600">[2026-01-31 15:25:02] Epoch 2/10 시작</div>
                          <div className="text-muted-foreground">[2026-01-31 15:25:28] Batch 100/500 - Loss: 0.156</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* On-premise Export */}
              <TabsContent value="export" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Server className="w-5 h-5 text-primary" />
                          {t('sllm_automation.export.settings_title')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>{t('sllm_automation.export.select_model_label')}</Label>
                          <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger>
                              <SelectValue placeholder={t('sllm_automation.export.select_model_placeholder')} />
                            </SelectTrigger>
                            <SelectContent>
                              {SLLM_MODELS.filter(m => m.status === "TRAINED").map((model) => (
                                <SelectItem key={model.id} value={model.id}>
                                  {model.name} ({model.size})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{t('sllm_automation.export.env_label')}</Label>
                          <Select defaultValue="docker">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="docker">Docker Container</SelectItem>
                              <SelectItem value="kubernetes">Kubernetes</SelectItem>
                              <SelectItem value="bare-metal">Bare Metal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{t('sllm_automation.export.hw_optim_label')}</Label>
                          <Select defaultValue="gpu">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cpu">CPU Only</SelectItem>
                              <SelectItem value="gpu">GPU Accelerated</SelectItem>
                              <SelectItem value="tpu">TPU Optimized</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>{t('sllm_automation.export.compression_label')}</Label>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{t('sllm_automation.export.quantization')}</span>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{t('sllm_automation.export.pruning')}</span>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{t('sllm_automation.export.distillation')}</span>
                              <Switch />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.export.requirements_title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedModel && (
                          <div className="space-y-4">
                            <div className="p-4 bg-muted rounded-lg">
                              <div className="font-semibold mb-3">{t('sllm_automation.export.min_req_title')}</div>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>{t('sllm_automation.export.ram')}:</span>
                                  <span className="font-medium">16GB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{t('sllm_automation.export.gpu')}:</span>
                                  <span className="font-medium">RTX 4090 {t('sllm_automation.export.or_equivalent')}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{t('sllm_automation.export.storage')}:</span>
                                  <span className="font-medium">50GB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>{t('sllm_automation.export.network')}:</span>
                                  <span className="font-medium">1Gbps</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                              <div className="font-semibold text-blue-800 mb-2">{t('sllm_automation.export.rec_req_title')}</div>
                              <div className="text-sm text-blue-700 space-y-1">
                                <div>• {t('sllm_automation.export.rec_ram')}</div>
                                <div>• {t('sllm_automation.export.rec_gpu')}</div>
                                <div>• {t('sllm_automation.export.rec_ssd')}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.export.package_title')}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg">
                          <div className="font-semibold mb-3">{t('sllm_automation.export.components_title')}</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{t('sllm_automation.export.comp_model')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{t('sllm_automation.export.comp_prompt')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{t('sllm_automation.export.comp_api')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{t('sllm_automation.export.comp_docker')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              <span>{t('sllm_automation.export.comp_guide')}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handleExportModel}
                          disabled={!selectedModel}
                          className="w-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {t('sllm_automation.export.btn_download')}
                        </Button>

                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="font-semibold text-yellow-800 mb-2">{t('sllm_automation.export.size_est_title')}</div>
                          <div className="text-sm text-yellow-700">
                            {t('sllm_automation.export.size_est_desc')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('sllm_automation.export.guide_title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="font-semibold text-sm">{t('sllm_automation.export.step_1')}</div>
                            <div className="p-3 bg-muted rounded font-mono text-xs">
                              # Docker 설치 확인<br />
                              docker --version<br /><br />
                              # NVIDIA Container Toolkit 설치<br />
                              sudo apt install nvidia-container-toolkit
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="font-semibold text-sm">{t('sllm_automation.export.step_2')}</div>
                            <div className="p-3 bg-muted rounded font-mono text-xs">
                              # 패키지 압축 해제<br />
                              tar -xzf sllm_energy_risk_v1.tar.gz<br /><br />
                              # Docker 컨테이너 실행<br />
                              docker-compose up -d
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="font-semibold text-sm">{t('sllm_automation.export.step_3')}</div>
                            <div className="p-3 bg-muted rounded font-mono text-xs">
                              # API 서버 상태 확인<br />
                              curl http://localhost:8080/health<br /><br />
                              # 웹 인터페이스 접속<br />
                              http://localhost:3000
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('sllm_automation.benefits.title')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('sllm_automation.benefits.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Zap,
                  title: t('sllm_automation.benefits.b1_title'),
                  description: t('sllm_automation.benefits.b1_desc'),
                  metric: "< 30s"
                },
                {
                  icon: Cpu,
                  title: t('sllm_automation.benefits.b2_title'),
                  description: t('sllm_automation.benefits.b2_desc'),
                  metric: "-90%"
                },
                {
                  icon: Database,
                  title: t('sllm_automation.benefits.b3_title'),
                  description: t('sllm_automation.benefits.b3_desc'),
                  metric: "100%"
                },
                {
                  icon: Settings,
                  title: t('sllm_automation.benefits.b4_title'),
                  description: t('sllm_automation.benefits.b4_desc'),
                  metric: "96.8%"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mx-auto mb-4">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{benefit.description}</p>
                  <div className="text-primary font-bold text-lg">{benefit.metric}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('sllm_automation.architecture.title')}</h2>
              <p className="text-muted-foreground">
                {t('sllm_automation.architecture.description')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    {t('sllm_automation.architecture.cards.engine_title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">Risk Assessment sLLM</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.engine_desc_risk')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">Compliance Checker sLLM</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.engine_desc_compliance')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">Bias Detector sLLM</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.engine_desc_bias')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-500" />
                    {t('sllm_automation.architecture.cards.prompt_title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.dynamic_prompt')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.prompt_desc_dynamic')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.context_opt')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.prompt_desc_context')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.format_std')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.prompt_desc_format')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-purple-500" />
                    {t('sllm_automation.architecture.cards.deploy_title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.docker')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.deploy_desc_docker')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.api_gateway')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.deploy_desc_api')}</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">{t('sllm_automation.architecture.items.monitor_dashboard')}</div>
                      <div className="text-xs text-muted-foreground">{t('sllm_automation.architecture.cards.deploy_desc_monitor')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-16 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{t('sllm_automation.roi.title')}</h2>
                <p className="text-muted-foreground/80">
                  {t('sllm_automation.roi.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/10 border-white/20">
                  <CardHeader>
                    <CardTitle className="text-background">{t('sllm_automation.roi.manual_title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-background/80">
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.expert_cost')}:</span>
                        <span className="font-semibold">₩150,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.time_per_system')}:</span>
                        <span className="font-semibold">8h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.monthly_cases')}:</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between text-lg font-bold text-background">
                        <span>{t('sllm_automation.roi.monthly_total')}:</span>
                        <span>₩14,400,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-background">{t('sllm_automation.roi.auto_title')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-background/80">
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.setup_cost')}:</span>
                        <span className="font-semibold">₩50,000,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.monthly_op_cost')}:</span>
                        <span className="font-semibold">₩1,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('sllm_automation.roi.time_per_eval')}:</span>
                        <span className="font-semibold">30s</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between text-lg font-bold text-background">
                        <span>{t('sllm_automation.roi.monthly_savings')}:</span>
                        <span className="text-green-400">₩13,200,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <div className="p-6 bg-green-500/20 border border-green-500/30 rounded-2xl">
                  <div className="text-2xl font-bold text-green-400 mb-2">{t('sllm_automation.roi.payback_period')}</div>
                  <div className="text-background/80">{t('sllm_automation.roi.annual_savings')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}