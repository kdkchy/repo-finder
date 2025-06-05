import type { IGithubRepo } from '../types/github';

export const repoCache = new Map<string, IGithubRepo[]>();
