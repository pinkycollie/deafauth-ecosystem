/**
 * Version Control & Integrity Framework
 * Framework-agnostic version control ensuring integrity, validation, and consistency
 */

export interface VersionInfo {
  version: string;
  hash: string;
  timestamp: string;
  environment: 'development' | 'staging' | 'production';
}

export interface IntegrityCheckResult {
  isValid: boolean;
  hash: string;
  errors: string[];
  warnings: string[];
  timestamp: string;
}

export interface ConsistencyCheckResult {
  isConsistent: boolean;
  checks: {
    name: string;
    passed: boolean;
    message: string;
  }[];
  timestamp: string;
}

export interface DeploymentConfig {
  version: string;
  environment: 'development' | 'staging' | 'production';
  authEnabled: boolean;
  integrityChecks: boolean;
  consistencyChecks: boolean;
}

export interface DeploymentStatus {
  ready: boolean;
  version: VersionInfo;
  integrity: IntegrityCheckResult;
  consistency: ConsistencyCheckResult;
  config: DeploymentConfig;
}

/**
 * Generate a simple hash for integrity verification
 * Using a basic hashing approach that works in browser environments
 */
async function generateHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Version Control Service
 * Provides framework-agnostic version control with integrity and consistency validation
 */
export class VersionControlService {
  private currentVersion: VersionInfo;
  private config: DeploymentConfig;

  constructor(config?: Partial<DeploymentConfig>) {
    const defaultConfig: DeploymentConfig = {
      version: '1.0.0',
      environment: 'development',
      authEnabled: true,
      integrityChecks: true,
      consistencyChecks: true,
    };

    this.config = { ...defaultConfig, ...config };
    this.currentVersion = {
      version: this.config.version,
      hash: '',
      timestamp: new Date().toISOString(),
      environment: this.config.environment,
    };
  }

  /**
   * Initialize version control with computed hash
   */
  async initialize(): Promise<VersionInfo> {
    const versionData = JSON.stringify({
      version: this.config.version,
      environment: this.config.environment,
      timestamp: this.currentVersion.timestamp,
    });
    
    this.currentVersion.hash = await generateHash(versionData);
    return this.currentVersion;
  }

  /**
   * Get current version information
   */
  getVersion(): VersionInfo {
    return { ...this.currentVersion };
  }

  /**
   * Verify data integrity
   */
  async verifyIntegrity(data: unknown): Promise<IntegrityCheckResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const timestamp = new Date().toISOString();

    try {
      // Validate data exists
      if (data == null) {
        errors.push('Data is null or undefined');
      }

      // Validate data type
      if (typeof data !== 'object' && typeof data !== 'string') {
        warnings.push('Data is not an object or string');
      }

      // Generate integrity hash
      const dataString = typeof data === 'string' ? data : JSON.stringify(data);
      const hash = await generateHash(dataString);

      return {
        isValid: errors.length === 0,
        hash,
        errors,
        warnings,
        timestamp,
      };
    } catch (error) {
      errors.push(`Integrity check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return {
        isValid: false,
        hash: '',
        errors,
        warnings,
        timestamp,
      };
    }
  }

  /**
   * Validate auth configuration
   */
  validateAuthConfig(authConfig: unknown): IntegrityCheckResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const timestamp = new Date().toISOString();

    if (!authConfig || typeof authConfig !== 'object') {
      errors.push('Auth configuration is missing or invalid');
      return { isValid: false, hash: '', errors, warnings, timestamp };
    }

    const config = authConfig as Record<string, unknown>;

    // Check required auth fields
    if (!config.providers || !Array.isArray(config.providers)) {
      warnings.push('No authentication providers configured');
    }

    if (!config.redirectUrl) {
      warnings.push('No redirect URL configured');
    }

    return {
      isValid: errors.length === 0,
      hash: '',
      errors,
      warnings,
      timestamp,
    };
  }

  /**
   * Check system consistency
   */
  async checkConsistency(): Promise<ConsistencyCheckResult> {
    const checks: { name: string; passed: boolean; message: string }[] = [];
    const timestamp = new Date().toISOString();

    // Check version consistency
    checks.push({
      name: 'version_format',
      passed: /^\d+\.\d+\.\d+$/.test(this.config.version),
      message: this.config.version.match(/^\d+\.\d+\.\d+$/)
        ? 'Version format is valid (semver)'
        : 'Version should follow semver format (x.y.z)',
    });

    // Check environment consistency
    checks.push({
      name: 'environment',
      passed: ['development', 'staging', 'production'].includes(this.config.environment),
      message: `Environment is set to: ${this.config.environment}`,
    });

    // Check auth configuration
    checks.push({
      name: 'auth_enabled',
      passed: this.config.authEnabled,
      message: this.config.authEnabled
        ? 'Authentication is enabled'
        : 'Authentication is disabled',
    });

    // Check integrity checks configuration
    checks.push({
      name: 'integrity_checks',
      passed: this.config.integrityChecks,
      message: this.config.integrityChecks
        ? 'Integrity checks are enabled'
        : 'Integrity checks are disabled',
    });

    // Check hash presence
    checks.push({
      name: 'version_hash',
      passed: this.currentVersion.hash.length > 0,
      message: this.currentVersion.hash.length > 0
        ? 'Version hash is generated'
        : 'Version hash is missing - call initialize() first',
    });

    const allPassed = checks.every(check => check.passed);

    return {
      isConsistent: allPassed,
      checks,
      timestamp,
    };
  }

  /**
   * Get complete deployment status
   */
  async getDeploymentStatus(): Promise<DeploymentStatus> {
    const version = this.getVersion();
    const integrity = await this.verifyIntegrity(this.config);
    const consistency = await this.checkConsistency();

    const ready = integrity.isValid && consistency.isConsistent;

    return {
      ready,
      version,
      integrity,
      consistency,
      config: { ...this.config },
    };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<DeploymentConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Prepare for deployment
   */
  async prepareDeployment(): Promise<{ success: boolean; status: DeploymentStatus; message: string }> {
    await this.initialize();
    const status = await this.getDeploymentStatus();

    if (!status.ready) {
      const failedChecks = status.consistency.checks
        .filter(c => !c.passed)
        .map(c => c.name)
        .join(', ');
      
      return {
        success: false,
        status,
        message: `Deployment not ready. Failed checks: ${failedChecks || 'integrity issues'}`,
      };
    }

    return {
      success: true,
      status,
      message: `Ready to deploy version ${status.version.version} to ${status.config.environment}`,
    };
  }
}

/**
 * Factory function to create a version control service
 */
export function createVersionControlService(config?: Partial<DeploymentConfig>): VersionControlService {
  return new VersionControlService(config);
}

/**
 * Default instance for quick access
 */
let defaultInstance: VersionControlService | null = null;

export function getVersionControlService(config?: Partial<DeploymentConfig>): VersionControlService {
  if (!defaultInstance) {
    defaultInstance = createVersionControlService(config);
  }
  return defaultInstance;
}
