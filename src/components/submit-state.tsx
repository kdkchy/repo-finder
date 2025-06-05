import { XCircle } from 'lucide-react';
import { ESubmitState } from '../types/github';

export default function SubmitState(props: { value: ESubmitState }) {
  return (
    <div className="flex justify-center mt-10">
      {props.value == ESubmitState.LOADING && (
        <>
          <span className="loading loading-spinner mr-2"></span>
          <div className="text-xl italic">Loading</div>
        </>
      )}
      {props.value == ESubmitState.ERROR && (
        <>
          <XCircle size={25} className="mr-2" />
          <div className="text-xl italic">
            Something went wrong, but dont worries our man is figuring out how
            to fix this issue
          </div>
        </>
      )}
    </div>
  );
}
