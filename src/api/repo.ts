import type { IGithubUser, IGithubRepo } from '../types/github';
import { BASE_URL } from './config';

export async function searchGitHubUsers(
  query: string,
  limit = 5,
): Promise<IGithubUser[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=${limit}`,
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return data.items as IGithubUser[];
  } catch (error) {
    console.error('Failed to fetch GitHub users:', error);
    return [];
  }
}

export async function getUserRepositories(
  username: string,
): Promise<IGithubRepo[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${encodeURIComponent(username)}/repos`,
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const data = await response.json();
    return data as IGithubRepo[];
  } catch (error) {
    console.error('Failed to fetch GitHub users:', error);
    return [];
  }
}
