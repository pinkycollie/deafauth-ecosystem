import React, { useState, useEffect } from 'react';
import {
  VersionControlService,
  createVersionControlService,
  DeploymentStatus,
} from '../services/version-control';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { CheckIcon } from './icons/CheckIcon';

// Error message constants for maintainability and localization
const ERROR_MESSAGES = {
  DEPLOYMENT_CHECKS_FAILED: 'Deployment checks failed',
  FAILED_STATUS_CHECK: 'Failed to check deployment status',
  DEPLOYMENT_FAILED: 'Deployment failed',
} as const;

interface DeployAuthButtonProps {
  onDeploy?: (status: DeploymentStatus) => void;
  environment?: 'development' | 'staging' | 'production';
  version?: string;
  className?: string;
}

type DeployState = 'idle' | 'checking' | 'ready' | 'deploying' | 'deployed' | 'error';

const DeployAuthButton: React.FC<DeployAuthButtonProps> = ({
  onDeploy,
  environment = 'production',
  version = '1.0.0',
  className = '',
}) => {
  const [deployState, setDeployState] = useState<DeployState>('idle');
  const [status, setStatus] = useState<DeploymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [versionControl] = useState<VersionControlService>(() =>
    createVersionControlService({
      version,
      environment,
      authEnabled: true,
      integrityChecks: true,
      consistencyChecks: true,
    })
  );

  useEffect(() => {
    const checkDeploymentReady = async () => {
      setDeployState('checking');
      try {
        await versionControl.initialize();
        const deployStatus = await versionControl.getDeploymentStatus();
        setStatus(deployStatus);
        setDeployState(deployStatus.ready ? 'ready' : 'error');
        if (!deployStatus.ready) {
          const failedChecks = deployStatus.consistency.checks
            .filter(c => !c.passed)
            .map(c => c.message)
            .join('; ');
          setError(failedChecks || ERROR_MESSAGES.DEPLOYMENT_CHECKS_FAILED);
        }
      } catch (err) {
        setDeployState('error');
        setError(err instanceof Error ? err.message : ERROR_MESSAGES.FAILED_STATUS_CHECK);
      }
    };

    checkDeploymentReady();
  }, [versionControl]);

  const handleDeploy = async () => {
    if (deployState !== 'ready' || !status) return;

    setDeployState('deploying');
    setError(null);

    try {
      const result = await versionControl.prepareDeployment();
      
      if (result.success) {
        setDeployState('deployed');
        onDeploy?.(result.status);
      } else {
        setDeployState('error');
        setError(result.message);
      }
    } catch (err) {
      setDeployState('error');
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.DEPLOYMENT_FAILED);
    }
  };

  const getButtonContent = () => {
    switch (deployState) {
      case 'idle':
      case 'checking':
        return (
          <>
            <SpinnerIcon className="w-5 h-5 mr-2" />
            <span>Checking System...</span>
          </>
        );
      case 'ready':
        return (
          <>
            <CheckIcon className="w-5 h-5 mr-2" />
            <span>Deploy Auth System</span>
          </>
        );
      case 'deploying':
        return (
          <>
            <SpinnerIcon className="w-5 h-5 mr-2" />
            <span>Deploying...</span>
          </>
        );
      case 'deployed':
        return (
          <>
            <CheckIcon className="w-5 h-5 mr-2" />
            <span>Deployed ✓</span>
          </>
        );
      case 'error':
        return <span>Retry Deploy</span>;
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      'flex items-center justify-center px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
    
    switch (deployState) {
      case 'idle':
      case 'checking':
        return `${baseStyles} bg-gray-600 text-white`;
      case 'ready':
        return `${baseStyles} bg-green-600 hover:bg-green-700 text-white`;
      case 'deploying':
        return `${baseStyles} bg-yellow-600 text-white`;
      case 'deployed':
        return `${baseStyles} bg-green-700 text-white`;
      case 'error':
        return `${baseStyles} bg-red-600 hover:bg-red-700 text-white`;
    }
  };

  return (
    <div className={`${className}`}>
      <button
        onClick={handleDeploy}
        disabled={deployState === 'checking' || deployState === 'deploying' || deployState === 'deployed'}
        className={getButtonStyles()}
      >
        {getButtonContent()}
      </button>
      
      {/* Status Display */}
      {status && (
        <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Version:</span>
            <span className="text-white font-mono">{status.version.version}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Environment:</span>
            <span className={`font-mono ${
              status.config.environment === 'production' 
                ? 'text-green-400' 
                : status.config.environment === 'staging' 
                  ? 'text-yellow-400' 
                  : 'text-blue-400'
            }`}>
              {status.config.environment}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Integrity:</span>
            <span className={status.integrity.isValid ? 'text-green-400' : 'text-red-400'}>
              {status.integrity.isValid ? '✓ Valid' : '✗ Invalid'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Consistency:</span>
            <span className={status.consistency.isConsistent ? 'text-green-400' : 'text-red-400'}>
              {status.consistency.isConsistent ? '✓ Consistent' : '✗ Issues'}
            </span>
          </div>
          {status.version.hash && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <span className="text-gray-500 text-xs font-mono">
                Hash: {status.version.hash.substring(0, 16)}...
              </span>
            </div>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mt-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default DeployAuthButton;
