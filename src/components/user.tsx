import Repository from './repository';
import {
  Building2,
  Package,
  SquareArrowOutUpRight,
  User2,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { IGithubRepo, IGithubUser } from '../types/github';
import { repoCache } from '../api/cache';
import { getUserRepositories } from '../api/repo';

export default function User(props: { user: IGithubUser }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<IGithubRepo[] | null>(null);

  const handleLoadRepos = async (selectedUser: string) => {
    setIsLoading(true);

    if (repoCache.has(selectedUser)) {
      setIsLoading(false);
      setIsVisible(true);
      return;
    }

    try {
      const repositories = await getUserRepositories(selectedUser);
      setRepos(repositories);
      repoCache.set(selectedUser, repositories);
      setIsVisible(true);
    } catch (error) {
      console.error('Failed to load repositories:', error);
      setRepos([]);
      alert('Failed to fetch repositories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div className="border-slate-300 mb-2">
      <div className="flex justify-center mb-2">
        <>
          <div className="card w-full h-full bg-base-100 card-xs shadow-sm border-1 border-blue-50">
            <div className="relative card-body">
              <div className="flex items-center space-x-3 w-full">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={props.user.avatar_url} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <h2 className="card-title text-sm">{props.user.login}</h2>
                </div>
              </div>
              <div className="absolute right-2 top-4">
                <a target="_blank" href={props.user.html_url} rel="noreferrer">
                  <button
                    className="btn btn-xs btn-ghost tooltip"
                    data-tip={`go to ${props.user.login} Github`}
                  >
                    <SquareArrowOutUpRight size={16} />
                  </button>
                </a>
                <button
                  className="btn btn-xs btn-ghost tooltip"
                  data-tip={`github type ${props.user.type}`}
                >
                  {props.user.type === 'User' ? (
                    <User2 size={16} />
                  ) : (
                    <Building2 size={16} />
                  )}
                </button>
                {!isVisible && (
                  <button
                    onClick={() => handleLoadRepos(props.user.login)}
                    disabled={isLoading}
                    className="btn btn-xs btn-ghost tooltip"
                    data-tip="View Repos"
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner w-4"></span>
                    ) : (
                      <Package size={16} />
                    )}
                  </button>
                )}
                {isVisible && (
                  <button
                    onClick={() => setIsVisible(false)}
                    disabled={isLoading}
                    className="btn btn-xs btn-ghost tooltip"
                    data-tip="View Repos"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-gray-200 rounded-lg"
          >
            {repos?.length == 0 && (
              <div className="p-2 flex justify-center text-sm italic">
                No repository to show
              </div>
            )}
            <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
              {repos &&
                repos?.map((repo) => <Repository repo={repo} key={repo.id} />)}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
