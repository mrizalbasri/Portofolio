interface GitHubStats {
  stars: number;
}

/**
 * Fetches GitHub repository statistics.
 * Parses owner/repo from a GitHub URL and queries GitHub REST API.
 */
export async function fetchGitHubStats(
  repoUrl: string,
): Promise<GitHubStats | null> {
  try {
    const parsed = new URL(repoUrl);

    if (parsed.hostname !== "github.com") {
      console.warn("Invalid GitHub URL:", repoUrl);
      return null;
    }

    const [owner, rawRepo] = parsed.pathname.split("/").filter(Boolean);
    const repo = rawRepo?.replace(/\.git$/, "");

    if (!owner || !repo) {
      console.warn("Invalid GitHub URL:", repoUrl);
      return null;
    }
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      // Cache for 1 hour to avoid rate limiting
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn("Failed to fetch GitHub stats:", response.status);
      return null;
    }

    const data = await response.json();

    return {
      stars: data.stargazers_count || 0,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
}

/**
 * Gets GitHub stats with fallback values.
 */
export async function getGitHubStatsWithFallback(
  githubUrl?: string,
  fallbackStats?: { stars: number },
): Promise<GitHubStats> {
  if (!githubUrl || githubUrl === "#") {
    return fallbackStats || { stars: 0 };
  }

  const liveStats = await fetchGitHubStats(githubUrl);
  return liveStats || fallbackStats || { stars: 0 };
}
