import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Plus, 
  Trash2, 
  Play, 
  Settings, 
  BookOpen, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  User,
  Zap,
  MessageSquare,
  Terminal
} from 'lucide-react';

// --- Sub-Components (Defined Outside to Prevent Focus Loss) ---

const WorkflowBuilder = ({ agents, setAgents, judgeInstructions, setJudgeInstructions }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-500" />
          1. Define Specialist Agents (Resources)
        </h2>
        <button 
          onClick={() => setAgents([...agents, { id: Math.random().toString(36).substr(2, 5), name: 'New_Agent', instructions: '' }])}
          className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Agent
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.length === 0 && (
          <div className="md:col-span-2 py-8 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 text-sm italic">
            No agents defined. Add agents for the Judge to consult.
          </div>
        )}
        {agents.map((agent, idx) => (
          <div key={agent.id} className="p-4 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-950 relative group">
            <button 
              onClick={() => setAgents(agents.filter(a => a.id !== agent.id))}
              className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex gap-2 mb-2">
              <input 
                value={agent.name} 
                onChange={(e) => {
                  const next = [...agents];
                  next[idx].name = e.target.value.replace(/\s+/g, '_');
                  setAgents(next);
                }}
                className="bg-transparent font-semibold focus:outline-none focus:ring-1 ring-indigo-200 rounded px-1 w-full"
                placeholder="Agent_Name (No spaces)"
              />
            </div>
            <textarea 
              value={agent.instructions}
              onChange={(e) => {
                const next = [...agents];
                next[idx].instructions = e.target.value;
                setAgents(next);
              }}
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-2 h-20"
              placeholder="System instructions for this resource..."
            />
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-indigo-200 dark:border-indigo-900 shadow-md ring-2 ring-indigo-50 dark:ring-indigo-950/20">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-indigo-600" />
        2. Judge (The Main Agent)
      </h2>
      <div className="mb-4">
        <label className="text-[10px] uppercase font-bold text-slate-400 mb-1 block">Judge Instructions & Handoff Logic</label>
        <textarea 
          value={judgeInstructions}
          onChange={(e) => setJudgeInstructions(e.target.value)}
          className="w-full text-sm bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 h-48 focus:ring-2 ring-indigo-200"
          placeholder="e.g. First call the Prosecutor for an argument, then send that argument to the Defense for a rebuttal, then summarize..."
        />
      </div>
      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
        <label className="text-[10px] uppercase font-bold text-slate-400 mb-2 block">Enabled Tools for Judge</label>
        <div className="flex flex-wrap gap-2">
          {agents.map(a => (
            <div key={a.id} className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Zap className="w-3 h-3 text-indigo-500" />
              {a.name}
            </div>
          ))}
          {agents.length === 0 && <span className="text-xs text-slate-400 italic">Add agents above to enable them as Judge tools.</span>}
        </div>
      </div>
    </section>
  </div>
);

const DataManager = ({ testPairs, setTestPairs }) => (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Case Evidence Pairs</h2>
        <button 
          onClick={() => setTestPairs([...testPairs, { id: Math.random().toString(), factA: '', factB: '', result: null, logs: [] }])}
          className="text-sm bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Add Pair
        </button>
      </div>
      <div className="space-y-4">
        {testPairs.map((pair, idx) => (
          <div key={pair.id} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <button 
              onClick={() => setTestPairs(testPairs.filter(p => p.id !== pair.id))}
              className="absolute -top-2 -right-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-1 rounded-full text-red-500 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">FACT A</label>
              <textarea 
                value={pair.factA}
                onChange={(e) => {
                  const next = [...testPairs];
                  next[idx].factA = e.target.value;
                  setTestPairs(next);
                }}
                className="w-full text-sm p-2 rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900 h-20"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">FACT B</label>
              <textarea 
                value={pair.factB}
                onChange={(e) => {
                  const next = [...testPairs];
                  next[idx].factB = e.target.value;
                  setTestPairs(next);
                }}
                className="w-full text-sm p-2 rounded border border-slate-200 dark:border-slate-800 dark:bg-slate-900 h-20"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ResultsView = ({ metrics, isRunning, runWorkflow, progress, testPairs }) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const activeCase = testPairs[selectedCaseIdx];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <div className="text-indigo-100 text-xs font-bold uppercase mb-1">Processing Time</div>
            <div className="text-3xl font-mono font-bold">{metrics.totalTime}s</div>
          </div>
          <Clock className="w-10 h-10 opacity-20" />
        </div>
        <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg flex items-center justify-between">
          <div>
            <div className="text-emerald-100 text-xs font-bold uppercase mb-1">Tokens (Est.)</div>
            <div className="text-3xl font-mono font-bold">{metrics.totalTokens.toLocaleString()}</div>
          </div>
          <Zap className="w-10 h-10 opacity-20" />
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
          <button 
            disabled={isRunning}
            onClick={runWorkflow}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition-all ${isRunning ? 'bg-slate-700 cursor-not-allowed' : 'bg-white text-slate-900 hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {isRunning ? <Cpu className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
            {isRunning ? 'Deliberating...' : 'Commence Agentic Session'}
          </button>
          {isRunning && (
            <div className="mt-2 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-indigo-400 h-full transition-all duration-500" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Cases</h3>
          {testPairs.map((pair, idx) => (
            <button
              key={pair.id}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${selectedCaseIdx === idx ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300' : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800 hover:border-indigo-200'}`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[10px] font-mono opacity-50">#{idx + 1}</span>
                <span className="text-xs truncate font-medium">{pair.factA.substring(0, 15) || "Empty Case"}...</span>
              </div>
              {pair.result ? <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" /> : pair.logs?.length > 0 ? <Cpu className="w-3 h-3 text-indigo-400 animate-spin" /> : null}
            </button>
          ))}
        </div>

        {/* Detail Main View */}
        <div className="lg:col-span-9 space-y-4">
          {activeCase && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="font-bold text-sm uppercase">Case Record #{selectedCaseIdx + 1}</span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400">FACT A</div>
                    <p className="text-sm italic leading-relaxed">"{activeCase.factA || "No statement provided."}"</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400">FACT B</div>
                    <p className="text-sm italic leading-relaxed">"{activeCase.factB || "No statement provided."}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {/* Real-time Agentic Log */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <Terminal className="w-3 h-3" /> LIVE PROCESS LOG
                    </div>
                    <div className="bg-slate-900 text-indigo-300 p-4 rounded-xl h-[300px] font-mono text-[10px] overflow-y-auto space-y-2 border border-slate-800 shadow-inner">
                      {activeCase.logs?.length === 0 && <div className="text-slate-600">No process activity recorded yet.</div>}
                      {activeCase.logs?.map((log, i) => (
                        <div key={i} className="pb-1 border-b border-slate-800/30 break-words">{log}</div>
                      ))}
                    </div>
                  </div>

                  {/* Verdict Output */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <MessageSquare className="w-3 h-3" /> FINAL VERDICT
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 h-[300px] overflow-y-auto">
                      {activeCase.result ? (
                        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                          {activeCase.result}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs italic text-center px-8">
                          {isRunning ? (
                            <>
                              <Cpu className="w-8 h-8 mb-2 animate-spin opacity-20" />
                              Deliberating in real-time...
                            </>
                          ) : "Start the session to generate a verdict."}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [activeTab, setActiveTab] = useState('workflow');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  
  const [agents, setAgents] = useState([]);
  const [judgeInstructions, setJudgeInstructions] = useState("");

  const [testPairs, setTestPairs] = useState([
    { id: 'p1', factA: 'The suspect fled in a crimson vehicle.', factB: 'A witness saw a red car driving away.', result: null, logs: [] },
    { id: 'p2', factA: 'He was born in the summer of 1985.', factB: 'His birth date is November 15th, 1985.', result: null, logs: [] }
  ]);

  const [metrics, setMetrics] = useState({ totalTime: 0, totalTokens: 0 });

  const estimateTokens = (text) => Math.ceil((text || "").length / 4);

  // Core Agentic Runner
  const runAgenticSession = async (key, factA, factB, addCaseLog) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const messages = [
      { role: "system", content: `You are the Presiding Judge. ${judgeInstructions}` },
      { role: "user", content: `Evidence Case:\nFact A: ${factA}\nFact B: ${factB}\n\nInitiate the trial by consulting your specialist resources as needed.` }
    ];

    const tools = agents.map(agent => ({
      type: "function",
      function: {
        name: agent.name,
        description: `Consult the ${agent.name} for their specialist opinion.`,
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "The specific question or prompt to send to this agent." }
          },
          required: ["query"]
        }
      }
    }));

    let sessionActive = true;
    let turnCount = 0;
    let localTokens = 0;

    while (sessionActive && turnCount < 10) {
      turnCount++;
      addCaseLog(`⚖️ JUDGE TURN #${turnCount}: Analyzing evidence...`);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: messages,
          tools: tools.length > 0 ? tools : undefined,
          tool_choice: tools.length > 0 ? "auto" : undefined
        })
      });

      if (!response.ok) throw new Error(`OpenAI API Error: ${response.statusText}`);
      const data = await response.json();
      const message = data.choices[0].message;
      localTokens += data.usage?.total_tokens || 0;

      messages.push(message);

      if (message.tool_calls) {
        for (const toolCall of message.tool_calls) {
          const agent = agents.find(a => a.name === toolCall.function.name);
          const args = JSON.parse(toolCall.function.arguments);
          
          addCaseLog(`📞 [LIVE] Judge decided to call: ${agent.name}`);
          addCaseLog(`💬 Judge's Query: "${args.query}"`);

          const specialistResp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                { role: "system", content: agent.instructions },
                { role: "user", content: args.query }
              ]
            })
          });

          const specialistData = await specialistResp.json();
          const content = specialistData.choices[0].message.content;
          localTokens += specialistData.usage?.total_tokens || 0;

          addCaseLog(`✅ ${agent.name} response received by Judge.`);

          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            name: toolCall.function.name,
            content: content
          });
        }
      } else {
        sessionActive = false;
        return { content: message.content, tokens: localTokens };
      }
    }
    return { content: "Trial reached timeout limit.", tokens: localTokens };
  };

  const runWorkflow = async () => {
    if (!apiKey) {
      alert("Please enter an OpenAI API Key in Settings.");
      setActiveTab('settings');
      return;
    }

    setIsRunning(true);
    const startTime = Date.now();
    let cumulativeTokens = 0;
    const updatedPairs = [...testPairs];

    for (let i = 0; i < updatedPairs.length; i++) {
      updatedPairs[i].result = null;
      updatedPairs[i].logs = [];
    }
    setTestPairs([...updatedPairs]);

    for (let i = 0; i < updatedPairs.length; i++) {
      const pair = updatedPairs[i];
      setProgress({ current: i + 1, total: updatedPairs.length });

      const addCaseLog = (msg) => {
        const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        pair.logs.push(`[${timestamp}] ${msg}`);
        setTestPairs([...updatedPairs]);
      };

      addCaseLog(`🚀 SESSION START`);

      try {
        const result = await runAgenticSession(apiKey, pair.factA, pair.factB, addCaseLog);
        pair.result = result.content;
        cumulativeTokens += result.tokens;
        addCaseLog(`🏛️ Verdict finalized.`);
      } catch (err) {
        pair.result = "Session Error: " + err.message;
        addCaseLog(`❌ System Error: ${err.message}`);
      }
      
      addCaseLog(`🏁 SESSION END`);
    }

    const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
    setMetrics({ totalTime: totalDuration, totalTokens: cumulativeTokens });
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg"><Scale className="w-6 h-6 text-white" /></div>
            <h1 className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">AGENT COURTROOM</h1>
          </div>
          <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {[
              { id: 'workflow', label: 'Workflow', icon: Settings },
              { id: 'data', label: 'Evidence', icon: BookOpen },
              { id: 'run', label: 'The Trial', icon: Play },
              { id: 'settings', label: 'Key', icon: AlertCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
              >
                <tab.icon className="w-4 h-4" />{tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 py-8">
        {activeTab === 'workflow' && (
          <WorkflowBuilder 
            agents={agents} setAgents={setAgents} 
            judgeInstructions={judgeInstructions} setJudgeInstructions={setJudgeInstructions} 
          />
        )}
        {activeTab === 'data' && (
          <DataManager testPairs={testPairs} setTestPairs={setTestPairs} />
        )}
        {activeTab === 'run' && (
          <ResultsView 
            metrics={metrics} isRunning={isRunning} 
            runWorkflow={runWorkflow} progress={progress} 
            testPairs={testPairs} 
          />
        )}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl animate-in zoom-in-95">
            <div className="text-center mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Zap className="w-8 h-8 text-indigo-600" /></div>
              <h2 className="text-2xl font-bold">API Connection</h2>
              <p className="text-slate-500 mt-2">Requires an API key with Tool-Calling support (e.g. GPT-4o).</p>
            </div>
            <input 
              type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} 
              placeholder="OpenAI API Key" 
              className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-center mb-4 focus:ring-2 ring-indigo-500 outline-none" 
            />
            <button onClick={() => setActiveTab('workflow')} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg">Save & Continue</button>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold flex justify-center gap-8">
        <div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />{apiKey ? 'Agent Session Active' : 'No Key Provided'}</div>
        <div>Resources: {agents.length}</div>
        <div>Active Model: GPT-5.2-nano</div>
      </footer>
    </div>
  );
};

export default App;