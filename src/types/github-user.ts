export type GithubUserReposProps = {
    readonly name: string;
    readonly description: string;
    readonly created_at: string;
    readonly forks: number;
    readonly stargazers_count: number;
    readonly html_url: string;
};

export type GithubUserProps = {
    readonly login?: string;
    readonly avatar_url?: string;
    readonly followers?: number;
    readonly repos?: GithubUserReposProps;
};
