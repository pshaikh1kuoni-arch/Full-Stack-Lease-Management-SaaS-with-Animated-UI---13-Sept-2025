import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SaveIcon, CheckCircleIcon, CalendarIcon, FileTextIcon } from 'lucide-react';
import { toast } from 'sonner';
// Mock data for workflow steps based on strategy type
const workflowSteps = {
  Renewal: ['Email to Site FM for respective lease', 'Site FM to revert on current occupancy & Annual Operating expenditure data', 'Site FM to check with BU on growth/Reduction FTE plans', 'Basis on occupancy and BU feedback, renewal opportunity is reviewed by Site FM with BU', 'Site FM to align with RE team on site renewal strategy', 'RE team to align BU on the final renewal strategy', 'RE team to align global head on the final RE strategy', 'Site FM to discuss the proposed lease terms with the LL', 'Cluster manager to prepare the business case', 'Business case to be shared with Carrie through regional head', 'Approval from Mike through Carrie', 'LL to share agreement draft with Site FM incorporating agreed terms and commercials', 'Site FM to get Legal approvals', 'Signing off the agreement (LL + internal Local authorized signatory)', 'Registration of the agreement', 'Notifying Carrie about the loop closure through regional head', 'Informing Ann and Finance with latest document'],
  Downsizing: ['Email to Site FM for respective lease', 'Site FM to revert on current occupancy & Annual Operating expenditure data', 'Site FM to check with BU on growth/Reduction FTE plans', 'Basis on occupancy and BU feedback, downsizing opportunity is reviewed by Site FM with BU', 'Site FM to align with RE team on site downsizing strategy (involving Architect if needed)', 'Site FM to discuss & align BU on revised Test Fits', 'RE team to align BU on the final Downsizing strategy', 'RE team to align global head on the final RE strategy', 'Site FM to discuss downsized layout & proposed lease terms with the LL', 'One standard draft to the business with way forward of lease terms & conditions', 'Cluster manager to prepare the business case', 'Business case to be shared with Carrie', 'Approval from Mike through Carrie', 'LL to share agreement draft with Site FM incorporating agreed terms and commercials', 'Site FM to get Legal approvals', 'Signing off the agreement (LL + internal Local authorized signatory)', 'Registration of the agreement', 'Notifying Carrie about the loop closure', 'Informing Ann and Finance with latest document'],
  Relocation: ['Email to Site FM for respective lease', 'Site FM to revert on current occupancy & Annual Operating expenditure data', 'Site FM to check with BU on growth/Reduction FTE plans', 'Relocation opportunity reviewed by Site FM & RE team with BU', 'RE team to engage IPC for new location options based on BU requirements', 'IPC to conduct market analysis on new locations and recommend options', 'Site FM to align with BU & RE team on relocation strategy', 'RE team to align global head on the final RE strategy', 'Local FM to inform IT', 'IPC to discuss layout & proposed lease terms with the LL', 'One standard draft to the business with lease terms and conditions', 'Cluster manager to prepare the business case', 'Business case to be shared with Carrie', 'Approval from Mike through Carrie', 'LL to share agreement draft with Site FM incorporating agreed terms and commercials', 'Site FM to get Legal approvals', 'Signing off the agreement (LL + internal Local authorized signatory)', 'Registration of the agreement', 'Notifying Carrie about the loop closure', 'Informing Ann and Finance with latest document', 'Local FM to inform IT']
};
// Mock strategy data
const mockStrategy = {
  id: 'S001',
  lease_id: 'L003',
  lease_name: 'Bangalore Campus',
  strategy_type: 'Renewal',
  start_date: '2023-04-15',
  current_step: 7,
  status: 'In Progress',
  steps: [{
    id: 1,
    name: 'Email to Site FM for respective lease',
    completed: true,
    completion_date: '2023-04-16',
    notes: 'Email sent to John regarding the Bangalore Campus lease renewal.'
  }, {
    id: 2,
    name: 'Site FM to revert on current occupancy & Annual Operating expenditure data',
    completed: true,
    completion_date: '2023-04-20',
    notes: 'Current occupancy at 85%, annual opex is $120,000.'
  }, {
    id: 3,
    name: 'Site FM to check with BU on growth/Reduction FTE plans',
    completed: true,
    completion_date: '2023-04-25',
    notes: 'BU expects 10% growth in headcount over next 12 months.'
  }, {
    id: 4,
    name: 'Basis on occupancy and BU feedback, renewal opportunity is reviewed by Site FM with BU',
    completed: true,
    completion_date: '2023-05-02',
    notes: 'Meeting held with BU head. Decision is to renew with some layout modifications.'
  }, {
    id: 5,
    name: 'Site FM to align with RE team on site renewal strategy',
    completed: true,
    completion_date: '2023-05-10',
    notes: 'Strategy aligned with RE team - proceed with renewal negotiations.'
  }, {
    id: 6,
    name: 'RE team to align BU on the final renewal strategy',
    completed: true,
    completion_date: '2023-05-18',
    notes: 'BU has approved the renewal strategy with the proposed modifications.'
  }, {
    id: 7,
    name: 'RE team to align global head on the final RE strategy',
    completed: true,
    completion_date: '2023-05-25',
    notes: 'Global head approved the renewal strategy.'
  }, {
    id: 8,
    name: 'Site FM to discuss the proposed lease terms with the LL',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 9,
    name: 'Cluster manager to prepare the business case',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 10,
    name: 'Business case to be shared with Carrie through regional head',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 11,
    name: 'Approval from Mike through Carrie',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 12,
    name: 'LL to share agreement draft with Site FM incorporating agreed terms and commercials',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 13,
    name: 'Site FM to get Legal approvals',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 14,
    name: 'Signing off the agreement (LL + internal Local authorized signatory)',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 15,
    name: 'Registration of the agreement',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 16,
    name: 'Notifying Carrie about the loop closure through regional head',
    completed: false,
    completion_date: null,
    notes: ''
  }, {
    id: 17,
    name: 'Informing Ann and Finance with latest document',
    completed: false,
    completion_date: null,
    notes: ''
  }]
};
const EditStrategy = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const [strategy, setStrategy] = useState(mockStrategy);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const [completionDate, setCompletionDate] = useState('');
  const [stepNotes, setStepNotes] = useState('');
  useEffect(() => {
    // Simulate API call to fetch strategy data
    const timer = setTimeout(() => {
      setStrategy(mockStrategy);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);
  const handleCompleteStep = (stepId: number) => {
    const updatedSteps = strategy.steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          completed: true,
          completion_date: completionDate || new Date().toISOString().split('T')[0],
          notes: stepNotes || step.notes
        };
      }
      return step;
    });
    const nextStep = updatedSteps.find(step => !step.completed);
    const updatedCurrentStep = nextStep ? nextStep.id : strategy.steps.length;
    setStrategy({
      ...strategy,
      steps: updatedSteps,
      current_step: updatedCurrentStep
    });
    // Reset modal state
    setActiveStepId(null);
    setCompletionDate('');
    setStepNotes('');
    toast.success('Step completed successfully!');
  };
  const handleCancel = () => {
    setActiveStepId(null);
    setCompletionDate('');
    setStepNotes('');
  };
  const handleCompleteStrategy = () => {
    toast.success('Strategy completed successfully!');
    navigate('/strategies');
  };
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
        <div className="animate-bounce">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>;
  }
  const getProgressPercentage = () => {
    const completedSteps = strategy.steps.filter(step => step.completed).length;
    return Math.round(completedSteps / strategy.steps.length * 100);
  };
  return <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/strategies" className="mr-4 p-2 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Strategy: {strategy.lease_name}
          </h1>
        </div>
        <div className="flex space-x-3">
          <button type="button" onClick={handleCompleteStrategy} className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-transform duration-200 hover:scale-105">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Complete Strategy
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Strategy Type
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {strategy.strategy_type}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Lease</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {strategy.lease_name} ({strategy.lease_id})
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(strategy.start_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Progress</h3>
              <div className="mt-2 flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{
                  width: `${getProgressPercentage()}%`
                }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {getProgressPercentage()}%
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Workflow Steps
            </h2>
            <div className="space-y-4">
              {strategy.steps.map(step => <div key={step.id} className={`p-4 border rounded-lg ${step.completed ? 'border-green-200 bg-green-50' : step.id === strategy.current_step ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step.completed ? 'bg-green-500 text-white' : step.id === strategy.current_step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step.id}
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${step.completed ? 'text-green-800' : step.id === strategy.current_step ? 'text-blue-800' : 'text-gray-800'}`}>
                          {step.name}
                        </h3>
                        {step.completed && <p className="text-xs text-green-700 mt-1">
                            Completed on{' '}
                            {new Date(step.completion_date!).toLocaleDateString()}
                          </p>}
                      </div>
                    </div>
                    {!step.completed && step.id === strategy.current_step && <button onClick={() => setActiveStepId(step.id)} className="mt-2 sm:mt-0 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-105">
                        Complete Step
                      </button>}
                    {step.completed && step.notes && <div className="mt-2 sm:mt-0 flex items-center text-sm text-gray-600">
                        <FileTextIcon className="h-4 w-4 mr-1" />
                        {step.notes}
                      </div>}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
      {/* Step Completion Modal */}
      {activeStepId && <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Complete Step
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {strategy.steps.find(step => step.id === activeStepId)?.name}
                      </p>
                      <div className="mt-4">
                        <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700 mb-1">
                          Completion Date
                        </label>
                        <div className="relative">
                          <input type="date" id="completion_date" name="completion_date" value={completionDate} onChange={e => setCompletionDate(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" defaultValue={new Date().toISOString().split('T')[0]} />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Notes
                        </label>
                        <textarea id="notes" name="notes" value={stepNotes} onChange={e => setStepNotes(e.target.value)} rows={3} className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter notes about this step..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={() => handleCompleteStep(activeStepId)} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Complete
                </button>
                <button type="button" onClick={handleCancel} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default EditStrategy;