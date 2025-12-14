// Utility function to fetch GitHub repository stats
export async function fetchGitHubStats(repoUrl: string) {
  try {
    // Extract owner and repo from GitHub URL
    // Example: https://github.com/mrizalbasri/WeatherApp
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    
    if (!match) {
      console.warn('Invalid GitHub URL:', repoUrl);
      return null;
    }

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      // Cache for 1 hour to avoid rate limiting
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.warn('Failed to fetch GitHub stats:', response.status);
      return null;
    }

    const data = await response.json();

    return {
      stars: data.stargazers_count || 0,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

// Helper to get stats with fallback
export async function getGitHubStatsWithFallback(
  githubUrl?: string,
  fallbackStats?: { stars: number }
) {
  if (!githubUrl || githubUrl === '#') {
    return fallbackStats || { stars: 0 };
  }

  const liveStats = await fetchGitHubStats(githubUrl);
  
  // Use live stats if available, otherwise use fallback
  return liveStats || fallbackStats || { stars: 0 };
}
