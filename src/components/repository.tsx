import { motion } from 'motion/react';
import type { IGithubRepo } from '../types/github';
import { GitFork, SquareArrowOutUpRight, SquareCode, Star } from 'lucide-react';

export default function Repository(props: { repo: IGithubRepo }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="card w-auto bg-base-100 card-sm">
        <div className="card-body">
          <h2 className="card-title">{props.repo.name}</h2>
          <p className="text-slate-500 -mt-3 truncate">
            {props.repo.description ? props.repo.description : '-'}
          </p>
          <div className="flex gap-4">
            {props.repo.language && (
              <span className="text-slate-500 flex text-xs">
                <SquareCode size={16} className="mr-1" />
                {props.repo.language}
              </span>
            )}
            <span className="text-slate-500 flex text-xs">
              <Star size={16} className="mr-1" />
              {props.repo.stargazers_count}
            </span>
            <span className="text-slate-500 flex text-xs">
              <GitFork size={16} className="mr-1" />
              {props.repo.forks_count}
            </span>
          </div>

          <div className="absolute right-2 top-4">
            <a target="_blank" href={props.repo.html_url} rel="noreferrer">
              <button className="btn btn-xs btn-ghost">
                <SquareArrowOutUpRight className="text-slate-500" size={16} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
