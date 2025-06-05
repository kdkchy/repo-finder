import { CircleOffIcon, CornerDownLeft, Github } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { searchGitHubUsers } from "../api/repo";
import { ESubmitState, type IGithubUser } from "../types/github";
import SubmitState from "./submit-state";

export default function Form(props: {
    result: (data: IGithubUser[]) => void
}) {
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [submitState, setSubmitState] = useState<ESubmitState>(ESubmitState.IDLE)
    const handleSearch = async () => {
        setSubmitState(ESubmitState.LOADING)
        if (!search.trim()) {
            setSubmitState(ESubmitState.INVALID)
            return;
        }

        try {
            const data = await searchGitHubUsers(search);
            props.result(data)
            setSubmitState(ESubmitState.SUCCESS)
        } catch (error) {
            console.error("Failed to load users:", error);
            setSubmitState(ESubmitState.ERROR)
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <Fragment>
            <div className="flex flex-col items-center mb-4 w-full space-y-1">
                <div className="flex w-full xl:w-2/3 space-x-2">
                    <div className="w-full">
                        <label className={`input w-full flex items-center ${submitState == ESubmitState.INVALID ? 'border-red-500 border-2' : 'border-slate-200'}`}>
                            <Github className="text-slate-500" size={15} />
                            <input
                                value={search}
                                type="search"
                                placeholder="Type your GitHub username"
                                onChange={(e) => {
                                    setSearch(e.target.value); setSubmitState(ESubmitState.IDLE)
                                }}
                                className="w-full"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleSearch();
                                    }
                                }}
                            />
                        </label>
                        <p className="invisible lg:visible text-sm italic flex justify-end text-slate-500 mt-1">
                            <CornerDownLeft size={15} className="mr-1"/> Press enter to search
                        </p>

                        {submitState == ESubmitState.INVALID && (
                            <p className="text-white text-sm italic -mt-8 flex ">
                                <div className=" bg-red-500 flex p-1 rounded-md shadow-lg pt-3 px-2">
                                <CircleOffIcon size={15} className="mr-1"/> Oops! That didn't work. Try a valid GitHub username.
                                </div>
                            </p>
                        )}
                    </div>
                    <button disabled={isLoading} onClick={handleSearch} className="btn btn-primary">
                        Search User
                    </button>
                </div>
                {submitState == ESubmitState.SUCCESS && (
                    <p className="italic text-slate-500">Search result for {search}</p>
                )}
            </div>
            <SubmitState value={submitState}/>
        </Fragment>
    )
}