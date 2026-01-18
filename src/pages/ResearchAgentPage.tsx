import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, Loader2, ArrowLeft, Bot } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAgentStore } from '../lib/store';
import { toast } from 'sonner';

export default function ResearchAgentPage() {
  const navigate = useNavigate();
  const { agentId } = useParams();
  const { agents, fetchAgents } = useAgentStore();
  const [companyName, setCompanyName] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchResults, setResearchResults] = useState<any | null>(null);
  const [agent, setAgent] = useState<any | null>(null);

  useEffect(() => {
    document.title = "Company Research | FlowStack";
    fetchAgents();
  }, [fetchAgents]);

  useEffect(() => {
    if (agents.length > 0 && agentId) {
      const foundAgent = agents.find(a => a.id === agentId);
      if (foundAgent) {
        setAgent(foundAgent);
      } else {
        // If agent not found, try to find the research agent
        const researchAgent = agents.find(a => a.category === 'research');
        if (researchAgent) {
          setAgent(researchAgent);
        } else {
          toast.error('Research agent not found');
          navigate('/marketplace');
        }
      }
    }
  }, [agents, agentId, navigate]);

  const handleResearch = async () => {
    if (!agent || !companyName.trim()) return;
    
    setIsResearching(true);
    try {
      const apiBody = {
        company_url: companyName.trim()
      };
      
      const response = await fetch(agent.apiEndpoint, {
        method: agent.apiMethod || 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(agent.apiHeaders || {})
        },
        body: JSON.stringify(apiBody)
      });
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      setResearchResults(data);
      toast.success('Research completed successfully!');
    } catch (apiError: any) {
      console.error('API call error:', apiError);
      toast.error(`Failed to research company: ${apiError.message || 'Unknown error'}`);
      setResearchResults(null);
    } finally {
      setIsResearching(false);
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-500" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-surface-50 to-white dark:from-surface-900 dark:to-surface-950 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/marketplace')}
            variant="ghost"
            className="mb-4"
            leftIcon={<ArrowLeft size={18} />}
          >
            Back to Agents
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              <Bot size={32} className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-surface-900 dark:text-white">
                {agent.name}
              </h1>
              <p className="text-surface-600 dark:text-surface-400 mt-1">
                {agent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Research Input Section */}
        {!researchResults ? (
          <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg border-2 border-surface-200 dark:border-surface-700 p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="company-name" className="block text-sm font-semibold text-surface-900 dark:text-white mb-3">
                  Company Name or URL
                </label>
                <div className="flex gap-3">
                  <input
                    id="company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name or website URL (e.g., Apple, apple.com)"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && companyName.trim() && !isResearching) {
                        handleResearch();
                      }
                    }}
                    disabled={isResearching}
                    autoFocus
                  />
                  <Button
                    onClick={handleResearch}
                    disabled={!companyName.trim() || isResearching}
                    className="px-8 py-3 text-lg"
                    isLoading={isResearching}
                    loadingText="Researching..."
                    leftIcon={!isResearching ? <Search size={20} /> : undefined}
                  >
                    {!isResearching && 'Research'}
                  </Button>
                </div>
                <p className="mt-3 text-sm text-surface-500 dark:text-surface-400">
                  Enter a company name or website URL to get comprehensive research and analysis.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg border-2 border-surface-200 dark:border-surface-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                    Research Results
                  </h2>
                  <p className="text-surface-600 dark:text-surface-400">
                    Company: <span className="text-primary-500 font-semibold">{companyName}</span>
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setResearchResults(null);
                    setCompanyName('');
                  }}
                  variant="outline"
                  leftIcon={<Search size={18} />}
                >
                  New Research
                </Button>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-lg border-2 border-surface-200 dark:border-surface-700 p-6">
              <pre className="whitespace-pre-wrap text-sm text-surface-700 dark:text-surface-300 font-mono overflow-auto max-h-[600px] bg-surface-50 dark:bg-surface-900 p-4 rounded-lg border border-surface-200 dark:border-surface-700">
                {JSON.stringify(researchResults, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

