export type IGithubUser = {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: "User" | "Organization";
};


export type IGithubRepo = {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
}

export const enum ESubmitState {
    INVALID,
    IDLE,
    LOADING,
    ERROR,
    NOTFOUND,
    SUCCESS
}